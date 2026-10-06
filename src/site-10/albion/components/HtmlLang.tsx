'use client';

import { useEffect } from 'react';

/* The root <html> lives above the [lang] segment, so the per-route
   language is applied at runtime. Content itself is fully monolingual. */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
