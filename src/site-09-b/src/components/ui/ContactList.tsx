import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, type Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";

/** Contact facts for parchment (tone-light) sections. Real data comes from the live site; the unknown stays TBC. */
export default function ContactList({ lang }: { lang: Locale }) {
  const rows = getDictionary(lang).contact.rows;
  return (
    <dl className="mt-10 border-t border-ink-2/15">
      {rows.map((row) => (
        <div
          key={row.key}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink-2/15 py-4"
        >
          <dt className="text-[14px] text-ink-2/70">{row.term}</dt>
          <dd className="text-[15px]">
            {row.key === "email" && (
              <a href={`mailto:${CONTACT.email}`} className="link-hair link-hair-soft">
                {CONTACT.email}
              </a>
            )}
            {row.key === "phone" && (
              <a href={CONTACT.phoneHref} className="link-hair link-hair-soft">
                {CONTACT.phone}
              </a>
            )}
            {row.key === "office" && <span>{CONTACT.address}</span>}
            {row.key === "format" && <Tbc lang={lang} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
