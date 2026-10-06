import { getDictionary, type Locale } from "@/lib/i18n";

/** Lead magnet from the brief: a free guide in exchange for an email. */
export default function LeadMagnet({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).leadMagnet;
  return (
    <section aria-labelledby="guides-title" className="tone-light border-t border-ink-2/10 py-[clamp(80px,11vw,150px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-reveal>
          <figure className="mx-auto max-w-[340px] border border-ink-2/20 bg-[linear-gradient(160deg,#f7f3e8_0%,#efe9d6_100%)] px-8 py-10 shadow-[14px_14px_0_-4px_rgba(22,30,46,0.12)]">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-ink-2/55 uppercase">{t.cover.series}</p>
            <p className="mt-10 font-display text-[clamp(1.9rem,1.5rem+1.2vw,2.6rem)] leading-[1.05] font-light text-ink-2">
              {t.cover.title1} <em>{t.cover.titleEm}</em>
            </p>
            <p className="mt-8 flex items-center justify-between border-t border-ink-2/15 pt-5 text-[11px] tracking-[0.2em] text-ink-2/55 uppercase">
              <span>{t.cover.pdf}</span>
              <span>Albion</span>
            </p>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <p className="label">{t.label}</p>
          <h2
            id="guides-title"
            className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em]"
          >
            {t.title} <em>{t.titleEm}</em>
          </h2>
          <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.72] text-ink-2/80">{t.lead}</p>

          <ul aria-label={t.listAria} className="mt-10 border-t border-ink-2/15">
            {t.guides.map((guide) => (
              <li
                key={guide.n}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-ink-2/15 py-4"
              >
                <span aria-hidden="true" className="font-display text-[17px] text-ink-2/50">
                  {guide.n}
                </span>
                <span className="text-[16px] text-ink-2/85">{guide.title}</span>
                {guide.note && <span className="text-[13px] italic text-ink-2/55">{guide.note}</span>}
              </li>
            ))}
          </ul>

          <form className="mt-10 grid gap-5" aria-label={t.formAria}>
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="field">
                <label htmlFor="guide-email" className="field-label">
                  {t.emailLabel}
                </label>
                <input
                  id="guide-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="field-control"
                  placeholder={t.placeholder}
                />
              </div>
              <button type="submit" className="btn btn-brass">
                {t.submit}
              </button>
            </div>
            <p className="text-[13px] text-ink-2/65">{t.fine}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
