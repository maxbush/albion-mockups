'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Dictionary } from '@/dictionaries/en';
import type { Locale } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import MagneticButton from './MagneticButton';
import styles from './Header.module.css';

type HeaderProps = {
  lang: Locale;
  dict: Dictionary['header'];
  langDict: Dictionary['lang'];
  sitemap: Dictionary['sitemap'];
};

const withLang = (lang: Locale, href: string) =>
  href.startsWith('/#')
    ? `/${lang}${href.slice(1)}`
    : href.startsWith('/')
      ? `/${lang}${href}`
      : href;

export function ArchMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 29 V14 C4 7.5 7.5 3.5 12 3.5 C16.5 3.5 20 7.5 20 14 V29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M2 29 H22" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Header({ lang, dict, langDict, sitemap }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* solid backdrop after scrolling past the hero top — rAF-throttled */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close the mobile panel on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open ]);

  return (
    <header
      id="top"
      className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link
          href={`/${lang}`}
          className={styles.brand}
          aria-label={`ALBION — ${dict.brandNote}`}
        >
          <ArchMark className={styles.mark} />
          <span className={styles.brandText}>
            ALBION
            <small>{dict.brandNote}</small>
          </span>
        </Link>

        <nav aria-label={dict.sectionsLabel} className={styles.nav}>
          {dict.nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher lang={lang} dict={langDict} />
          <span className={styles.cta}>
            <MagneticButton href="#contact" variant="primary" size="sm">
              {dict.cta}
            </MagneticButton>
          </span>
          <button
            type="button"
            className={`${styles.burger}${open ? ` ${styles.burgerOpen}` : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.menuClose : dict.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.panel}${open ? ` ${styles.panelOpen}` : ''}`}
      >
        <nav aria-label={dict.sectionsLabel} className={styles.panelNav}>
          {dict.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.panelLink}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
              tabIndex={open ? undefined : -1}
            >
              <span aria-hidden="true" className={styles.panelIndex}>
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
          <div className={styles.panelSitemap}>
            {sitemap.columns.map((col) => (
              <div key={col.title} className={styles.panelCol}>
                <p className={styles.panelColTitle}>{col.title}</p>
                {col.links.map((l) => (
                  <a
                    key={l.href + l.label}
                    href={withLang(lang, l.href)}
                    className={styles.panelColLink}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? undefined : -1}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <span
            className={styles.panelCta}
            onClick={() => setOpen(false)}
          >
            <MagneticButton
              href="#contact"
              variant="primary"
              className={styles.panelCtaBtn}
            >
              {dict.cta}
            </MagneticButton>
          </span>
        </nav>
      </div>
    </header>
  );
}
