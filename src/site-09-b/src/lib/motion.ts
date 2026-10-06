"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Runs a requestAnimationFrame loop only while `ref` intersects the viewport.
 * `apply` receives scroll progress of the element (0 when its top hits the
 * viewport top, 1 when its bottom reaches the viewport bottom for a
 * taller-than-viewport element), a monotonic time value, and flags.
 * Progress is smoothed with a lerp so scroll input feels like camera mass.
 */
export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  apply: (p: number, time: number, ctx: { reduced: boolean }) => void,
  options: { smooth?: number; staticProgress?: number } = {}
) {
  const { smooth = 0.085, staticProgress } = options;
  const applyRef = useRef(apply);
  applyRef.current = apply;
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      applyRef.current(staticProgress ?? 0, 0, { reduced: true });
      const onResize = () => applyRef.current(staticProgress ?? 0, 0, { reduced: true });
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let inView = false;
    let raf = 0;
    let current = -1; // force first apply
    let target = 0;

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView && !raf) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "12% 0px 12% 0px" }
    );
    io.observe(el);

    const progressOf = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return clamp01(-rect.top / Math.max(1, rect.height));
      return clamp01(-rect.top / total);
    };

    const tick = (time: number) => {
      raf = 0;
      if (!inView) {
        current = -1;
        return;
      }
      target = progressOf();
      if (current < 0) current = target;
      current = lerp(current, target, smooth);
      if (Math.abs(target - current) < 0.0004) current = target;
      applyRef.current(current, time, { reduced: false });
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (inView && !raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // kick once in case we mount mid-section
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, reduced, smooth, staticProgress]);
}
