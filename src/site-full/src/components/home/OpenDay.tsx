import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { path } from "@/lib/site";
import OpenDayDetails from "./OpenDayDetails";

export default function OpenDay({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).openDay;
  return (
    <section id="open-day" aria-labelledby="openday-title" className="relative bg-ink py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <figure className="relative mx-auto w-full max-w-[480px] lg:col-span-5 lg:max-w-none" data-reveal>
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 border border-brass/45 sm:translate-x-5 sm:translate-y-5"
          />
          <Image
            src="/images/open-door.jpg"
            alt={t.imgAlt}
            width={1200}
            height={1600}
            quality={70}
            sizes="(min-width: 1024px) 38vw, (min-width: 560px) 480px, 92vw"
            className="relative h-auto w-full"
          />
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <p className="label">{t.label}</p>
            <h2
              id="openday-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em]"
            >
              {t.title} <em>{t.titleEm}</em>
            </h2>
            <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.72] text-cream/80">{t.lead}</p>
          </div>

          <div className="mt-10" data-reveal>
            <OpenDayDetails lang={lang} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
            <Link href={`${path(lang, "openDay")}#register`} className="btn btn-brass normal-case">
              {t.cta}
            </Link>
            <Link href={path(lang, "events")} className="link-hair link-hair-soft text-[15px]">
              {t.webinars}
            </Link>
          </div>

          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-cream/65" data-reveal>
            <span>{t.resources}</span>
            <Link href={path(lang, "guides")} className="link-hair link-hair-soft text-cream/85">
              {t.guides}
            </Link>
            <Link href={path(lang, "prices")} className="link-hair link-hair-soft text-cream/85">
              {t.pricing}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
