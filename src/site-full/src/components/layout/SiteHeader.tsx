"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { getNav, path } from "@/lib/site";
import { pageByUrl } from "@/lib/content";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  const nav = getNav(lang);
  const t = getDictionary(lang).header;
  const homePath = path(lang, "home");
  const normalized = (pathname ?? homePath).replace(/\/+$/, "") || homePath.replace(/\/$/, "");
  const ctaHref = normalized === homePath.replace(/\/$/, "") ? "#consultation" : path(lang, "apply");
  const pairUrl = (l: Locale) => {
    const here = normalized + "/";
    const page = pageByUrl(here);
    if (page?.pair) return page.pair;
    return l === "ru" ? "/ru/" : "/";
  };

  const closeAll = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setOpenId(null);
    setMobileOpen(false);
  }, []);

  // Transparent over the hero, solid once the page content is underneath.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      setSolid(hero ? hero.getBoundingClientRect().bottom <= 80 : window.scrollY > 12);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Escape closes whatever is open and returns focus to its trigger.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      } else if (openId) {
        const trigger = document.getElementById(`nav-btn-${openId}`);
        setOpenId(null);
        trigger?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, mobileOpen]);

  // Click outside closes the desktop panel.
  useEffect(() => {
    if (!openId) return;
    const onDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenId(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openId]);

  // Mobile menu: lock page scroll and move focus inside.
  useEffect(() => {
    const html = document.documentElement;
    if (mobileOpen) {
      html.style.overflow = "hidden";
      const first = mobileRef.current?.querySelector<HTMLElement>("button, a");
      first?.focus();
    } else {
      html.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const openOnHover = (id: string) => {
    window.clearTimeout(hoverTimer.current);
    if (openId === null) {
      hoverTimer.current = window.setTimeout(() => setOpenId(id), 90);
    } else {
      setOpenId(id);
    }
  };

  const closeOnLeave = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenId(null), 220);
  };

  const onNavBlur = (event: FocusEvent<HTMLElement>) => {
    if (!navRef.current?.contains(event.relatedTarget as Node | null)) setOpenId(null);
  };

  const isSolid = solid || openId !== null || mobileOpen;

  return (
    <header className={styles.header} data-solid={isSolid ? "true" : "false"}>
      <div className={styles.bar}>
        <Link href={homePath} className={styles.brand} aria-label={t.brandAria} onClick={closeAll}>
          <span className={styles.brandWord}>ALBION</span>
          <span className={styles.brandSub}>Oxford</span>
        </Link>

        <nav
          ref={navRef}
          className={styles.nav}
          aria-label={t.navAria}
          onMouseLeave={closeOnLeave}
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
          onBlur={onNavBlur}
        >
          <ul className={styles.navList}>
            {nav.map((section) => {
              const open = openId === section.id;
              const single = section.groups.length === 1;
              return (
                <li key={section.id} onMouseEnter={() => openOnHover(section.id)}>
                  <button
                    id={`nav-btn-${section.id}`}
                    type="button"
                    className={styles.navButton}
                    aria-expanded={open}
                    aria-controls={`nav-panel-${section.id}`}
                    onClick={() => {
                      window.clearTimeout(hoverTimer.current);
                      setOpenId(open ? null : section.id);
                    }}
                  >
                    {section.label}
                    <span className={styles.chev} aria-hidden="true" />
                  </button>

                  <div id={`nav-panel-${section.id}`} className={styles.panel} data-open={open ? "true" : "false"}>
                    <div className={styles.panelInner}>
                      <div>
                        <p className={styles.panelTitle}>{section.label}</p>
                        <p className={styles.panelText}>{section.intro}</p>
                        <Link href={section.href} className="link-hair text-[14px]" onClick={closeAll}>
                          {t.openSection} {section.label}
                        </Link>
                      </div>
                      <div className={styles.groups}>
                        {section.groups.map((group) => (
                          <div key={group.title ?? section.id} className={single ? styles.groupWide : undefined}>
                            {group.title && <p className={styles.groupTitle}>{group.title}</p>}
                            <ul className={single ? styles.linksTwoCol : styles.links}>
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className={styles.link}
                                    onClick={closeAll}
                                  >
                                    <span>{item.label}</span>
                                    {item.note && <span className="badge">{item.note}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href={ctaHref} className={`btn btn-brass ${styles.cta}`} onClick={closeAll} aria-label={t.cta}>
          <span className={styles.ctaLong}>{t.cta}</span>
          <span className={styles.ctaShort}>{t.ctaShort}</span>
        </Link>

        <nav className={styles.lang} aria-label={t.langSwitch}>
          {locales.map((l) => (
            <Link
              key={l}
              href={pairUrl(l)}
              className={styles.langLink}
              data-active={l === lang ? "true" : "false"}
              aria-current={l === lang ? "true" : undefined}
              onClick={closeAll}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </nav>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span className="sr-only">{mobileOpen ? t.closeMenu : t.openMenu}</span>
          <span className={styles.burgerLines} aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={mobileRef}
        className={styles.mobile}
        data-open={mobileOpen ? "true" : "false"}
        inert={!mobileOpen}
      >
        <nav aria-label={t.mobileNavAria}>
          <ul className={styles.mList}>
            {nav.map((section) => {
              const expanded = mobileSection === section.id;
              return (
                <li key={section.id} className={styles.mItem}>
                  <button
                    type="button"
                    className={styles.mButton}
                    aria-expanded={expanded}
                    aria-controls={`m-panel-${section.id}`}
                    onClick={() => setMobileSection(expanded ? null : section.id)}
                  >
                    <span>{section.label}</span>
                    <span className={styles.mPlus} aria-hidden="true" />
                  </button>
                  <div id={`m-panel-${section.id}`} className={styles.mPanel} hidden={!expanded}>
                    <Link href={section.href} className={styles.mAll} onClick={closeAll}>
                      {t.openSection} {section.label}
                    </Link>
                    {section.groups.map((group) => (
                      <div key={group.title ?? section.id}>
                        {group.title && <p className={styles.mGroupTitle}>{group.title}</p>}
                        <ul>
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href} className={styles.mLink} onClick={closeAll}>
                                {item.label}
                                {item.note && <span className="badge ml-3">{item.note}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.mFooter}>
            <Link href={ctaHref} className="btn btn-brass w-full" onClick={closeAll}>
              {t.cta}
            </Link>
            <nav className={styles.langMobile} aria-label={t.langSwitch}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={pairUrl(l)}
                  className={styles.langLink}
                  data-active={l === lang ? "true" : "false"}
                  aria-current={l === lang ? "true" : undefined}
                  onClick={closeAll}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </nav>
          </div>
        </nav>
      </div>
    </header>
  );
}
