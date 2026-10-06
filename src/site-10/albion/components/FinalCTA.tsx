import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import ConsultationForm from './ConsultationForm';
import styles from './FinalCTA.module.css';

export default function FinalCTA({ dict }: { dict: Dictionary['contact'] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={`section ${styles.contact}`}
    >
      <div className={`container ${styles.split}`}>
        <div>
          <Reveal>
            <p className="eyebrow">{dict.eyebrow}</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="contact-title" className={`display ${styles.title}`}>
              {dict.title}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className={styles.text}>{dict.text}</p>
          </Reveal>
          <Reveal delay={210}>
            <ul className={styles.bullets}>
              {dict.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className={styles.card}>
            <ConsultationForm dict={dict.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
