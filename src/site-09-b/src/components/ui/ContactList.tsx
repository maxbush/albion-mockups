import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Contact facts for parchment (tone-light) sections. Unknowns stay TBC. */
export default function ContactList({ lang }: { lang: Locale }) {
  const rows = getDictionary(lang).contact.rows;
  return (
    <dl className="mt-10 border-t border-ink-2/15">
      {rows.map((row) => (
        <div
          key={row.term}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink-2/15 py-4"
        >
          <dt className="text-[14px] text-ink-2/70">{row.term}</dt>
          <dd className="flex flex-wrap items-center gap-2 text-[15px]">
            {row.value && <span>{row.value}</span>}
            <Tbc lang={lang} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
