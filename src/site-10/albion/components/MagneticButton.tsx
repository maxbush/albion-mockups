'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Button.module.css';

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost' | 'dark';
  size?: 'md' | 'sm';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
};

/* Magnetic hover: the button drifts a few px toward the cursor.
   Transform-only; the inner element keeps :active/:focus states intact.
   Disabled on touch pointers and with reduced motion. */
export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    enabledRef.current =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.matchMedia('(pointer: fine)').matches;
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el || !enabledRef.current || disabled) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const x = Math.max(-10, Math.min(10, dx * 0.18));
    const y = Math.max(-8, Math.min(8, dy * 0.22));
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const onLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = '';
  };

  const cls = `${styles.btn} ${styles[variant]} ${styles[size]}${className ? ` ${className}` : ''}`;

  return (
    <span
      ref={wrapRef}
      className={styles.mag}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {href !== undefined ? (
        <a href={href} className={cls}>
          {children}
        </a>
      ) : (
        <button type={type} disabled={disabled} className={cls}>
          {children}
        </button>
      )}
    </span>
  );
}
