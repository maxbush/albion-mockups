import Image from 'next/image';
import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import styles from './IndexDirections.module.css';

export default function IndexDirections({ dict }: { dict: Dictionary['index'] }) {
  return (
    <section
      id="index"
      data-theme="vellum"
      aria-labelledby="index-title"
      className={`section ${styles.index}`}
    >
      <div className={styles.wash} aria-hidden="true">
        <Image
          src="/images/hero-court.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
        />
      </div>

      <div className={`container ${styles.head}`}>
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 id="index-title" className={`display ${styles.title}`}>
            {dict.title}
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className={styles.intro}>{dict.intro}</p>
        </Reveal>
      </div>

      <div className="container">
        <ul className={styles.list}>
          {dict.rows.map((row, i) => (
            <li key={row.title}>
              <Reveal delay={Math.min(i * 55, 330)}>
                <a
                  href="#contact"
                  className={styles.row}
                  aria-label={`${dict.askAbout} — ${row.title}`}
                >
                  <span aria-hidden="true" className={styles.num}>
                    0{i + 1}
                  </span>
                  <span>
                    <span className={styles.rowTitle}>{row.title}</span>
                    <span className={styles.rowText}>{row.text}</span>
                  </span>
                  <span aria-hidden="true" className={styles.arrow}>
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M4 12h15M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
