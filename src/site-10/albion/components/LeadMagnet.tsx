'use client';

import { useState, type FormEvent } from 'react';
import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';
import styles from './LeadMagnet.module.css';

export default function LeadMagnet({
  dict,
}: {
  dict: Dictionary['leadmagnet'];
}) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="guides"
      aria-labelledby="guides-title"
      className={`section ${styles.leadmagnet}`}
    >
      <div className={`container ${styles.grid}`}>
        <Reveal>
          <figure className={styles.cover} aria-hidden="true">
            <span className={styles.coverKicker}>{dict.coverKicker}</span>
            <span className={styles.coverRule} />
            <span className={styles.coverTitle}>
              {dict.coverTitleA}{' '}
              <em>{dict.coverTitleB}</em>
            </span>
            <span className={styles.coverFoot}>
              <span>{dict.coverFoot}</span>
              <span className={styles.coverMark}>Albion</span>
            </span>
          </figure>
        </Reveal>

        <div className={styles.copy}>
          <Reveal>
            <p className="eyebrow">{dict.eyebrow}</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="guides-title" className={`display ${styles.title}`}>
              {dict.titleA}{' '}
              <em>{dict.titleB}</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className={styles.text}>{dict.text}</p>
          </Reveal>
          <Reveal delay={190}>
            <ul className={styles.list}>
              {dict.list.map((g) => (
                <li key={g.n}>
                  <span className={styles.n}>{g.n}</span>
                  <span className={styles.gTitle}>{g.title}</span>
                  {g.tag ? <span className={styles.tag}>{g.tag}</span> : null}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            {sent ? (
              <p className={styles.done}>{dict.success}</p>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <label className="vh" htmlFor="guides-email">
                  {dict.emailLabel}
                </label>
                <input
                  id="guides-email"
                  type="email"
                  required
                  placeholder={dict.emailPlaceholder}
                  className={styles.input}
                />
                <MagneticButton variant="primary" type="submit">
                  {dict.submit}
                </MagneticButton>
              </form>
            )}
            <p className={styles.note}>{dict.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
