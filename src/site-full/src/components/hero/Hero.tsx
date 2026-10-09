"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";
import type { CSSVars } from "@/lib/css";
import type { Dictionary } from "@/lib/i18n";
import { refreshScroll, subscribeScroll } from "@/lib/scroll-engine";
import styles from "./Hero.module.css";

/* ─────────── Decorative atmosphere data (deterministic → no hydration mismatch) ─────────── */

interface Blob {
  l: number;
  t: number;
  w: number;
  h: number;
  a: number;
  dx: string;
  dy: string;
  dur: number;
  delay: number;
}

const FOG_FAR: Blob[] = [
  { l: 4, t: 30, w: 56, h: 30, a: 0.42, dx: "4vw", dy: "-1vh", dur: 72, delay: -20 },
  { l: 44, t: 36, w: 60, h: 28, a: 0.38, dx: "-5vw", dy: "1vh", dur: 86, delay: -44 },
  { l: 18, t: 12, w: 52, h: 24, a: 0.3, dx: "3vw", dy: "0.6vh", dur: 98, delay: -12 },
];

const FOG_MID: Blob[] = [
  { l: -6, t: 50, w: 58, h: 30, a: 0.5, dx: "6vw", dy: "-1.5vh", dur: 46, delay: -8 },
  { l: 40, t: 55, w: 62, h: 28, a: 0.46, dx: "-7vw", dy: "1vh", dur: 56, delay: -30 },
  { l: 16, t: 64, w: 56, h: 26, a: 0.4, dx: "5vw", dy: "-1vh", dur: 64, delay: -16 },
];

const FOG_NEAR: Blob[] = [
  { l: -12, t: 62, w: 72, h: 46, a: 0.55, dx: "8vw", dy: "-2vh", dur: 30, delay: -6 },
  { l: 38, t: 66, w: 74, h: 42, a: 0.5, dx: "-9vw", dy: "-1vh", dur: 37, delay: -18 },
  { l: 8, t: 80, w: 82, h: 36, a: 0.46, dx: "6vw", dy: "-2.5vh", dur: 43, delay: -25 },
  { l: 62, t: 40, w: 44, h: 30, a: 0.24, dx: "-5vw", dy: "1vh", dur: 34, delay: -3 },
];

interface Mote {
  x: number;
  y: number;
  s: number;
  dur: number;
  delay: number;
  fx: number;
  fy: number;
  tw: number;
}

const MOTES: Mote[] = [
  { x: 78, y: 22, s: 3, dur: 13, delay: -2, fx: 14, fy: -18, tw: 4.2 },
  { x: 70, y: 31, s: 2, dur: 11, delay: -5, fx: -12, fy: -14, tw: 3.1 },
  { x: 64, y: 17, s: 4, dur: 16, delay: -9, fx: 10, fy: 16, tw: 5.3 },
  { x: 58, y: 37, s: 2.5, dur: 12, delay: -1, fx: 16, fy: -10, tw: 3.7 },
  { x: 84, y: 35, s: 3, dur: 15, delay: -7, fx: -14, fy: 12, tw: 4.8 },
  { x: 52, y: 45, s: 2, dur: 10, delay: -3, fx: 12, fy: -16, tw: 2.9 },
  { x: 74, y: 47, s: 3.5, dur: 17, delay: -11, fx: -10, fy: -20, tw: 5.9 },
  { x: 66, y: 55, s: 2, dur: 12, delay: -6, fx: 14, fy: 10, tw: 3.4 },
  { x: 89, y: 15, s: 2.5, dur: 14, delay: -4, fx: -16, fy: 14, tw: 4.4 },
  { x: 60, y: 26, s: 3, dur: 13, delay: -8, fx: 12, fy: 18, tw: 3.9 },
  { x: 47, y: 55, s: 2.5, dur: 15, delay: -10, fx: -12, fy: -12, tw: 5.1 },
  { x: 81, y: 59, s: 2, dur: 11, delay: -2.5, fx: 10, fy: -14, tw: 3.3 },
];

