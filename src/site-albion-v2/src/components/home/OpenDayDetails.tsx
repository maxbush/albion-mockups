import { getDictionary, type Locale } from "@/lib/i18n";

/** What the open-day service includes — taken from the client's own description of the service. */
export default function OpenDayDetails({ lang }: { lang: Locale }) {
  const rows = getDictionary(lang).openDay.details;
  return (
    <ul className="grid border-t border-cream/15 sm:grid-cols-2">
      {rows.map((line) => (
        <li
          key={line}
          className="flex items-start gap-4 border-b border-cream/15 py-5 text-[16px] leading-[1.5] text-cream/85 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
        >
          <span aria-hidden="true" className="mt-[0.55em] h-px w-5 shrink-0 bg-brass" />
          {line}
        </li>
      ))}
    </ul>
  );
}
