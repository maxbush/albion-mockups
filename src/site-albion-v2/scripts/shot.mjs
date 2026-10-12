#!/usr/bin/env node
// Full-page screenshot with a fixed 1440x900 layout viewport (so 100svh sections keep their height) via Edge DevTools protocol.
// usage: node scripts/shot.mjs <url> <out.png> [width=1440] [reduced=1] [sliceHeight]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, out, w = "1440", reduced = "1"] = process.argv.slice(2);
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9333 + Math.floor(Math.random() * 300);
const proc = spawn(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`, "--remote-allow-origins=*", "--user-data-dir=" + process.env.TEMP + "\\edge-shot-" + PORT, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.error("shot: timeout"); proc.kill(); process.exit(2); }, 120000);
let list;
for (let i = 0; i < 50; i++) {
  try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); if (list.length) break; } catch {}
  await sleep(200);
}
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

const W = +w;
console.error("connected"); await send("Page.enable"); console.error("enabled");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: 900, deviceScaleFactor: 1, mobile: W < 700 });
if (reduced === "1") await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Page.navigate", { url }); console.error("navigated");
await sleep(6000);
// scroll through the page to trigger reveal observers, then back to top
const h = (await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true })).result.result.value;
for (let y = 0; y < h; y += 700) { await send("Runtime.evaluate", { expression: `window.scrollTo(0,${y})` }); await sleep(120); }
await send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
await sleep(600);
const h2 = (await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true })).result.result.value;
let part = 0;
for (let y = 0; y < h2; y += 3000) {
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width: W, height: Math.min(3000, h2 - y), scale: 1 } });
  writeFileSync(out.replace(/\.png$/, `-${part++}.png`), Buffer.from(shot.result.data, "base64"));
}
console.log("saved", part, "parts, total height", h2);ws.close();
proc.kill();
process.exit(0);


