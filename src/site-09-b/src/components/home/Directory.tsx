import Link from "next/link";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getNav, hrefFor, type NavSection, type SectionId } from "@/lib/site";

/** Columns of the catalogue; the last column stacks two short sections so the three stay balanced. */
const COLUMNS: SectionId[][] = [["consulting"], ["learning"], ["adults", "camps"]];

export default function Directory({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).directory;
  const nav = getNav(lang);
  const columns = COLUMNS.map((ids) =>
    ids.map((id) => nav.find((section) => section.id === id)).filter((s): s is NavSection => Boolean(s)),
  );

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
              {t.title} {t.titleEm}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[16px] leading-[1.7] text-cream/70 lg:col-span-4 lg:col-start-9">{t.lead}</p>
        </div>

        <div className="mt-14 grid gap-14 border-t border-cream/15 pt-12 md:grid-cols-3 md:gap-8">
          {columns.map((sections, i) => (
            <div key={sections.map((s) => s.id).join("-")} className="space-y-14" data-reveal style={revealDelay(i * 90)}>
              {sections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-display text-[clamp(1.9rem,1.4rem+1vw,2.5rem)] leading-none font-light">
                    <Link href={hrefFor(lang, section.id)} className="link-hair link-hair-soft">
                      {section.label}
                    </Link>
                  </h3>
                  {section.groups.map((group) => (
                    <div key={group.title ?? section.id} className="mt-7">
                      {group.title && (
                        <p className="text-[11px] font-semibold tracking-[0.2em] text-cream/55 uppercase">{group.title}</p>
                      )}
                      <ul className={group.title ? "mt-2" : undefined}>
                        {group.items.map((item) => (
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
