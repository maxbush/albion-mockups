import Image from "next/image";
import Link from "next/link";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { path } from "@/lib/site";

/** Resources block: three guides that live on the site as articles (there are no PDF files). */
export default function Resources({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).resources;
  return (
    <section aria-labelledby="guides-title" className="tone-light border-t border-ink-2/10 py-[clamp(80px,11vw,150px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <figure className="mx-auto w-full max-w-[420px] self-start lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:col-span-5 lg:max-w-none" data-reveal>
          <Image
            src="/images/route-school.webp"
            alt={t.imgAlt}
            width={1200}
            height={900}
            quality={70}
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="h-auto w-full mix-blend-multiply"
          />
        </figure>

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
            {t.cards.map((card, i) => (
              <li key={card.key} className="border-b border-ink-2/15" data-reveal style={revealDelay(i * 70)}>
                <Link
                  href={path(lang, card.key)}
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-6"
                >
                  <span aria-hidden="true" className="font-display text-[17px] text-ink-2/50">
                    {card.n}
                  </span>
                  <span>
                    <span className="block font-display text-[clamp(1.4rem,1.1rem+0.8vw,1.8rem)] leading-[1.15] font-medium">
                      {card.title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-[15px] leading-[1.6] text-ink-2/75">{card.text}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[20px] transition-[translate] duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-9">
            <Link href={path(lang, "resources")} className="link-hair link-hair-soft text-[15px]">
              {t.hub}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
