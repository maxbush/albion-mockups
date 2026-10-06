import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import styles from './JournalTeaser.module.css';

export default function JournalTeaser({
  dict,
}: {
  dict: Dictionary['journal'];
}) {
  return (
    <section
      id="journal"
      aria-labelledby="journal-title"
      className={`section ${styles.journal}`}
      data-theme="vellum"
    >
      <div className="container">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 id="journal-title" className={`display ${styles.title}`}>
            {dict.title}
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className={styles.intro}>{dict.intro}</p>
        </Reveal>

        <Reveal delay={120}>
          <ol className={styles.list}>
            {dict.items.map((it, i) => (
              <li key={it.href}>
                <a href={it.href} className={styles.row}>
                  <span className={styles.n}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.rowTitle}>{it.title}</span>
                  <span className={styles.tag}>{it.tag}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.events}>
            <span className={styles.eventsLabel}>{dict.eventsLabel}</span>
            <span className={styles.eventsNote}>{dict.eventsNote}</span>
            <span className={styles.eventsTbc}>{dict.eventsTbc}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
