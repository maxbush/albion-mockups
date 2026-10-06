// Simple static file server: node static-server.js <root> <port> [indexFile]
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2]);
const port = parseInt(process.argv[3], 10);
const indexFile = process.argv[4] || "index.html";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

function send(res, code, data, type) {
  res.writeHead(code, { "Content-Type": type || "application/octet-stream" });
  res.end(data);
}

http
  .createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(req.url.split("?")[0]);
    } catch {
      send(res, 400, "Bad Request", "text/plain; charset=utf-8");
      return;
    }
    if (urlPath === "/") urlPath = "/" + indexFile;
    let filePath = path.normalize(path.join(root, urlPath));
    if (!filePath.startsWith(root)) {
      send(res, 403, "Forbidden", "text/plain; charset=utf-8");
      return;
    }
    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isDirectory()) {
        filePath = path.join(filePath, indexFile);
      }
      fs.readFile(filePath, (err2, data) => {
        if (err2) {
          // SPA fallback: serve index file for unknown routes
          const idx = path.join(root, indexFile);
          fs.readFile(idx, (err3, data3) => {
            if (err3) {
              send(res, 404, "Not Found", "text/plain; charset=utf-8");
              return;
            }
            send(res, 200, data3, "text/html; charset=utf-8");
          });
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        send(res, 200, data, MIME[ext] || "application/octet-stream");
      });
    });
  })
  .listen(port, "0.0.0.0", () => {
    console.log("Serving " + root + " on http://localhost:" + port);
  });