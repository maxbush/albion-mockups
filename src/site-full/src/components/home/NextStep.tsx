import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function NextStep({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).nextStep;
  return (
    <section aria-labelledby="nextstep-title" className="bg-ink-2 py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6" data-reveal>
          <p className="label">{t.label}</p>
          <h2
            id="nextstep-title"
            className="mt-10 font-display text-[clamp(2.6rem,1.4rem+4.4vw,5.4rem)] leading-[1.02] font-light tracking-[-0.015em]"
          >
            {t.title}
            <br />
            <em>{t.titleEm}</em>
          </h2>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.72] text-cream/80">{t.lead}</p>
          <p className="mt-10">
            <Link href={lang === "ru" ? "/ru/anketa/" : "/apply/"} className="link-hair link-hair-soft text-[15px]">
              {t.cta} <span aria-hidden="true">↗</span>
            </Link>
          </p>
        </div>

        <div className="relative hidden lg:col-span-6 lg:block" data-reveal aria-hidden="true">
          <svg
            viewBox="0 0 520 390"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full text-cream/40"
          >
            <path
              d="M-35 373C62 337 35 220 157 231C264 241 226 77 348 102C431 119 434 16 548-15"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-35 389C83 329 38 242 164 251C274 258 246 103 355 121C448 137 453 29 548 5"
              stroke="currentColor"
              strokeWidth="1"
              opacity=".35"
            />
            <circle cx="157" cy="231" r="6" fill="currentColor" />
            <circle cx="348" cy="102" r="26" stroke="currentColor" strokeWidth="1" />
            <circle cx="348" cy="102" r="3" fill="currentColor" />
          </svg>
          <p className="absolute right-0 bottom-0 text-[13px] italic tracking-[0.04em] text-cream/60">
            {t.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
