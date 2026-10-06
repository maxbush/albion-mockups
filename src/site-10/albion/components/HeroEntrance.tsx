'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import type { Dictionary } from '@/dictionaries/en';
import MagneticButton from './MagneticButton';
import styles from './HeroEntrance.module.css';

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* light motes drifting in the sunbeam — fixed layout, CSS-driven */
const MOTES: Array<{
  left: string;
  top: string;
  size: number;
  dur: string;
  delay: string;
}> = [
  { left: '6%', top: '58%', size: 4, dur: '9s', delay: '0s' },
  { left: '12%', top: '34%', size: 3, dur: '11s', delay: '-3s' },
  { left: '22%', top: '66%', size: 5, dur: '10s', delay: '-6s' },
  { left: '31%', top: '28%', size: 3, dur: '12s', delay: '-2s' },
  { left: '43%', top: '55%', size: 4, dur: '9.5s', delay: '-7s' },
  { left: '52%', top: '36%', size: 3, dur: '11.5s', delay: '-4s' },
  { left: '61%', top: '63%', size: 5, dur: '10.5s', delay: '-1s' },
  { left: '70%', top: '30%', size: 3, dur: '9.8s', delay: '-8s' },
  { left: '78%', top: '56%', size: 4, dur: '12.5s', delay: '-5s' },
  { left: '86%', top: '38%', size: 3, dur: '10.2s', delay: '-2.5s' },
  { left: '17%', top: '46%', size: 3, dur: '13s', delay: '-9s' },
  { left: '57%', top: '70%', size: 4, dur: '11s', delay: '-6.5s' },
];

