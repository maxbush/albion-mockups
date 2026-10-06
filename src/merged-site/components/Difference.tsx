"use client";

import { useRef } from "react";
import { clamp01, lerp, useScrollScene } from "@/lib/motion";

const WORDS = [
  {
    word: "OXFORD-BASED",
    tag: "Commitment 01",
    copy:
      "We live and work in Oxford, street by street, registrar by registrar. When a school needs seeing today — or a child needs someone nearby — it happens today.",
  },
  {
    word: "INDEPENDENT",
    tag: "Commitment 02",
    copy:
      "No school groups behind us, no commission ahead of us. When we say a school suits your child, the judgement is ours alone — and it can be changed when the child changes.",
  },
  {
    word: "DIRECT",
    tag: "Commitment 03",
    copy:
      "You speak with the people who do the work — no sales desk, no handover after signing. Questions travel without intermediaries; answers come back the same way.",
  },
  {
    word: "CONFIDENTIAL",
    tag: "Commitment 04",
    copy:
      "Family circumstances stay inside the room. Discretion is not a service level we sell; it is the default we work in.",
  },
];

/**
 * THE ALBION DIFFERENCE — a quiet screen. One word at a time,
 * cross-fading on scroll against a short piece of real explanation.
 * Pin distance runs ~400svh, one screen per word, with a
 * plateau so each word lands and holds.
 */
export default function Difference() {
  const section = useRef<HTMLElement>(null);
  const words = useRef<(HTMLDivElement | null)[]>([]);
  const copies = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useScrollScene(section, (p, t, { reduced }) => {
    if (reduced) return; // CSS lays the four commitments out statically
    const seg = p * WORDS.length;
    words.current.forEach((el, i) => {
      if (!el) return;
      // plateau: full opacity through the middle ~56% of the window,
      // eased fades over the outer ~22% on each side
      const o = clamp01((0.5 - Math.abs(seg - (i + 0.5))) / 0.22);
      const drift = clamp01(seg - i);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${lerp(46, -46, drift)}px, 0) scale(${lerp(0.982, 1.01, drift)})`;
      el.style.visibility = o <= 0.01 ? "hidden" : "visible";
    });
    copies.current.forEach((el, i) => {
      if (!el) return;
      const o = clamp01((0.5 - Math.abs(seg - (i + 0.5))) / 0.26);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${lerp(22, -22, clamp01(seg - i))}px, 0)`;
      el.style.visibility = o <= 0.01 ? "hidden" : "visible";
    });
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    if (count.current)
      count.current.textContent = String(Math.min(WORDS.length, Math.floor(seg) + 1)).padStart(2, "0");
  });

  return (
    <section id="difference" className="diff" ref={section} aria-labelledby="diff-title">
      <div className="container" style={{ paddingTop: "clamp(60px, 9vh, 110px)" }}>
        <p className="eyebrow">The Albion difference</p>
        <h2 className="section-title" id="diff-title" style={{ maxWidth: "22ch", marginTop: 22 }}>
          An Oxford office, an English-speaking team — and four commitments we do not bend.
        </h2>
      </div>

      <div className="diff-pin">
        <div className="diff-wordbox" aria-hidden="true">
          {WORDS.map((w, i) => (
            <div
              className="diff-word"
              key={w.word}
              ref={(el) => {
                words.current[i] = el;
              }}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              {w.word}
            </div>
          ))}
        </div>
        <div className="diff-copybox">
          {WORDS.map((w, i) => (
            <div
              className="diff-copy"
              key={w.word}
              ref={(el) => {
                copies.current[i] = el;
              }}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              <span className="tag">{w.tag}</span>
              <p>{w.copy}</p>
            </div>
          ))}
        </div>
        <div className="diff-foot" aria-hidden="true">
          <span>
            <span ref={count}>01</span> / 04
          </span>
          <span className="diff-bar">
            <i ref={bar} />
          </span>
        </div>
      </div>

      {/* accessible static rendering of the same content */}
      <div className="container diff-static">
        {WORDS.map((w) => (
          <div key={w.word} className="diff-static-row">
            <h3>{w.word}</h3>
            <p>{w.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
