"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

/**
 * HERO — the site-01 arrival scene, kept verbatim: one painted view of an
 * Oxford quadrangle, layered haze / foliage / grain, scroll-driven depth.
 * Copy is EN (placeholder until the text conveyor runs).
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);
  const foliageRef = useRef<HTMLDivElement>(null);
  const nearFoliageRef = useRef<HTMLDivElement>(null);
  const hazeRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const endingRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch devices: the arrival plays itself once (GPU transforms only),
    // then the page scrolls normally — no scroll-coupled choreography.
    const autoplay = window.matchMedia("(pointer: coarse)").matches;
    const AUTOPLAY_MS = 5000;
    const AUTOPLAY_DELAY_MS = 700;

    let current = 0;
    let target = 0;
    let frame = 0;
    let visible = false;
    let autoplayStart = 0;

    const readPosition = () => {
      if (autoplay) {
        target = clamp((performance.now() - autoplayStart) / AUTOPLAY_MS);
        return;
      }
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      target = clamp(-rect.top / travel);
    };

    const draw = () => {
      if (autoplay) readPosition();
      current += (target - current) * 0.085;
      if (Math.abs(target - current) < 0.0002) current = target;

      const p = current;
      const landscape = landscapeRef.current;
      const foliage = foliageRef.current;
      const nearFoliage = nearFoliageRef.current;
      const haze = hazeRef.current;
      const light = lightRef.current;
      const copy = copyRef.current;
      const ending = endingRef.current;
      const cue = cueRef.current;

      if (landscape) {
        landscape.style.transform = `translate3d(${-p * 5.2}%, ${p * 1.8}%, 0) scale(${1 + p * 0.31})`;
      }
      if (foliage) {
        foliage.style.transform = `translate3d(${-p * 12.5}%, ${-p * 19}%, 0) scale(${1.02 + p * 0.53})`;
        foliage.style.opacity = String(clamp(1 - ease(0.34, 0.88, p)));
      }
      if (nearFoliage) {
        nearFoliage.style.transform = `translate3d(${p * 15}%, ${-p * 29}%, 0) scale(${1.35 + p * 0.65}) rotate(-9deg)`;
        nearFoliage.style.opacity = String(clamp(0.46 * (1 - ease(0.08, 0.63, p))));
      }
      if (haze) {
        haze.style.transform = `translate3d(0, ${-p * 14}%, 0)`;
        haze.style.opacity = String(clamp(0.75 - p * 0.49));
      }
      if (light) {
        light.style.transform = `translate3d(${p * 7}%, ${p * 3}%, 0)`;
        light.style.opacity = String(0.23 + p * 0.17);
      }
      if (copy && !autoplay) {
        copy.style.opacity = String(1 - ease(0.18, 0.53, p));
        copy.style.transform = `translate3d(0, ${-p * 36}px, 0)`;
        copy.style.visibility = p > 0.57 ? "hidden" : "visible";
      }
      if (ending && !autoplay) {
        ending.style.opacity = String(ease(0.67, 0.9, p));
        ending.style.transform = `translate3d(0, ${(1 - ease(0.67, 0.9, p)) * 27}px, 0)`;
      }
      if (cue) cue.style.opacity = String(1 - ease(0.02, 0.3, p));

      if (visible && !(autoplay && current >= 1)) frame = window.requestAnimationFrame(draw);
    };

    if (autoplay) {
      visible = true;
      autoplayStart = performance.now() + AUTOPLAY_DELAY_MS;
      frame = window.requestAnimationFrame(draw);
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          readPosition();
          window.cancelAnimationFrame(frame);
          frame = window.requestAnimationFrame(draw);
        } else {
          window.cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "15% 0px 15% 0px" },
    );

    observer.observe(hero);
    window.addEventListener("scroll", readPosition, { passive: true });
    window.addEventListener("resize", readPosition);
    readPosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", readPosition);
      window.removeEventListener("resize", readPosition);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef} aria-labelledby="hero-heading">
      <div className="hero-sticky">
        <div className="hero-sky" aria-hidden="true" />
        <div
          className="hero-landscape"
          ref={landscapeRef}
          role="img"
          aria-label="Watercolour view of an Oxford quadrangle lit by morning sun, with stone arches and trees"
        />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-haze" ref={hazeRef} aria-hidden="true" />
        <div className="hero-light" ref={lightRef} aria-hidden="true" />
        <div className="hero-foliage" ref={foliageRef} aria-hidden="true" />
        <div className="hero-foliage-near" ref={nearFoliageRef} aria-hidden="true" />
        <div className="hero-foliage-bottom" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div className="hero-copy" ref={copyRef}>
          <p className="hero-eyebrow"><span className="eyebrow-line" /> OXFORD · UNITED KINGDOM</p>
          <h1 id="hero-heading">There is more<br /><em>than one way in.</em></h1>
          <p className="hero-description">
            Independent education consultancy in Oxford. We help international families find their
            route — from the first school to the next big chapter.
          </p>
          <div className="hero-actions">
            <a className="button button-solid" href="#consult">
              Book a consultation <span aria-hidden="true">↗</span>
            </a>
            <a className="inline-link hero-explore" href="#route">
              Explore ALBION <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        {/* CTA dock: on touch the buttons stay docked while the copy rides away */}
        <div className="hero-cta-dock">
          <a className="button button-solid" href="#consult">
            Book a consultation <span aria-hidden="true">↗</span>
          </a>
          <a className="inline-link" href="#route">
            Explore ALBION <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="hero-scroll-cue" ref={cueRef} aria-hidden="true">
          <span>SCROLL TO ENTER</span>
          <span className="scroll-cue-line" />
          <span>01 / 09</span>
        </div>

        <div className="hero-ending" ref={endingRef} aria-hidden="true">
          <span className="hero-ending-index">A NEW PERSPECTIVE / 01</span>
          <p>The way forward<br /><em>comes into view.</em></p>
        </div>
      </div>
    </section>
  );
}
