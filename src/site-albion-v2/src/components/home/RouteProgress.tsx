"use client";

import { useEffect } from "react";
import { refreshScroll, subscribeScroll } from "@/lib/scroll-engine";

/** Brass progress hairline for the route. Runs on the shared rAF loop; transform + opacity only. */
export default function RouteProgress({ trackId }: { trackId: string }) {
  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const rail = track.querySelector<HTMLElement>("[data-rail]");
    const fill = track.querySelector<HTMLElement>("[data-rail-fill]");
    const stops = Array.from(track.querySelectorAll<HTMLElement>("[data-stop]"));
    const dots = stops.map((stop) => stop.querySelector<HTMLElement>("[data-dot]"));
    if (!rail || !fill || stops.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let trackTop = 0;
    let railStart = 0;
    let railLength = 1;
    let offsets: number[] = [];
    let last = -1;

    const measure = () => {
      const trackRect = track.getBoundingClientRect();
      trackTop = trackRect.top + window.scrollY;
      const centers = dots.map((dot) => {
        if (!dot) return 0;
        const rect = dot.getBoundingClientRect();
        return rect.top + rect.height / 2 - trackRect.top;
      });
      railStart = centers[0];
      railLength = Math.max(1, centers[centers.length - 1] - railStart);
      rail.style.top = `${railStart}px`;
      rail.style.bottom = "auto";
      rail.style.height = `${railLength}px`;
      offsets = centers.map((center) => center - railStart);
      last = -1;
    };

    const render = (y: number) => {
      const line = y + window.innerHeight * 0.58 - trackTop - railStart;
      const p = Math.min(1, Math.max(0, line / railLength));
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      fill.style.transform = `scaleY(${p.toFixed(4)})`;
      stops.forEach((stop, i) => {
        const lit = line >= offsets[i] - 1 ? "true" : "false";
        if (stop.dataset.lit !== lit) stop.dataset.lit = lit;
      });
    };

    let unsubscribe: (() => void) | null = null;
    const start = () => {
      unsubscribe?.();
      unsubscribe = null;
      measure();
      if (reduced.matches) {
        fill.style.transform = "scaleY(1)";
        stops.forEach((stop) => (stop.dataset.lit = "true"));
        return;
      }
      unsubscribe = subscribeScroll(render);
    };

    const ro = new ResizeObserver(() => {
      measure();
      refreshScroll();
    });
    ro.observe(track);

    start();
    reduced.addEventListener("change", start);

    return () => {
      unsubscribe?.();
      ro.disconnect();
      reduced.removeEventListener("change", start);
    };
  }, [trackId]);

  return null;
}
