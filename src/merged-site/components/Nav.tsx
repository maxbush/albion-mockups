"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/nav";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState<number | null>(0);
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="nav"
      data-scrolled={scrolled || sheet}
      data-sheet={sheet}
      onPointerLeave={() => setOpen(null)}
    >
      <div className="nav-bar" ref={barRef}>
        <Link href="/" className="nav-mark" aria-label="ALBION Consult — home">
          <b>ALBION</b>
          <span>Consult · Oxford</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-list">
            {NAV.map((node, i) =>
              node.children ? (
                <li
                  key={node.label}
                  className="nav-item"
                  data-open={open === i}
                  onPointerEnter={() => setOpen(i)}
                >
                  <button
                    className="nav-btn"
                    aria-expanded={open === i}
                    aria-haspopup="true"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {node.label}
                    <i className="chev" aria-hidden="true" />
                  </button>
                  <div className="nav-drop" role="menu" aria-label={node.label}>
                    {node.children.map((c) => (
                      <a key={c.href + c.label} href={c.href} role="menuitem" onClick={() => setOpen(null)}>
                        {c.label}
                      </a>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={node.label} className="nav-item">
                  <a className="nav-link" href={node.href}>
                    {node.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        <a className="nav-cta" href="/albion-mockups/green/#consult">
          Book a consultation <span aria-hidden="true">↗</span>
        </a>

        <button
          className="nav-burger"
          aria-expanded={sheet}
          aria-label={sheet ? "Close menu" : "Open menu"}
          onClick={() => setSheet(!sheet)}
        >
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </button>

        <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </div>

      <div className="nav-sheet" aria-hidden={!sheet}>
        {NAV.map((node, i) =>
          node.children ? (
            <div key={node.label} className="sheet-node" data-open={sheetOpen === i}>
              <button
                className="sheet-top"
                aria-expanded={sheetOpen === i}
                onClick={() => setSheetOpen(sheetOpen === i ? null : i)}
                tabIndex={sheet ? 0 : -1}
              >
                {node.label}
                <span className="plus" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="sheet-children">
                {node.children.map((c) => (
                  <a key={c.href + c.label} href={c.href} tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div key={node.label} className="sheet-node">
              <a className="sheet-top" href={node.href} onClick={() => setSheet(false)} tabIndex={sheet ? 0 : -1} style={{ textDecoration: "none", color: "inherit" }}>
                {node.label}
              </a>
            </div>
          )
        )}
        <a className="sheet-cta" href="/albion-mockups/green/#consult" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
          Book a consultation <span aria-hidden="true">↗</span>
        </a>
        <p className="sheet-foot">Oxford · United Kingdom — and wherever your family is based</p>
      </div>
    </header>
  );
}
