import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Why ALBION rather than a large admissions agency — the four things competitors cannot copy. */
export default function Difference({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).difference;
  return (
    <section aria-labelledby="difference-title" className="tone-light py-[clamp(88px,12vw,168px)]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal>
          <div className="lg:col-span-7">
            <p className="label">{t.label}</p>
            <h2
              id="difference-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em]"
            >
              {t.title} {t.titleEm}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[16px] leading-[1.7] text-ink-2/70 lg:col-span-4 lg:col-start-9">{t.lead}</p>
        </div>

        <ol className="mt-14 border-t border-ink-2/15 md:grid md:grid-cols-2 md:gap-x-14">
          {t.items.map((item, i) => (
            <li
              key={item.word}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-ink-2/15 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
              data-reveal
              style={revealDelay(i * 70)}
            >
              <span aria-hidden="true" className="font-display text-[30px] leading-none font-light text-ink-2/55">
                {item.n}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] leading-[1.1] font-medium">
                  {item.word}
                </h3>
                <p className="mt-3 max-w-[56ch] text-[16px] leading-[1.72] text-ink-2/80">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