const RAYS = [
  { r: -19, h: 9, o: 0.34, dur: 11, delay: -3 },
  { r: -30, h: 15, o: 0.22, dur: 14, delay: -8 },
  { r: -42, h: 7, o: 0.3, dur: 9, delay: -1 },
];

/* ─────────── Easing / mapping helpers ─────────── */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInQuad = (t: number) => t * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const n = (v: number) => v.toFixed(4);

function blobStyle(b: Blob): CSSVars {
  return {
    left: `${b.l}%`,
    top: `${b.t}%`,
    width: `${b.w}%`,
    height: `${b.h}%`,
    "--a": b.a,
    "--dx": b.dx,
    "--dy": b.dy,
    "--dur": `${b.dur}s`,
    "--delay": `${b.delay}s`,
  };
}

export default function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Art direction for the near plane: wide frame for landscape, tall frame for portrait screens.
  const foliageBase = {
    alt: "",
    sizes: "100vw",
    quality: 80,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const {
    props: { srcSet: foliageWide },
  } = getImageProps({ ...foliageBase, src: "/images/hero-foliage-wide.webp", width: 1600, height: 1200 });
  const {
    props: { srcSet: foliageTall, ...foliageImg },
  } = getImageProps({ ...foliageBase, src: "/images/hero-foliage-tall.webp", width: 1200, height: 1600 });

  // Same art direction for the quad: full facade for landscape, gatehouse crop for portrait.
  const quadBase = { alt: "", sizes: "100vw", quality: 80, loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: quadWide },
  } = getImageProps({ ...quadBase, src: "/images/hero-quad.webp", width: 1496, height: 1126 });
  const {
    props: { srcSet: quadTall, ...quadImg },
  } = getImageProps({ ...quadBase, src: "/images/hero-quad-tall.webp", width: 572, height: 986 });

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const pick = (name: string) => stage.querySelector<HTMLElement>(`[data-layer="${name}"]`);
    const quad = pick("quad");
    const fogFar = pick("fog-far");
    const fogMid = pick("fog-mid");
    const foliage = pick("foliage");
    const foliageNear = pick("foliage-near");
    const foliageBottom = pick("foliage-bottom");
    const sun = pick("sun");
    const beams = pick("beams");
    const motes = pick("motes");
    const fogNear = pick("fog-near");
    const veil = pick("veil");
    const shadeTop = pick("shade-top");
    const shadeText = pick("shade-text");
    const content = pick("content");
    const cue = pick("cue");
    const glow = pick("glow");
    const arrival = pick("arrival");

    const animated = [
      quad, fogFar, fogMid, foliage, foliageNear, foliageBottom, sun, beams, motes,
      fogNear, veil, shadeTop, shadeText, content, cue, glow, arrival,
    ].filter((node): node is HTMLElement => node !== null);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Touch devices: play the arrival once on a timer, then normal scrolling.
    const coarse = window.matchMedia("(pointer: coarse)");

    let top = 0;
    let travel = 1;
    let inView = true;
    let last = -1;
    let progress = 0;
    let unsubscribe: (() => void) | null = null;

    const measure = () => {
      top = root.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, root.offsetHeight - stage.offsetHeight);
      last = -1;
    };

    const setT = (node: HTMLElement | null, transform: string, opacity?: number) => {
      if (!node) return;
      node.style.transform = transform;
      if (opacity !== undefined) node.style.opacity = opacity < 0.001 ? "0" : opacity.toFixed(3);
    };
    const setO = (node: HTMLElement | null, opacity: number) => {
      if (node) node.style.opacity = opacity < 0.001 ? "0" : opacity.toFixed(3);
    };

    /** One dolly-in: every layer is a pure function of the smoothed progress. transform + opacity only. */
    const render = (p: number) => {
      if (!inView) return;
      if (Math.abs(p - last) < 0.0003) return;
      last = p;
      progress = p;

      // Far plane — the quad slowly comes closer, anchored on the gate arch.
      const dolly = easeInOutSine(p);
      setT(quad, `translate3d(0, ${n(-1.4 * dolly)}vh, 0) scale(${n(1.04 + 0.27 * dolly)})`);

      // Atmosphere — each depth moves at its own speed.
      setT(fogFar, `translate3d(0, ${n(-6 * p)}vh, 0) scale(${n(1 + 0.1 * p)})`, 1 - 0.45 * seg(p, 0.2, 1));

      const mid = easeInQuad(seg(p, 0, 0.95));
      setT(fogMid, `translate3d(0, ${n(-28 * mid)}vh, 0) scale(${n(1 + 0.3 * mid)})`, 1 - 0.6 * seg(p, 0.35, 1));

      // Near plane — foliage rushes past the camera and melts.
      const pass = easeInQuad(seg(p, 0, 0.82));
      setT(foliage, `scale(${n(1 + 1.65 * pass)})`, 1 - easeInOutSine(seg(p, 0.2, 0.7)));

      // Even closer: a blurred branch sweeps the lens sooner, bottom leaves drift up.
      const passN = easeInQuad(seg(p, 0, 0.75));
      setT(
        foliageNear,
        `translate3d(${n(6 * passN)}%, ${n(-24 * passN)}%, 0) scale(${n(1 + 1.9 * passN)})`,
        0.5 * (1 - easeInOutSine(seg(p, 0.15, 0.6))),
      );
      const passB = easeInQuad(seg(p, 0, 0.8));
      setT(
        foliageBottom,
        `translate3d(0, ${n(-30 * passB)}vh, 0) scale(${n(1 + 1.2 * passB)})`,
        0.35 * (1 - seg(p, 0.25, 0.65)),
      );

      // Light — the warm spot drifts with the camera, rays fade as we step into the light.
      setT(sun, `translate3d(${n(-7 * p)}vw, ${n(5 * p)}vh, 0) scale(${n(1 + 0.3 * p)})`);
      setT(
        beams,
        `translate3d(${n(-5 * p)}vw, ${n(4 * p)}vh, 0) scale(${n(1 + 0.18 * p)})`,
        0.85 + 0.15 * seg(p, 0, 0.45) - 0.55 * seg(p, 0.62, 1),
      );
      setT(motes, `translate3d(${n(-3 * p)}vw, ${n(-11 * p)}vh, 0) scale(${n(1 + 0.35 * p)})`, 1 - 0.7 * seg(p, 0.55, 0.95));

      // Near fog soars up past the lens.
      const rise = easeInQuad(seg(p, 0.04, 0.85));
      setT(fogNear, `translate3d(0, ${n(-75 * rise)}vh, 0) scale(${n(1 + 0.4 * rise)})`, 1 - seg(p, 0.5, 0.9));

      setO(veil, 0.16 * seg(p, 0.45, 1));
      setO(shadeTop, 1 - 0.45 * seg(p, 0.3, 0.9));
      // Text-backdrop shade stays on touch — the copy never leaves there.
      setO(shadeText, coarse.matches ? 1 : 1 - 0.82 * seg(p, 0.04, 0.4));

      // Text leaves first — scroll version only; on touch the copy stays,
      // the camera move is the whole story.
      if (!coarse.matches) {
        const leave = seg(p, 0, 0.3);
        setT(content, `translate3d(0, ${n(-9 * easeInQuad(leave))}vh, 0)`, 1 - easeInOutSine(seg(p, 0.02, 0.26)));
        if (content) content.style.pointerEvents = p > 0.2 ? "none" : "";
        setO(cue, 1 - seg(p, 0, 0.08));

        // Arrival line surfaces at the end of the ride.
        const arrive = easeOutCubic(seg(p, 0.7, 0.94));
        setT(arrival, `translate3d(0, ${n((1 - arrive) * 3.5)}vh, 0) scale(${n(0.965 + 0.035 * arrive)})`, arrive);
        setT(glow, `scale(${n(0.85 + 0.15 * easeOutCubic(seg(p, 0.6, 1)))})`, seg(p, 0.6, 0.95));
      }
    };

    const reset = () => {
      animated.forEach((node) => {
        node.style.transform = "";
        node.style.opacity = "";
        node.style.pointerEvents = "";
      });
    };

    const start = () => {
      unsubscribe?.();
      unsubscribe = null;
      if (reduced.matches) {
        reset();
        return;
      }
      if (coarse.matches) {
        const t0 = performance.now() + 700;
        const duration = 5000;
        const auto = () => {
          const t = clamp01((performance.now() - t0) / duration);
          render(t * t * (3 - 2 * t));
          if (t < 1) requestAnimationFrame(auto);
        };
        requestAnimationFrame(auto);
        return;
      }
      measure();
      unsubscribe = subscribeScroll((y) => render(clamp01((y - top) / travel)));
    };

    // Freeze CSS atmosphere animations whenever the hero is off-screen.
    const io = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      inView = entry.isIntersecting;
      stage.dataset.paused = inView ? "false" : "true";
      if (inView) {
        last = -1;
        refreshScroll();
      }
    });
    io.observe(root);

    const ro = new ResizeObserver(() => {
      measure();
      refreshScroll();
    });
    ro.observe(root);
    ro.observe(stage);

    // Keyboard users tabbing back into faded content get the hero scrolled back into its first frame.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || reduced.matches || progress < 0.12) return;
      if (!target.matches(":focus-visible")) return;
      window.scrollTo({ top, behavior: "smooth" });
    };
    content?.addEventListener("focusin", onFocusIn);

    start();
    reduced.addEventListener("change", start);

    return () => {
      unsubscribe?.();
      io.disconnect();
      ro.disconnect();
      reduced.removeEventListener("change", start);
      content?.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} data-hero="" aria-labelledby="hero-title">
      <div ref={stageRef} className={styles.stage} data-paused="false">
        {/* Far plane: watercolour Oxford quad in the morning haze */}
        <div className={`${styles.layer} ${styles.quad}`} data-layer="quad">
          <picture className={styles.picture}>
            <source media="(orientation: landscape)" srcSet="/images/hero-quad.webp" sizes="100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...quadImg}
              srcSet={quadTall}
              alt="Watercolour: an Oxford quad with its gatehouse tower in morning haze"
              className={styles.quadImg}
            />
          </picture>
        </div>

        <div className={styles.fog} data-layer="fog-far" aria-hidden="true">
          {FOG_FAR.map((b, i) => (
            <span key={i} className={styles.blob} style={blobStyle(b)} />
          ))}
        </div>

        <div className={styles.fog} data-layer="fog-mid" aria-hidden="true">
          {FOG_MID.map((b, i) => (
            <span key={i} className={styles.blob} style={blobStyle(b)} />
          ))}
        </div>

        {/* Near plane: sunlit foliage & wisteria; paper dissolves via multiply, oval mask opens the centre */}
        <div className={`${styles.layer} ${styles.foliage}`} data-layer="foliage" aria-hidden="true">
          <picture className={styles.picture}>
            <source media="(orientation: landscape)" srcSet="/images/hero-foliage-wide.webp" sizes="100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...foliageImg} srcSet={foliageTall} alt="" className={styles.foliageImg} />
          </picture>
        </div>

        {/* Closest planes: a blurred overhanging branch and leaves rising from below */}
        <div className={`${styles.layer} ${styles.foliageNear}`} data-layer="foliage-near" aria-hidden="true" />
        <div className={`${styles.layer} ${styles.foliageBottom}`} data-layer="foliage-bottom" aria-hidden="true">
          <div className={styles.foliageBottomImg} />
        </div>

        <div className={styles.sun} data-layer="sun" aria-hidden="true">
          <div className={styles.sunCore} />
        </div>

        <div className={styles.beams} data-layer="beams" aria-hidden="true">
          {RAYS.map((ray, i) => (
            <span
              key={i}
              className={styles.ray}
              style={
                {
                  "--r": `${ray.r}deg`,
                  "--h": `${ray.h}vmax`,
                  "--o": ray.o,
                  "--dur": `${ray.dur}s`,
                  "--delay": `${ray.delay}s`,
                } as CSSVars
              }
            />
          ))}
        </div>

        <div className={`${styles.layer} ${styles.motes}`} data-layer="motes" aria-hidden="true">
          {MOTES.map((m, i) => (
            <span
              key={i}
              className={styles.mote}
              style={
                {
                  "--x": `${m.x}%`,
                  "--y": `${m.y}%`,
                  "--s": `${m.s}px`,
                  "--dur": `${m.dur}s`,
                  "--delay": `${m.delay}s`,
                  "--fx": m.fx,
                  "--fy": m.fy,
                  "--tw": `${m.tw}s`,
                } as CSSVars
              }
            />
          ))}
        </div>

        <div className={styles.fog} data-layer="fog-near" aria-hidden="true">
          {FOG_NEAR.map((b, i) => (
            <span key={i} className={styles.blob} style={blobStyle(b)} />
          ))}
        </div>

        <div className={`${styles.layer} ${styles.veil}`} data-layer="veil" aria-hidden="true" />
        <div className={`${styles.layer} ${styles.shadeTop}`} data-layer="shade-top" aria-hidden="true" />
        <div className={`${styles.layer} ${styles.shadeText}`} data-layer="shade-text" aria-hidden="true" />
        <div className={`${styles.layer} ${styles.shadeFloor}`} aria-hidden="true" />

        {/* Content: bottom-left, deliberately off-axis */}
        <div className={styles.content} data-layer="content">
          <div className={styles.contentInner}>
            <p className={styles.eyebrow}>{dict.eyebrow}</p>
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.line}>{dict.title1}</span>
              <span className={`${styles.line} ${styles.lineIndent}`}>{dict.title2}</span>
              <span className={`${styles.line} ${styles.lineItalic}`}>{dict.title3}</span>
            </h1>
            <p className={styles.lead}>
              {dict.lead} <span className={styles.leadMore}>{dict.leadMore}</span>
            </p>
            <div className={styles.actions}>
              <a href="#consultation" className="btn btn-brass">
                {dict.cta1}
              </a>
              <a href="#route" className="btn btn-ghost">
                {dict.cta2}
                <span className="btn-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
            <div className={styles.proof}>
              <span className={styles.proofNum}>{dict.proofNum}</span>
              <span className={styles.proofText}>{dict.proofText}</span>
            </div>
          </div>
        </div>

        {/* CTA dock: on touch the buttons stay docked while the copy rides away */}
        <div className={styles.ctaDock}>
          <a href="#consultation" className="btn btn-brass">
            {dict.cta1}
          </a>
          <a href="#route" className="btn btn-ghost">
            {dict.cta2}
            <span className="btn-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>

        <div className={styles.cue} data-layer="cue" aria-hidden="true">
          <span className={styles.cueText}>{dict.scroll}</span>
          <span className={styles.cueLine} />
        </div>

        {/* Arrival line — surfaces at the end of the dolly-in */}
        <div className={styles.arrivalWrap}>
          <div className={styles.arrivalGlow} data-layer="glow" aria-hidden="true" />
          <p className={styles.arrival} data-layer="arrival">
            <span className={styles.arrivalRule} aria-hidden="true" />
            <span className={styles.arrivalLine}>{dict.arrival}</span>
            {dict.arrivalSub && <span className={styles.arrivalSub}>{dict.arrivalSub}</span>}
          </p>
        </div>
      </div>
    </section>
  );
}
