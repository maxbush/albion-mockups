"use client";

import { useEffect, useState } from "react";
import styles from "./FontSwitcher.module.css";

type Preset = { id: string; display: string; sans: string; blurb: string };

const PRESETS: Preset[] = [
  { id: "a", display: "Cormorant", sans: "Inter Tight", blurb: "текущий" },
  { id: "b", display: "Oranienbaum", sans: "Manrope", blurb: "дидоны, высокий контраст" },
  { id: "c", display: "Spectral", sans: "Onest", blurb: "экранная антиква, тёплая" },
  { id: "d", display: "Prata", sans: "Jost", blurb: "люкс-заголовки, геометрик-санс" },
  { id: "e", display: "Tenor Sans", sans: "Onest", blurb: "всё без засечек, спокойный" },
  { id: "f", display: "Jost", sans: "Manrope", blurb: "всё без засечек, геометрия" },
];

const KEY = "albion-font";

export default function FontSwitcher() {
  const [open, setOpen] = useState(false);
  const [font, setFont] = useState<string>("a");

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("font");
    const saved = window.localStorage.getItem(KEY);
    const initial = fromQuery ?? saved ?? "a";
    apply(initial);
  }, []);

  function apply(id: string) {
    setFont(id);
    document.documentElement.dataset.font = id;
    try {
      window.localStorage.setItem(KEY, id);
    } catch {
      /* private mode */
    }
  }

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.pill}
        aria-expanded={open}
        aria-label="Переключить шрифты"
        onClick={() => setOpen((v) => !v)}
      >
        Aa
      </button>
      {open && (
        <div className={styles.panel} role="menu">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="menuitemradio"
              aria-checked={font === p.id}
              className={`${styles.option} ${font === p.id ? styles.active : ""}`}
              onClick={() => apply(p.id)}
            >
              <span className={styles.names}>
                <b>{p.display}</b> + {p.sans}
              </span>
              <span className={styles.blurb}>{p.blurb}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
