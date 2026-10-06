import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Open Day facts — all unknown for now, shown as visible TBC placeholders. */
export default function OpenDayDetails({ lang }: { lang: Locale }) {
  const rows = getDictionary(lang).openDay.details;
  return (
    <dl className="grid border-t border-cream/15 sm:grid-cols-2">
      {rows.map((term) => (
        <div
          key={term}
          className="flex items-center justify-between gap-4 border-b border-cream/15 py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
        >
          <dt className="text-[12px] font-semibold tracking-[0.16em] text-cream/65 uppercase">{term}</dt>
          <dd>
            <Tbc lang={lang} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
