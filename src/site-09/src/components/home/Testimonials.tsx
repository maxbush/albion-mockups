import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Testimonials({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).testimonials;
  return (
    <section aria-labelledby="proof-title" className="tone-light py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6" data-reveal>
          <p className="label">{t.label}</p>
          <p className="mt-10 font-display text-[clamp(6rem,3rem+13vw,13rem)] leading-[0.8] font-light tracking-[-0.035em] text-brass">
            {t.num}
          </p>
          <h2
            id="proof-title"
            className="mt-8 max-w-[22ch] font-display text-[clamp(1.7rem,1.1rem+1.8vw,2.6rem)] leading-[1.15] font-light tracking-[-0.01em] text-ink-2"
          >
            {t.title} <em>{t.titleEm}</em>
          </h2>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
          <div className="grid gap-10 sm:gap-14">
            {t.quotes.map((q, i) => (
              <figure
                key={q.by}
                className="border border-ink-2/15 bg-parchment px-7 py-6 shadow-[0_18px_50px_-24px_rgba(15,21,34,0.35)] sm:w-[85%] sm:odd:justify-self-start sm:even:justify-self-end"
                data-reveal
                style={revealDelay(i * 120)}
              >
                <blockquote className="display-italic text-[clamp(1.25rem,0.9rem+1vw,1.6rem)] leading-[1.3] text-ink-2/85">
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[13px] font-medium tracking-[0.18em] text-ink-2/55 uppercase">
                  — {q.by}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-12 max-w-[46ch] text-[15px] leading-[1.7] text-ink-2/70" data-reveal>
            {t.note}
          </p>
        </div>
      </div>
    </section>
  );
}
