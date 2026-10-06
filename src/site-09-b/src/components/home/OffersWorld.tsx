"use client";

import Image from "next/image";
import { useRef } from "react";
import { clamp01, lerp, smoothstep, useScrollScene } from "@/lib/motion";
import styles from "./OffersWorld.module.css";

const RING_SIZES = [26, 40, 56, 74]; // vmin
const TAG_OFFSETS = [13, 20, 28, 37]; // vmin above centre

type Stage = { label: string; sub: string };

/** Scroll scene: the Oxford photo pulls back into a point inside widening rings. */
export default function OffersWorld({ tags, stages }: { tags: string[]; stages: Stage[] }) {
  const scene = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const night = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const rings = useRef<(HTMLDivElement | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const tagEls = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollScene(scene, (p, _t, { reduced }) => {
    if (reduced) return; // static frame carries the idea on touch / reduced motion

    const seg = Math.min(smoothstep(0.08, 0.88, p) * stages.length, stages.length - 0.5);
    const r = smoothstep(0.38, 0.94, p) * 4;
    const vis = 1 - smoothstep(0.93, 1, p); // dissolve back into parchment before the ledger

    if (pin.current) pin.current.dataset.dark = String(p > 0.28 && p < 0.96);
    if (night.current) night.current.style.opacity = String(smoothstep(0.1, 0.38, p) * vis);
    if (img.current) {
      img.current.style.transform = `scale(${lerp(1, 0.15, smoothstep(0.05, 0.55, p))})`;
      img.current.style.borderRadius = `${lerp(0, 50, smoothstep(0.05, 0.32, p))}%`;
      img.current.style.opacity = String((1 - smoothstep(0.84, 0.96, p) * 0.3) * vis);
    }
    rings.current.forEach((ring, k) => {
      if (!ring) return;
      ring.style.opacity = String(smoothstep(k + 0.3, k + 0.9, r) * 0.42 * vis);
      ring.style.transform = `translate(-50%, -50%) scale(${lerp(0.82, 1, smoothstep(k + 0.3, k + 1.1, r))})`;
    });
    tagEls.current.forEach((tag, k) => {
      if (tag) tag.style.opacity = String(smoothstep(k + 0.8, k + 1.3, r) * 0.9 * vis);
    });
    labels.current.forEach((label, i) => {
      if (!label) return;
      const o = clamp01(1 - Math.abs(seg - (i + 0.5)) * 2.2) * vis;
      label.style.opacity = o.toFixed(3);
      label.style.transform = `translate3d(0, ${lerp(22, -22, clamp01(seg - i))}px, 0) scale(${lerp(0.98, 1.02, clamp01(seg - i))})`;
      label.style.visibility = o <= 0.01 ? "hidden" : "visible";
    });
  });

  return (
    <div className={styles.scene} ref={scene} aria-hidden="true">
      <div className={styles.pin} ref={pin}>
        <div className={styles.night} ref={night} />
        <div className={styles.stage}>
          <div className={styles.img} ref={img}>
            <Image src="/images/route-spires.webp" alt="" fill sizes="(max-width: 1100px) 92vw, 1100px" />
          </div>
          {RING_SIZES.map((size, k) => (
            <div
              className={styles.ring}
              key={size}
              style={{ width: `${size}vmin`, height: `${size}vmin` }}
              ref={(el) => {
                rings.current[k] = el;
              }}
            />
          ))}
          {tags.map((tag, k) => (
            <span
              className={styles.tag}
              key={tag}
              style={{ left: "50%", top: `calc(50% - ${TAG_OFFSETS[k]}vmin)` }}
              ref={(el) => {
                tagEls.current[k] = el;
              }}
            >
              {tag}
            </span>
          ))}
          {stages.map((s, i) => (
            <div
              className={styles.label}
              key={s.label}
              ref={(el) => {
                labels.current[i] = el;
              }}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              <p className={styles.display}>{s.label}</p>
              <p className={styles.sub}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
