import type { Dictionary } from '@/dictionaries/en';
import styles from './WhatsAppFloat.module.css';

export default function WhatsAppFloat({
  dict,
}: {
  dict: Dictionary['whatsapp'];
}) {
  return (
    <a
      className={styles.float}
      href={dict.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.label}
    >
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M9.3 8.6c.5 2.4 2.2 4.3 4.6 4.9l1.1-1.3c.3-.3.7-.4 1-.2l1.7 1c-1 2.4-4 2.5-6.7-.2-2.6-2.6-2.7-5.6-.4-6.8l1 1.7c.2.4.1.8-.2 1.1l-1.1.8Z" fill="currentColor" stroke="none" opacity="0.9" />
      </svg>
    </a>
  );
}
