'use client';

import { useEffect, useRef } from 'react';
import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import styles from './SchoolsMarquee.module.css';

/* Marquee with scroll velocity: a slow base drift plus an impulse taken
   from scrolling, decaying exponentially. One rAF loop, transform-only,
   paused off-screen / when the tab is hidden. Static under reduced motion. */
export default function SchoolsMarquee({ dict }: { dict: Dictionary['schools'] }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let running = false;
    let inView = false;
    let hovering = false;
    let pos = 0;
    let vel = 0;
    let half = 1;
    let lastY = window.scrollY;
    let lastT = 0;

    const measure = () => {
      half = Math.max(1, track.scrollWidth / 2);
      pos = pos % half;
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      lastT = 0;
      lastY = window.scrollY;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const loop = (t: number) => {
      if (!running) return;
      const dt = Math.min(0.05, lastT ? (t - lastT) / 1000 : 0.016);
      lastT = t;

      const y = window.scrollY;
      vel += (y - lastY) * 7;
      lastY = y;
      vel *= Math.exp(-2.8 * dt);
      vel = Math.max(-1100, Math.min(1100, vel));

      const base = hovering ? 12 : 52;
      pos = (pos + (base + vel) * dt) % half;
      if (pos < 0) pos += half;
      track.style.transform = `translate3d(${-pos.toFixed(1)}px, 0, 0)`;

      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    const onVis = () => (document.hidden ? stop() : start());
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    measure();
    io.observe(root);
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', onVis);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    if (document.fonts?.ready) void document.fonts.ready.then(measure);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', onVis);
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section
      id="schools"
      ref={rootRef}
      aria-labelledby="schools-title"
      className={`section ${styles.schools}`}
    >
      <div className="container">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 id="schools-title" className={`display ${styles.title}`}>
            {dict.title}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className={`${styles.row}${copy === 1 ? ` ${styles.copy}` : ''}`}
              >
                {dict.items.map((item) => (
                  <span key={item} className={styles.item}>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="container">
        <Reveal delay={140}>
          <div className={styles.crests}>
            <p className={styles.crestCaption}>{dict.crests.captionUnis}</p>
            <div className={styles.crestViewport}>
              <div className={`${styles.crestTrack} ${styles.crestLeft}`}>
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    aria-hidden={copy === 1 ? true : undefined}
                    className={styles.crestRow}
                  >
                    {dict.crests.unis.map((c) => (
                      <span key={c.name} className={styles.crest}>
                        <i aria-hidden="true">{c.m}</i>
                        <span className={styles.crestText}>
                          <b>{c.name}</b>
                          <small>{c.town}</small>
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className={styles.crestCaption}>{dict.crests.captionSchools}</p>
            <div className={styles.crestViewport}>
              <div className={`${styles.crestTrack} ${styles.crestRight}`}>
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    aria-hidden={copy === 1 ? true : undefined}
                    className={styles.crestRow}
                  >
                    {dict.crests.schools.map((c) => (
                      <span key={c.name} className={styles.crest}>
                        <i aria-hidden="true">{c.m}</i>
                        <span className={styles.crestText}>
                          <b>{c.name}</b>
                          <small>{c.town}</small>
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container">
        <Reveal delay={120}>
          <div className={styles.foot}>
            <p className={styles.footnote}>{dict.footnote}</p>
            <p className={styles.tbc}>
              <span className={styles.tbcTag}>{dict.tbcTag}</span>
              {dict.tbc}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
