import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultCta from "@/components/pages/ConsultCta";
import PageBand from "@/components/pages/PageBand";
import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { findSection, getNav, hrefFor } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getNav(lang).map((section) => ({ lang, section: section.id })));
}

type Props = { params: Promise<{ lang: string; section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, section: id } = await params;
  if (!isLocale(raw)) return {};
  const section = findSection(raw, id);
  return section ? { title: section.label, description: section.intro } : {};
}

export default async function SectionPage({ params }: Props) {
  const { lang: raw, section: id } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw;
  const section = findSection(lang, id);
  if (!section) notFound();
  const t = getDictionary(lang).sectionPage;

  return (
    <>
      <PageBand
        crumbs={[{ label: t.homeCrumb, href: `/${lang}` }, { label: section.label }]}
        eyebrow={t.eyebrow}
        title={section.label}
        lead={section.intro}
      />

      <section className="bg-ink pb-[clamp(72px,10vw,140px)]">
        <div className="container-x">
          {section.groups.map((group) => (
            <div key={group.title ?? section.id} className="pt-[clamp(40px,6vw,72px)]">
              {group.title && <h2 className="label">{group.title}</h2>}
              <ul className={`${group.title ? "mt-8" : ""} border-t border-cream/15`}>
                {group.items.map((item) => (
                  <li key={item.slug} className="border-b border-cream/15" data-reveal>
                    <Link
                      href={hrefFor(lang, section.id, item.slug)}
                      className="group grid items-baseline gap-3 py-8 md:grid-cols-12 md:gap-8"
                    >
                      <span className="flex flex-wrap items-center gap-3 font-display text-[clamp(1.7rem,1.2rem+1.4vw,2.6rem)] leading-[1.08] font-light md:col-span-5">
                        {item.label}
                        {item.note && <span className="badge">{item.note}</span>}
                      </span>
                      <span className="text-[16px] leading-[1.65] text-cream/70 md:col-span-6">{item.description}</span>
                      <span
                        aria-hidden="true"
                        className="hidden justify-self-end text-[22px] transition-[translate] duration-300 group-hover:translate-x-1 md:col-span-1 md:block"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {section.id === "blog" && (
            <p className="mt-12 flex flex-wrap items-center gap-3 text-[15px] text-cream/70">
              {t.journalNote} <Tbc lang={lang} hint={t.journalHint} />
            </p>
          )}
        </div>
      </section>

      <ConsultCta lang={lang} />
    </>
  );
}
