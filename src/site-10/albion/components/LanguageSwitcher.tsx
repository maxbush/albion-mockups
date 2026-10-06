import Link from 'next/link';
import type { Dictionary } from '@/dictionaries/en';
import type { Locale } from '@/lib/i18n';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary['lang'];
}) {
  return (
    <nav aria-label={dict.label} className={styles.switch}>
      <Link
        href="/en"
        aria-current={lang === 'en' ? 'true' : undefined}
        className={`${styles.link}${lang === 'en' ? ` ${styles.current}` : ''}`}
      >
        {dict.en}
      </Link>
      <span aria-hidden="true" className={styles.sep} />
      <Link
        href="/ru"
        aria-current={lang === 'ru' ? 'true' : undefined}
        className={`${styles.link}${lang === 'ru' ? ` ${styles.current}` : ''}`}
      >
        {dict.ru}
      </Link>
    </nav>
  );
}
