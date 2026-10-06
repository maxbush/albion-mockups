import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Manifesto({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).manifesto;
  return (
    <section
      aria-labelledby="manifesto-title"
      className="relative bg-ink pt-[clamp(72px,10vw,140px)] pb-[clamp(88px,12vw,168px)]"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8" data-reveal>
          <p className="label">{t.label}</p>
          <h2
            id="manifesto-title"
            className="mt-8 max-w-[22ch] font-display text-[clamp(2rem,1.1rem+3.2vw,4.1rem)] leading-[1.08] font-light tracking-[-0.01em] text-cream"
          >
            {t.title} <em>{t.titleEm}</em>
          </h2>
        </div>

        <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:pt-28" data-reveal style={revealDelay(140)}>
          <p className="text-[17px] leading-[1.72] text-cream/80">{t.p1}</p>
          <p className="text-[17px] leading-[1.72] text-cream/80">{t.p2}</p>
          <p className="border-t border-cream/15 pt-6 text-[15px] leading-[1.65] text-cream/65">{t.p3}</p>
        </div>
      </div>
    </section>
  );
}
