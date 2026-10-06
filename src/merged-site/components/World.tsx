"use client";

import Image from "next/image";
import { useRef } from "react";
import { clamp01, lerp, smoothstep, useScrollScene } from "@/lib/motion";

const STAGES = [
  {
    label: "OXFORD",
    sub: "One office, one city — known street by street, register by register.",
  },
  {
    label: "BRITAIN & BEYOND",
    sub: "The system we work from the inside — schools, exam boards, deadlines — and the routes that continue across borders.",
  },
  {
    label: "THE WORLD",
    sub: "Wherever school happens next, the route is already drawn.",
  },
];

const RING_TAGS = ["UK", "Europe", "USA", "World"];

const UNIVERSITIES = [
  { m: "O", name: "Oxford", city: "UK" },
  { m: "C", name: "Cambridge", city: "UK" },
  { m: "U", name: "UCL", city: "London" },
  { m: "I", name: "Imperial", city: "London" },
  { m: "L", name: "LSE", city: "London" },
  { m: "K", name: "King's College", city: "London" },
  { m: "D", name: "Durham", city: "UK" },
  { m: "B", name: "Bristol", city: "UK" },
];

const SCHOOLS = [
  { m: "E", name: "Eton", city: "Windsor" },
  { m: "H", name: "Harrow", city: "London" },
  { m: "W", name: "Wycombe Abbey", city: "High Wycombe" },
  { m: "W", name: "Westminster", city: "London" },
  { m: "S", name: "St Paul's", city: "London" },
  { m: "S", name: "Sevenoaks", city: "Kent" },
  { m: "C", name: "Cheltenham Ladies'", city: "Cheltenham" },
  { m: "B", name: "Brighton College", city: "Brighton" },
];

type Crest = { m: string; name: string; city: string };

function CrestTile({ m, name, city }: Crest) {
  return (
    <li className="wcrest">
      <span className="wcrest-shield" aria-hidden="true">
        {m}
      </span>
      <span className="wcrest-name">{name}</span>
      <span className="wcrest-city">{city}</span>
    </li>
  );
}

function Strip({ items, reverse }: { items: Crest[]; reverse?: boolean }) {
  // the list is rendered twice so the keyframe loop is seamless
  const doubled = [...items, ...items];
  return (
    <div className={`wstrip${reverse ? " wstrip-rev" : ""}`}>
      <ul className="wstrip-track">
        {doubled.map((c, i) => (
          <CrestTile key={`${c.name}-${i}`} {...c} />
        ))}
      </ul>
    </div>
  );
}

/**
 * WORLD → a compact pull-back scene (Oxford shrinking to a point inside
 * widening rings) that resolves into the offers strips — where the route
 * actually lands. ~2.3 screens of scene, then the ledger.
 */
export default function World() {
  const scene = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const night = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const rings = useRef<(HTMLDivElement | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollScene(scene, (p, t, { reduced }) => {
    if (reduced) return; // scene hidden entirely; the ledger carries the point

    // seg walks the three labels; r expands rings/tags on their own clock
    const seg = Math.min(smoothstep(0.05, 0.82, p) * STAGES.length, STAGES.length - 0.5);
    const r = smoothstep(0.32, 0.92, p) * 4;

    if (pin.current) pin.current.dataset.dark = String(p > 0.3);
    if (night.current) night.current.style.opacity = String(smoothstep(0.16, 0.5, p));
    if (img.current) {
      const s = lerp(1, 0.15, smoothstep(0.06, 0.62, p));
      img.current.style.transform = `scale(${s})`;
      img.current.style.borderRadius = `${lerp(0, 50, smoothstep(0.06, 0.38, p))}%`;
      img.current.style.opacity = String(1 - smoothstep(0.84, 0.96, p) * 0.3);
    }
    rings.current.forEach((el, k) => {
      if (!el) return;
      const o = smoothstep(k + 0.3, k + 0.9, r) * 0.42;
      const sc = lerp(0.82, 1, smoothstep(k + 0.3, k + 1.1, r));
      el.style.opacity = String(o);
      el.style.transform = `translate(-50%, -50%) scale(${sc})`;
    });
    tags.current.forEach((el, k) => {
      if (el) el.style.opacity = String(smoothstep(k + 0.8, k + 1.3, r) * 0.9);
    });
    labels.current.forEach((el, i) => {
      if (!el) return;
      const o = clamp01(1 - Math.abs(seg - (i + 0.5)) * 2.2);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${lerp(22, -22, clamp01(seg - i))}px, 0) scale(${lerp(0.98, 1.02, clamp01(seg - i))})`;
      el.style.visibility = o <= 0.01 ? "hidden" : "visible";
    });
  });

  return (
    <section className="world" aria-labelledby="world-title">
      <div className="world-scene" ref={scene} aria-hidden="true">
        <div className="world-pin" ref={pin}>
          <div className="world-night" ref={night} />
          <div className="world-stage">
            <div className="world-img" ref={img}>
              <Image
                src="/img/route-spires.webp"
                alt=""
                fill
                sizes="(max-width: 1100px) 92vw, 1100px"
                quality={82}
              />
            </div>
            {[0, 1, 2, 3].map((k) => (
              <div
                className="world-ring"
                key={k}
                ref={(el) => {
                  rings.current[k] = el;
                }}
              />
            ))}
            {RING_TAGS.map((tag, k) => (
              <span
                className={`world-tag t-${["uk", "eu", "us", "world"][k]}`}
                key={tag}
                ref={(el) => {
                  tags.current[k] = el;
                }}
              >
                {tag}
              </span>
            ))}
            {STAGES.map((s, i) => (
              <div
                className="world-label"
                key={s.label}
                ref={(el) => {
                  labels.current[i] = el;
                }}
                style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
              >
                <p className="display">{s.label}</p>
                <p className="sub">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="world-offers">
        <div className="container">
          <header className="world-head">
            <p className="eyebrow">Albion · Offers</p>
            <h2 id="world-title">
              From Oxford <em>to the world.</em>
            </h2>
            <p className="world-lede">
              Offers landing across Britain and beyond — the universities
              and schools where Albion families study today.
            </p>
          </header>
        </div>

        <div className="container world-strips">
          <div className="wstrip-group">
            <p className="wstrip-label">Universities</p>
            <Strip items={UNIVERSITIES} />
          </div>
          <div className="wstrip-group">
            <p className="wstrip-label">Schools</p>
            <Strip items={SCHOOLS} reverse />
          </div>
        </div>

        <div className="container">
          <p className="world-coda">The list is in preparation and grows as offers arrive.</p>
        </div>
      </div>
    </section>
  );
}
