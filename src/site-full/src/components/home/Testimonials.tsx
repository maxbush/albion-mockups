import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { REVIEW_LINKS } from "@/lib/site";

/**
 * Reviews block in the style the client picked from the green mockup: parchment cards, slightly
 * off-axis, alternating left/right, italic serif quotes. Texts are excerpts of real Google reviews;
 * later this array is fed by the Google reviews source and the layout stays as is.
 */
const TILT = ["sm:-rotate-[0.8deg]", "sm:rotate-[1.1deg]", "sm:-rotate-[1.2deg]", "sm:rotate-[0.7deg]"];

export default function Testimonials({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).testimonials;
  return (
    <section aria-labelledby="proof-title" className="tone-light py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]" data-reveal>
            <p className="label">{t.label}</p>
            <h2
              id="proof-title"
              className="mt-8 font-display text-[clamp(2.4rem,1.2rem+3.8vw,4.8rem)] leading-[1.02] font-light tracking-[-0.01em] text-ink-2"
            >
              {t.title} <em>{t.titleEm}</em>
            </h2>

            <div className="mt-10 flex items-end gap-5">
              <span className="font-display text-[clamp(5rem,3rem+8vw,9rem)] leading-[0.8] font-light tracking-[-0.03em] text-brass">
                {t.score}
              </span>
              <span className="pb-1">
                <span aria-hidden="true" className="block text-[17px] tracking-[5px] text-brass">
                  ★★★★★
                </span>
                <span className="mt-2 block max-w-[22ch] text-[13px] leading-snug font-medium tracking-[0.16em] text-ink-2/80 uppercase">
                  {t.scoreCap}
                </span>
              </span>
            </div>

            <p className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
              <a href={REVIEW_LINKS.google} className="link-hair link-hair-soft" target="_blank" rel="noopener noreferrer">
                {t.linkGoogle}
              </a>
              <a
                href={REVIEW_LINKS.trustpilot}
                className="link-hair link-hair-soft"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.linkTrustpilot}
              </a>
            </p>
            <p className="mt-6 max-w-[36ch] text-[14px] leading-[1.6] text-ink-2/65">{t.note}</p>
          </div>
        </div>

        <ul className="grid gap-9 sm:gap-12 lg:col-span-6 lg:col-start-7" aria-label={t.title}>
          {t.reviews.map((review, i) => (
            <li
              key={review.by}
              className={`relative border border-ink-2/12 bg-[#f1ede1] px-8 pt-10 pb-7 shadow-[0_2px_0_rgba(22,30,46,0.04),0_26px_56px_-30px_rgba(15,21,34,0.45)] sm:w-[88%] sm:odd:justify-self-start sm:even:justify-self-end ${TILT[i % TILT.length]}`}
              data-reveal
              style={revealDelay(i * 120)}
            >
              <span
                aria-hidden="true"
                className="absolute top-3 left-6 font-display text-[64px] leading-none font-light text-brass/80 select-none"
              >
                &ldquo;
              </span>
              <blockquote
                className={`display-italic leading-[1.3] text-ink-2/90 ${
                  i === 0 ? "text-[clamp(1.45rem,1.1rem+1.1vw,2rem)]" : "text-[clamp(1.2rem,1rem+0.7vw,1.55rem)]"
                }`}
              >
                {review.text}
              </blockquote>
              <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink-2/12 pt-4">
                <span className="text-[13px] font-semibold tracking-[0.18em] text-ink-2/80 uppercase">{review.by}</span>
                <span className="flex items-center gap-2 text-[12px] tracking-[0.14em] text-ink-2/55 uppercase">
                  <span aria-hidden="true" className="tracking-[3px] text-brass">
                    ★★★★★
                  </span>
                  {review.source}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
