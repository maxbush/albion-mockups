import { getDictionary, type Locale } from "@/lib/i18n";

const NAMES = [
  "Eton",
  "Oxford",
  "Harrow",
  "Cambridge",
  "Wycombe Abbey",
  "UCL",
  "Westminster",
  "Imperial",
  "St Paul's",
  "LSE",
  "Sevenoaks",
  "Durham",
  "Cheltenham Ladies'",
  "Bristol",
  "Brighton College",
  "King's College",
];

/** Thin parchment marquee between Team and Testimonials — breaks the dark/light rhythm, repeats the crest ledger in words. */
export default function SchoolsStrip({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).schoolsStrip;
  const doubled = [...NAMES, ...NAMES];
  return (
    <div className="tone-light border-y border-ink-2/10 py-5" role="marquee" aria-label={t.aria}>
      <p className="sr-only">{t.aria}</p>
      <div className="strip-mask overflow-hidden" aria-hidden="true">
        <ul className="strip-track items-center gap-10 pr-10">
          {doubled.map((name, i) => (
            <li key={`${name}-${i}`} className="flex shrink-0 items-center gap-10 whitespace-nowrap">
              <span className="font-display text-[clamp(1.15rem,0.9rem+0.9vw,1.7rem)] font-light text-ink-2/75 italic">
                {name}
              </span>
              <span aria-hidden="true" className="text-[9px] text-brass">
                ◆
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
