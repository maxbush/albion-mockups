import { getDictionary, type Locale } from "@/lib/i18n";

/** Visible placeholder for unknown facts. Never replace with invented data. */
export function Tbc({ lang, hint }: { lang: Locale; hint?: string }) {
  const text = hint ?? getDictionary(lang).tbc.hint;
  return (
    <span className="tbc" title={text}>
      TBC<span className="sr-only"> — {text}</span>
    </span>
  );
}
