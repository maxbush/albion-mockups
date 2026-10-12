"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Soft reveal for [data-reveal] blocks (opacity + transform only).
 * Elements already in view are never hidden; nothing is hidden without JS.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-state])"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((el) => (el.dataset.revealState = "shown"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealState = "shown";
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    const vh = window.innerHeight;
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.94) {
        el.dataset.revealState = "shown";
        return;
      }
      el.dataset.revealState = "pending";
      io.observe(el);
    });

    return () => {
      io.disconnect();
      document
        .querySelectorAll<HTMLElement>('[data-reveal-state="pending"]')
        .forEach((el) => (el.dataset.revealState = "shown"));
    };
  }, [pathname]);

  return null;
}
