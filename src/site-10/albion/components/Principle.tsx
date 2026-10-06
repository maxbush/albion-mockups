import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import styles from './Principle.module.css';

export default function Principle({ dict }: { dict: Dictionary['principle'] }) {
  return (
    <section
      id="principle"
      aria-labelledby="principle-quote"
      className={`section ${styles.principle}`}
    >
      <div className="container">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <blockquote style={{ margin: 0 }}>
            <p id="principle-quote" className={`display ${styles.quote}`}>
              {dict.quote}
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={180}>
          <div className={styles.attr}>
            <p className={styles.attrName}>{dict.attribution}</p>
            <p className={styles.note}>{dict.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
