import { getDictionary, type Locale } from "@/lib/i18n";

/** One quiet line after the hero: Google rating + key figures. Values are placeholders pending verification. */
export default function TrustBar({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).trust;
  return (
    <section aria-label={t.aria} className="tone-light border-b border-ink-2/10">
      <div className="container-x flex flex-wrap items-center gap-x-10 gap-y-3 py-5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-[13px] tracking-[3px] text-brass">
            ★★★★★
          </span>
          <span className="text-[13px] text-ink-2/85">
            <b className="font-semibold text-ink-2">5.0</b> {t.onGoogle}
          </span>
        </div>
        <span aria-hidden="true" className="hidden h-7 w-px bg-ink-2/15 sm:block" />
        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-1">
          {t.stats.map((stat) => (
            <li key={stat.cap} className="text-[13px] tracking-[0.05em] text-ink-2/80">
              <b className="mr-2 font-display text-[19px] font-medium text-ink-2">{stat.n}</b>
              {stat.cap}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