function Bird({ className }: { className: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 8" focusable="false" aria-hidden="true">
        <path
          d="M1 6 Q7 1 12 5 Q17 1 23 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function HeroEntrance({ dict }: { dict: Dictionary['hero'] }) {
  const rootRef = useRef<HTMLElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const liveRef = useRef(false);

  /* entrance: wait for the hero images to decode (bounded), so the reveal
     fades in real pixels instead of popping mid-fade on a cold load */
  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      liveRef.current = true;
      setLive(true);
    };
    const revealSoon = () => requestAnimationFrame(() => requestAnimationFrame(reveal));
    const imgs = [farRef.current, nearRef.current]
      .map((n) => n?.querySelector('img'))
      .filter((el): el is HTMLImageElement => !!el);
    const ready = (el: HTMLImageElement) => el.complete && el.naturalWidth > 0;
    if (imgs.length === 0 || imgs.every(ready)) {
      const id = revealSoon();
      return () => { cancelled = true; cancelAnimationFrame(id); };
    }
    let pending = imgs.length;
    const finish = () => {
      pending -= 1;
      if (pending <= 0) revealSoon();
    };
    const cap = setTimeout(() => { pending = 0; revealSoon(); }, 1400);
    imgs.forEach((el) => {
      if (ready(el)) finish();
      else {
        el.addEventListener('load', finish, { once: true });
        el.addEventListener('error', finish, { once: true });
      }
    });
    return () => { cancelled = true; clearTimeout(cap); };
  }, []);

  /* scroll drive: rAF loop with lerp smoothing, paused off-screen.
     Doubles as the ambient freeze switch for CSS-driven layers. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    let raf = 0;
    let target = 0;
    let current = -1;
    let running = false;
    let inView = true;

    const apply = (p: number) => {
      /* the quad approaches — slow, stately */
      if (farRef.current) {
        const s = 1.03 + p * 0.13;
        farRef.current.style.transform = `translate3d(0, ${(-p * 36).toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
      }
      /* sunlit foliage sweeps past the camera and dissolves */
      if (nearRef.current) {
        const s = 1 + p * 0.4;
        nearRef.current.style.transform =
          `translate3d(0, ${(p * 80).toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
        nearRef.current.style.opacity = (1 - smoothstep(0.1, 0.8, p)).toFixed(3);
      }
      if (veilRef.current) {
        veilRef.current.style.opacity = (0.9 - p * 0.3).toFixed(3);
      }
      /* the sun-glow drifts with the camera; near mist rises fast (depth) */
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate3d(${(p * 50).toFixed(1)}px, ${(-p * 36).toFixed(1)}px, 0)`;
      }
      if (mistRef.current) {
        mistRef.current.style.transform = `translate3d(0, ${(-p * 130).toFixed(1)}px, 0)`;
        mistRef.current.style.opacity = (0.85 - p * 0.45).toFixed(3);
      }
      /* the locomotive copy leaves early … (never on touch autoplay —
         there the copy stays; the camera move is the whole story) */
      if (contentRef.current && !isCoarse) {
        contentRef.current.style.transform = `translate3d(0, ${(-p * 150).toFixed(1)}px, 0)`;
        contentRef.current.style.opacity = (1 - smoothstep(0.03, 0.48, p)).toFixed(3);
      }
      /* … and the arrival line greets you inside (scroll version only) */
      if (arrivalRef.current && !isCoarse) {
        const a = smoothstep(0.52, 0.82, p);
        arrivalRef.current.style.opacity = a.toFixed(3);
        arrivalRef.current.style.transform =
          `translate3d(0, ${((1 - a) * 46).toFixed(1)}px, 0)`;
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = Math.max(0, 1 - p * 4).toFixed(3);
      }
    };

    const tick = () => {
      if (current < 0) current = target;
      current += (target - current) * 0.13;
      if (Math.abs(target - current) < 0.0006) current = target;
      apply(current);
      if (current !== target) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const compute = () => {
      const total = root.offsetHeight - window.innerHeight;
      const raw = total > 0 ? -root.getBoundingClientRect().top / total : 0;
      target = Math.max(0, Math.min(1, raw));
      if (!running && inView) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    /* Touch devices: play the arrival once on a timer (after the entrance
       settles), then normal scrolling. */
    if (window.matchMedia('(pointer: coarse)').matches) {
      let t0 = 0;
      const duration = 5000;
      const auto = () => {
        target = Math.max(0, Math.min(1, (performance.now() - t0) / duration));
        if (!running && inView) {
          running = true;
          raf = requestAnimationFrame(tick);
        }
        if (target < 1) requestAnimationFrame(auto);
      };
      const arm = () => {
        if (liveRef.current) {
          /* let the staggered copy rise finish (last delay ~1s + ~1.2s run)
             before the journey starts pulling it away */
          t0 = performance.now() + 2600;
          requestAnimationFrame(auto);
        } else {
          setTimeout(arm, 90);
        };
      };
      arm();
      return () => cancelAnimationFrame(raf);
    }

    const onScroll = () => compute();
    const onResize = () => compute();
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        ambientRef.current?.classList.toggle(styles.frozen, !inView);
        if (inView) compute();
      },
      { threshold: 0 },
    );

    io.observe(root);
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const rise = (delay: string): CSSProperties => ({ transitionDelay: delay });

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className={`${styles.hero}${live ? ` ${styles.isLive}` : ''}`}
    >
      <div className={styles.stage}>
        <div className={styles.farEnter}>
          <div ref={farRef} className={styles.far}>
            <Image
              src="/images/hero-court.jpg"
              alt={dict.courtAlt}
              fill
              priority
              sizes="100vw"
            />
          </div>
        </div>

        <div className={styles.nearEnter}>
          <div ref={nearRef} className={styles.near}>
            <Image
              src="/images/foliage.jpg"
              alt=""
              aria-hidden="true"
              fill
              fetchPriority="high"
              sizes="100vw"
            />
          </div>
        </div>

        <div className={styles.veilEnter}>
          <div ref={veilRef} className={styles.veil} aria-hidden="true" />
        </div>

        <div ref={ambientRef} className={styles.ambient} aria-hidden="true">
          <div ref={glowRef} className={styles.glowShift}>
            <div className={styles.glowPulse} />
          </div>
          <div className={`${styles.mist} ${styles.mistA}`} />
          <div className={`${styles.mist} ${styles.mistB}`} />
          <div ref={mistRef} className={`${styles.mist} ${styles.mistC}`} />
          {MOTES.map((m, i) => (
            <span
              key={i}
              className={styles.mote}
              style={{
                left: m.left,
                top: m.top,
                width: m.size,
                height: m.size,
                animationDuration: m.dur,
                animationDelay: m.delay,
              }}
            />
          ))}
          <Bird className={`${styles.bird} ${styles.bird1}`} />
          <Bird className={`${styles.bird} ${styles.bird2}`} />
        </div>

        <div className={styles.contentEnter}>
          <div ref={contentRef} className={styles.content}>
            <div className={`container ${styles.contentPad}`}>
              <div className={styles.grid}>
                <div>
                  <p className="eyebrow" style={rise('0.55s')}>
                    <span className={styles.rise} style={rise('0.55s')}>
                      {dict.eyebrow}
                    </span>
                  </p>
                  <h1
                    id="hero-title"
                    className={`display ${styles.title} ${styles.rise}`}
                    style={rise('0.68s')}
                  >
                    <span>{dict.titleA}</span>
                    <span>{dict.titleB}</span>
                  </h1>
                  <p className={`${styles.lede} ${styles.rise}`} style={rise('0.8s')}>
                    {dict.lede}
                  </p>
                  <p className={`${styles.ctaRow} ${styles.rise}`} style={rise('0.92s')}>
                    <MagneticButton href="#contact" variant="primary">
                      {dict.primary}
                    </MagneticButton>
                    <MagneticButton href="#route" variant="ghost">
                      {dict.secondary}
                    </MagneticButton>
                  </p>
                </div>
                <div className={`${styles.meta} ${styles.rise}`} style={rise('1.02s')}>
                  <p className={styles.numeral} aria-hidden="true">
                    {dict.experienceValue}
                  </p>
                  <p className={styles.metaText}>
                    <strong>{dict.experienceLabel}</strong>
                    {dict.responseLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA dock: on touch devices the buttons stay put while the copy
            rides away — the user never scrolled, so the actions never leave */}
        <div className={styles.ctaDock}>
          <MagneticButton href="#contact" variant="primary">
            {dict.primary}
          </MagneticButton>
          <MagneticButton href="#route" variant="ghost">
            {dict.secondary}
          </MagneticButton>
        </div>

        <div ref={arrivalRef} className={styles.arrivalWrap} aria-hidden="true">
          <div className={styles.arrivalScrim} />
          <p className={`display ${styles.arrival}`}>{dict.arrival}</p>
        </div>

        <div ref={cueRef} className={styles.cue} aria-hidden="true">
          <span className={styles.cueLabel}>{dict.scrollHint}</span>
          <span className={styles.cueLine} />
        </div>
      </div>
    </section>
  );
}
