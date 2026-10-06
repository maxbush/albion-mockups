import { getDictionary, type Locale } from "@/lib/i18n";
import { Tbc } from "@/components/ui/Tbc";

const UNIVERSITIES = [
  { m: "O", name: "Oxford", city: "Oxford" },
  { m: "C", name: "Cambridge", city: "Cambridge" },
  { m: "U", name: "UCL", city: "London" },
  { m: "I", name: "Imperial", city: "London" },
  { m: "L", name: "LSE", city: "London" },
  { m: "K", name: "King's College", city: "London" },
  { m: "D", name: "Durham", city: "Durham" },
  { m: "B", name: "Bristol", city: "Bristol" },
];

const SCHOOLS = [
  { m: "E", name: "Eton", city: "Windsor" },
  { m: "H", name: "Harrow", city: "London" },
  { m: "W", name: "Wycombe Abbey", city: "High Wycombe" },
  { m: "W", name: "Westminster", city: "London" },
  { m: "S", name: "St Paul's", city: "London" },
  { m: "S", name: "Sevenoaks", city: "Kent" },
  { m: "C", name: "Cheltenham Ladies'", city: "Cheltenham" },
  { m: "B", name: "Brighton College", city: "Brighton" },
];

function CrestStrip({ items, reverse = false, label }: { items: typeof UNIVERSITIES; reverse?: boolean; label: string }) {
  const doubled = [...items, ...items];
  return (
    <div>
      <p className="mb-5 text-[12px] font-semibold tracking-[0.2em] text-cream/60 uppercase">{label}</p>
      <div className="strip-mask overflow-hidden">
        <ul className={`strip-track ${reverse ? "strip-track-rev" : ""}`} aria-label={label}>
          {doubled.map((s, i) => (
            <li key={`${s.name}-${i}`} className="flex shrink-0 items-center gap-4 border border-cream/15 px-5 py-3.5">
              <span
                aria-hidden="true"
                className="grid h-10 w-8 place-items-center border border-brass/45 font-display text-[19px] leading-none text-brass/90"
                style={{ borderRadius: "0 0 12px 12px" }}
              >
                {s.m}
              </span>
              <span className="whitespace-nowrap">
                <span className="block font-display text-[20px] leading-tight text-cream/90 italic">{s.name}</span>
                <span className="block text-[10px] tracking-[0.24em] text-cream/50 uppercase">{s.city}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Where Albion families study today — the crest ledger from the brief. List is placeholder (TBC). */
export default function Offers({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).offers;
  return (
    <section aria-labelledby="offers-title" className="overflow-hidden bg-ink py-[clamp(72px,10vw,132px)]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal>
          <div className="lg:col-span-7">
            <p className="label">{t.label}</p>
            <h2
              id="offers-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em]"
            >
              {t.title} <em>{t.titleEm}</em>
            </h2>
          </div>
          <p className="flex max-w-[44ch] flex-wrap items-center gap-2 text-[16px] leading-[1.7] text-cream/70 lg:col-span-4 lg:col-start-9">
            {t.lead} <Tbc lang={lang} />
          </p>
        </div>
      </div>
      <div className="mt-12 space-y-6" data-reveal>
        <CrestStrip items={UNIVERSITIES} label={t.universities} />
        <CrestStrip items={SCHOOLS} label={t.schools} reverse />
      </div>
    </section>
  );
}
