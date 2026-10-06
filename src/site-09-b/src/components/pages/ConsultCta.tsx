import Link from "next/link";
import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function ConsultCta({ lang, title }: { lang: Locale; title?: string }) {
  const t = getDictionary(lang).consultCta;
  return (
    <section className="tone-light py-[clamp(64px,9vw,120px)]" aria-labelledby="cta-title">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8" data-reveal>
          <p className="label">{t.label}</p>
          <h2
            id="cta-title"
            className="mt-6 font-display text-[clamp(2rem,1.2rem+2.8vw,3.8rem)] leading-[1.04] font-light tracking-[-0.01em]"
          >
            {title ?? t.title}
          </h2>
          <p className="mt-5 flex max-w-[56ch] flex-wrap items-center gap-2 text-[17px] leading-[1.7] text-ink-2/80">
            {t.lead} <Tbc lang={lang} />
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end" data-reveal>
          <Link href={`/${lang}/consultation`} className="btn btn-brass">
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
