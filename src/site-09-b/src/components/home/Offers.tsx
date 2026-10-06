import { getDictionary, type Locale } from "@/lib/i18n";
import { Tbc } from "@/components/ui/Tbc";

type Entry = { name: string; city: string; /** Path to the real crest/logo once the client supplies it and consents. */ crest?: string };

const UNIVERSITIES: Entry[] = [
  { name: "Oxford", city: "Oxford" },
  { name: "Cambridge", city: "Cambridge" },
  { name: "UCL", city: "London" },
  { name: "Imperial", city: "London" },
  { name: "LSE", city: "London" },
  { name: "King's College", city: "London" },
  { name: "Durham", city: "Durham" },
  { name: "Bristol", city: "Bristol" },
];

const SCHOOLS: Entry[] = [
  { name: "Eton", city: "Windsor" },
  { name: "Harrow", city: "London" },
  { name: "Wycombe Abbey", city: "High Wycombe" },
  { name: "Westminster", city: "London" },
  { name: "St Paul's", city: "London" },
  { name: "Sevenoaks", city: "Kent" },
  { name: "Cheltenham Ladies'", city: "Cheltenham" },
  { name: "Brighton College", city: "Brighton" },
];

function CrestStrip({ items, reverse = false, label }: { items: Entry[]; reverse?: boolean; label: string }) {
  const doubled = [...items, ...items];
  return (
    <div>
      <p className="container-x mb-5 text-[12px] font-semibold tracking-[0.2em] text-ink-2/60 uppercase">{label}</p>
      <div className="strip-mask overflow-hidden">
        <ul className={`strip-track ${reverse ? "strip-track-rev" : ""}`} aria-label={label}>
          {doubled.map((s, i) => (
            <li key={`${s.name}-${i}`} className="flex shrink-0 items-center gap-4 border border-ink-2/15 bg-cream/60 px-6 py-4">
              {s.crest && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.crest} alt="" className="h-10 w-auto" />
              )}
              <span className="whitespace-nowrap">
                <span className="block font-display text-[21px] leading-tight text-ink-2 italic">{s.name}</span>
                <span className="block text-[12px] tracking-[0.16em] text-ink-2/60 uppercase">{s.city}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Where Albion families study today. The names are placeholders (TBC) until the client supplies the real list and crests. */
export default function Offers({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).offers;
  return (
    <section aria-labelledby="offers-title" className="bg-parchment py-[clamp(72px,10vw,132px)]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal>
          <div className="lg:col-span-7">
            <p className="label">{t.label}</p>
            <h2
              id="offers-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em] text-ink-2"
            >
              {t.title} <span className="border-b-2 border-brass/70 pb-1">{t.titleEm}</span>
            </h2>
          </div>
          <p className="flex max-w-[44ch] flex-wrap items-center gap-2 text-[16px] leading-[1.7] text-ink-2/70 lg:col-span-4 lg:col-start-9">
            {t.lead} <Tbc lang={lang} />
          </p>
        </div>
      </div>
      <div className="mt-[clamp(40px,5vw,64px)] space-y-8" data-reveal>
        <CrestStrip items={UNIVERSITIES} label={t.universities} />
        <CrestStrip items={SCHOOLS} label={t.schools} reverse />
      </div>
    </section>
  );
}
