import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';
import styles from './Advantages.module.css';

export default function Advantages({ dict }: { dict: Dictionary['why'] }) {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className={`section ${styles.why}`}
    >
      <div className={`container ${styles.split}`}>
        <div className={styles.stickyHead}>
          <Reveal>
            <p className="eyebrow">{dict.eyebrow}</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="why-title" className={`display ${styles.title}`}>
              {dict.title}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.headCta}>
              <MagneticButton href="#contact" variant="primary">
                {dict.cta}
              </MagneticButton>
            </p>
          </Reveal>
        </div>

        <ol className={styles.list}>
          {dict.items.map((item, i) => (
            <li key={item.title} className={styles.item}>
              <Reveal delay={Math.min(i * 60, 300)}>
                <div className={styles.itemGrid}>
                  <span aria-hidden="true" className={styles.num}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className={`display ${styles.itemTitle}`}>
                      {item.title}
                    </h3>
                    <p className={styles.itemText}>{item.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
