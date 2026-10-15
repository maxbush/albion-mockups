import { getDictionary, type Locale } from "@/lib/i18n";
import { Tbc } from "@/components/ui/Tbc";

type Entry = {
  name: string;
  city: string;
  /** File in /public/images/crests. Free-licence arms from Wikimedia Commons, see CREDITS.md next to the files. */
  crest: string;
};

/**
 * Placeholders until the client sends the real list of schools and universities
 * and confirms that their arms may be shown. The block says so ("TBC").
 */
const UNIVERSITIES: Entry[] = [
  { name: "Oxford", city: "Oxford", crest: "oxford.png" },
  { name: "Cambridge", city: "Cambridge", crest: "cambridge.png" },
  { name: "UCL", city: "London", crest: "ucl.png" },
  { name: "Imperial", city: "London", crest: "imperial.png" },
  { name: "LSE", city: "London", crest: "lse.png" },
  { name: "King's College", city: "London", crest: "kings.png" },
  { name: "Durham", city: "Durham", crest: "durham.png" },
  { name: "Bristol", city: "Bristol", crest: "bristol.png" },
];

const SCHOOLS: Entry[] = [
  { name: "Eton", city: "Windsor", crest: "eton.jpg" },
  { name: "Winchester", city: "Winchester", crest: "winchester.png" },
  { name: "Westminster", city: "London", crest: "westminster.png" },
  { name: "St Paul's", city: "London", crest: "stpauls.png" },
  { name: "Charterhouse", city: "Godalming", crest: "charterhouse.png" },
  { name: "Rugby", city: "Rugby", crest: "rugby.png" },
  { name: "Marlborough", city: "Marlborough", crest: "marlborough.png" },
  { name: "Roedean", city: "Brighton", crest: "roedean.png" },
];

/**
 * Six copies of the list per strip: each half of the track (three copies) is wider than any screen,
 * so the loop has no empty gap on large monitors. Spacing is a margin on every card (not a flex gap),
 * so the track is exactly twice one half and the -50% shift lands on the identical picture.
 */
const COPIES = 6;

function CrestStrip({ items, reverse = false, label }: { items: Entry[]; reverse?: boolean; label: string }) {
  const track = Array.from({ length: COPIES }, (_, copy) => items.map((s) => ({ ...s, copy }))).flat();
  return (
    <div>
      <p className="container-x mb-5 text-[12px] font-semibold tracking-[0.2em] text-ink-2/60 uppercase">{label}</p>
      <div className="strip-mask overflow-hidden">
        <ul className={`strip-track ${reverse ? "strip-track-rev" : ""}`} aria-label={label}>
          {track.map((s) => (
            <li
              key={`${s.name}-${s.copy}`}
              aria-hidden={s.copy > 0 ? true : undefined}
              className="strip-item flex shrink-0 items-center gap-4 border border-ink-2/15 bg-[#f1ede1] px-6 py-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/crests/${s.crest}`}
                alt=""
                width={48}
                height={56}
                className="h-14 w-auto max-w-[56px] object-contain mix-blend-multiply"
              />
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

/** Where ALBION families study today: two running strips of crests. The names are placeholders (TBC). */
export default function Offers({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).offers;
  return (
    <section aria-labelledby="offers-title" className="tone-light py-[clamp(72px,10vw,132px)]">
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
