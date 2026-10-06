import Link from "next/link";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getNav, hrefFor, sectionItems, type SectionId } from "@/lib/site";

const IDS: SectionId[] = ["admissions", "learning", "services"];

export default function Directory({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).directory;
  const sections = getNav(lang).filter((section) => IDS.includes(section.id));

  return (
    <section aria-labelledby="index-title" className="bg-ink py-[clamp(88px,12vw,160px)]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal>
          <div className="lg:col-span-7">
            <p className="label">{t.label}</p>
            <h2
              id="index-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em]"
            >
              {t.title} <em>{t.titleEm}</em>
            </h2>
          </div>
          <p className="max-w-[44ch] text-[16px] leading-[1.7] text-cream/70 lg:col-span-4 lg:col-start-9">{t.lead}</p>
        </div>

        <div className="mt-14 grid gap-14 border-t border-cream/15 pt-12 md:grid-cols-3 md:gap-8">
          {sections.map((section, i) => (
            <div key={section.id} data-reveal style={revealDelay(i * 90)}>
              <h3 className="font-display text-[clamp(1.9rem,1.4rem+1vw,2.5rem)] leading-none font-light">
                <Link href={hrefFor(lang, section.id)} className="link-hair link-hair-soft">
                  {section.label}
                </Link>
              </h3>
              <ul className="mt-7">
                {sectionItems(section).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={hrefFor(lang, section.id, item.slug)}
                      className="group flex items-baseline justify-between gap-4 border-b border-cream/10 py-3.5 text-[15px] leading-snug text-cream/85 hover:text-cream"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="-translate-x-1 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
