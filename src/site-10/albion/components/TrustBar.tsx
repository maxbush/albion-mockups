import type { Dictionary } from '@/dictionaries/en';
import styles from './TrustBar.module.css';

export default function TrustBar({ dict }: { dict: Dictionary['trust'] }) {
  return (
    <section aria-label="Trust and results" className={styles.trust}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.google}>
          <span className={styles.stars} aria-hidden="true">
            ★★★★★
          </span>
          <b>5.0</b> {dict.google}
        </p>
        <ul className={styles.items}>
          {dict.items.map((i) => (
            <li key={i.label}>
              <b>{i.value}</b> {i.label}
            </li>
          ))}
        </ul>
        <p className={styles.note}>{dict.note}</p>
      </div>
    </section>
  );
}
