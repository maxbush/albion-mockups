import type { Dictionary } from '@/dictionaries/en';
import type { Locale } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import MagneticButton from './MagneticButton';
import styles from './Footer.module.css';

type FooterProps = {
  lang: Locale;
  dict: Dictionary['footer'];
  nav: Dictionary['header']['nav'];
  sitemap: Dictionary['sitemap'];
  sectionsLabel: string;
  langDict: Dictionary['lang'];
};

const withLang = (lang: Locale, href: string) =>
  href.startsWith('/#')
    ? `/${lang}${href.slice(1)}`
    : href.startsWith('/')
      ? `/${lang}${href}`
      : href;

/* Colophon footer: giant wordmark, tagline, then the full site taxonomy
   in columns — the SEO sitemap lives here while the top bar stays a route. */
export default function Footer({ lang, dict, nav, sitemap, sectionsLabel, langDict }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.wordmark} aria-label="ALBION">
          ALBION
        </p>

        <div className={styles.mid}>
          <p className={styles.tagline}>{dict.tagline}</p>

          <nav aria-label={sectionsLabel} className={styles.nav}>
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.begin}>
            <MagneticButton href="#contact" variant="primary">
              {dict.contactCta}
            </MagneticButton>
            <p className={styles.experience}>{dict.experience}</p>
          </div>
        </div>

        <div className={styles.sitemap}>
          {sitemap.columns.map((col) => (
            <div key={col.title} className={styles.sitemapCol}>
              <p className={styles.sitemapTitle}>{col.title}</p>
              {col.links.map((l) => (
                <a
                  key={l.href + l.label}
                  href={withLang(lang, l.href)}
                  className={styles.sitemapLink}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>{dict.rights}</p>
          <p>{dict.legal}</p>
          <div className={styles.bottomRight}>
            <LanguageSwitcher lang={lang} dict={langDict} />
            <a href="#top" className={styles.backTop}>
              {dict.backToTop}
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M12 20V5M5 11l7-7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
