'use client';

import { useState } from 'react';
import type { Dictionary } from '@/dictionaries/en';
import MagneticButton from './MagneticButton';
import styles from './FinalCTA.module.css';

type Status = 'idle' | 'sending' | 'done';

export default function ConsultationForm({
  dict,
}: {
  dict: Dictionary['contact']['form'];
}) {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    /* Demonstration only: there is no receiving endpoint yet (see README).
       The timeout simulates a round-trip so states can be reviewed. */
    window.setTimeout(() => setStatus('done'), 900);
  };

  if (status === 'done') {
    return (
      <div role="status" className={styles.success}>
        <p className={`display ${styles.successTitle}`}>{dict.successTitle}</p>
        <p className={styles.successText}>{dict.successText}</p>
        <p className={styles.demoNote}>{dict.demoNote}</p>
      </div>
    );
  }

  const busy = status === 'sending';

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.duo}>
        <p className={styles.field}>
          <label htmlFor="cf-name">{dict.name}</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={dict.namePlaceholder}
            disabled={busy}
          />
        </p>
        <p className={styles.field}>
          <label htmlFor="cf-email">{dict.email}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={dict.emailPlaceholder}
            disabled={busy}
          />
        </p>
      </div>

      <p className={styles.field}>
        <label htmlFor="cf-stage">{dict.stage}</label>
        <select id="cf-stage" name="stage" defaultValue={dict.stageOptions[0]} disabled={busy}>
          {dict.stageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </p>

      <p className={styles.field}>
        <label htmlFor="cf-message">
          {dict.message} <span className={styles.optional}>· {dict.optional}</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          placeholder={dict.messagePlaceholder}
          disabled={busy}
        />
      </p>

      <div className={styles.submitRow}>
        <MagneticButton type="submit" disabled={busy} className={styles.submitBtn}>
          {busy ? dict.sending : dict.submit}
        </MagneticButton>
      </div>

      <p className={styles.demoNote}>{dict.demoNote}</p>
    </form>
  );
}
