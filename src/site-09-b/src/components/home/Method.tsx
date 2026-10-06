import Image from "next/image";
import Link from "next/link";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/site";

export default function Method({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).method;
  return (
    <section aria-labelledby="method-title" className="tone-light py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-8">
        <figure
          className="relative mx-auto w-full max-w-[520px] lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:col-span-5 lg:max-w-none"
          data-reveal
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 border border-brass/50 sm:translate-x-4 sm:translate-y-4"
          />
          <Image
            src="/images/method-cloister.jpg"
            alt={t.imgAlt}
            width={738}
            height={984}
            quality={70}
            sizes="(min-width: 1024px) 36vw, (min-width: 560px) 520px, 92vw"
            className="h-auto w-full mix-blend-multiply"
          />
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <p className="label">{t.label}</p>
            <h2
              id="method-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em]"
            >
              {t.title} {t.titleEm}
            </h2>
            <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.72] text-ink-2/80">{t.lead}</p>
          </div>

          <ol className="mt-12 border-t border-ink-2/15">
            {t.steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-ink-2/15 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
                data-reveal
                style={revealDelay(i * 70)}
              >
                <span aria-hidden="true" className="font-display text-[30px] leading-none font-light text-ink-2/55">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] leading-[1.1] font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[56ch] text-[16px] leading-[1.72] text-ink-2/80">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
            <a href="#consultation" className="btn btn-brass">
              {t.cta1}
            </a>
            <Link href={hrefFor(lang, "consulting", "academic-assessment")} className="link-hair link-hair-soft text-[15px]">
              {t.cta2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
