import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PageBand from "@/components/pages/PageBand";
import { Tbc } from "@/components/ui/Tbc";
import { revealDelay } from "@/lib/css";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import {
  findItem,
  findSection,
  findStage,
  getNav,
  hrefFor,
  sectionItems,
  type NavItem,
  type NavSection,
} from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getNav(lang).flatMap((section) =>
      sectionItems(section).map((item) => ({ lang, section: section.id, slug: item.slug })),
    ),
  );
}

type Props = { params: Promise<{ lang: string; section: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, section: sectionId, slug } = await params;
  if (!isLocale(raw)) return {};
  const section = findSection(raw, sectionId);
  const item = section ? findItem(section, slug) : undefined;
  return item ? { title: item.label, description: item.description } : {};
}

function OpenDayPage({ lang, section, item }: { lang: Locale; section: NavSection; item: NavItem }) {
  const dict = getDictionary(lang);
  const t = dict.slugPage;
  const o = t.openDay;
  return (
    <>
      <PageBand
        crumbs={[
          { label: t.homeCrumb, href: `/${lang}` },
          { label: section.label, href: hrefFor(lang, section.id) },
          { label: item.label },
        ]}
        eyebrow={o.eyebrow}
        title={
          <>
            {o.title1} <em>{o.titleEm}</em>
          </>
        }
        lead={item.description}
      />

      <section className="bg-ink pt-[clamp(56px,8vw,104px)] pb-[clamp(72px,10vw,140px)]">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-[460px] lg:max-w-none" data-reveal>
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 border border-brass/45 sm:translate-x-5 sm:translate-y-5"
              />
              <Image
                src="/images/open-door.jpg"
                alt={dict.openDay.imgAlt}
                width={1200}
                height={1600}
                quality={70}
                sizes="(min-width: 1024px) 36vw, (min-width: 560px) 460px, 92vw"
                className="relative h-auto w-full"
              />
            </figure>

            <div className="mt-14" data-reveal>
              <p className="label">{o.coversLabel}</p>
              <ul className="mt-6 space-y-4 text-[16px] leading-[1.65] text-cream/80">
                {o.covers.map((line: string, i: number) => (
                  <li key={line} className={i < o.covers.length - 1 ? "border-b border-cream/10 pb-4" : undefined}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="register" className="tone-light p-[clamp(20px,4vw,48px)] lg:col-span-6 lg:col-start-7 lg:self-start">
            <p className="label">{o.regLabel}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,1.3rem+2vw,3.2rem)] leading-[1.05] font-light">
              {o.regTitle}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.7] text-ink-2/80">{o.regLead}</p>
            <div className="mt-8">
              <EnquiryForm lang={lang} kind="open_day" submitLabel={o.submit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const tutorRoster = [
  { name: "Adrian Fort", src: "/images/tutors/tutor-adrian-fort.jpg" },
  { name: "Tom Yates", src: "/images/tutors/tutor-tom-yates.jpg" },
  { name: "Stacey Johnson", src: "/images/tutors/tutor-stacey-johnson.jpg" },
  { name: "Mollie-May Campbell", src: "/images/tutors/tutor-mollie-may-campbell.jpg" },
];

function TutorsPage({ lang, section, item }: { lang: Locale; section: NavSection; item: NavItem }) {
  const dict = getDictionary(lang);
  const t = dict.slugPage;
  const tu = t.tutors;
  const role = dict.team.tutorRole;
  return (
    <>
      <PageBand
        crumbs={[
          { label: t.homeCrumb, href: `/${lang}` },
          { label: section.label, href: hrefFor(lang, section.id) },
          { label: item.label },
        ]}
        eyebrow={section.label}
        title={item.label}
        lead={item.description}
      />

      <section className="bg-ink pt-[clamp(56px,8vw,104px)] pb-[clamp(72px,10vw,140px)]">
        <div className="container-x">
          <p className="label" data-reveal>
            {tu.rosterLabel}
          </p>
          <ul
            className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            aria-label={tu.rosterAria}
          >
            {tutorRoster.map((person, i) => (
              <li key={person.name} data-reveal style={revealDelay(i * 70)}>
                <div className="relative aspect-square overflow-hidden border border-cream/12 bg-[#f3efe3] shadow-[0_22px_50px_-28px_rgba(0,0,0,0.75)]">
                  <Image
                    src={person.src}
                    alt={`${person.name} — ${role}`}
                    fill
                    sizes="(min-width: 1024px) 21vw, (min-width: 640px) 44vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-4 text-[15px] font-medium text-cream/90">{person.name}</p>
                <p className="mt-1 flex items-baseline gap-2 text-[13px] text-cream/65">
                  {role} · {tu.subjectLabel} <Tbc lang={lang} />
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-[62ch] text-[15px] leading-[1.7] text-cream/70" data-reveal>
            {tu.note} <Tbc lang={lang} />
          </p>

          <div className="tone-light mt-14 grid gap-8 p-[clamp(22px,3vw,40px)] md:grid-cols-12 md:items-center" data-reveal>
            <div className="md:col-span-8">
              <p className="font-display text-[clamp(1.8rem,1.3rem+1.2vw,2.4rem)] leading-[1.1] font-light">
                {tu.boxTitle}
              </p>
              <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7] text-ink-2/80">
                {tu.boxLead} <Tbc lang={lang} />
              </p>
            </div>
            <div className="md:col-span-4">
              <Link href={`/${lang}/consultation`} className="btn btn-brass w-full">
                {dict.consultCta.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ItemPage({ params }: Props) {
  const { lang: raw, section: sectionId, slug } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw;
  const section = findSection(lang, sectionId);
  const item = section ? findItem(section, slug) : undefined;
  if (!section || !item) notFound();

  if (section.id === "consulting" && item.slug === "open-day") {
    return <OpenDayPage lang={lang} section={section} item={item} />;
  }

  if (section.id === "learning" && item.slug === "tutors") {
    return <TutorsPage lang={lang} section={section} item={item} />;
  }

  const dict = getDictionary(lang);
  const t = dict.slugPage;
  const stage = findStage(lang, item.stage);
  const siblings = sectionItems(section).filter((other) => other.slug !== item.slug);
  const details = t.details[item.slug] ?? t.defaultDetails;

  return (
    <>
      <PageBand
        crumbs={[
          { label: t.homeCrumb, href: `/${lang}` },
          { label: section.label, href: hrefFor(lang, section.id) },
          { label: item.label },
        ]}
        eyebrow={section.label}
        title={item.label}
        lead={item.description}
      />

      <section className="bg-ink pt-[clamp(56px,8vw,104px)] pb-[clamp(72px,10vw,140px)]">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {stage && (
              <div data-reveal>
                <p className="label">{t.stageKicker}</p>
                <div className="mt-7 flex items-start gap-5 border-t border-cream/15 pt-7 sm:gap-7">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] leading-[0.85] font-light text-brass"
                  >
                    {stage.numeral}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold tracking-[0.2em] text-cream/65 uppercase">
                      {dict.route.stagePrefix} {stage.numeral}
                    </p>
                    <p className="mt-2 font-display text-[clamp(1.8rem,1.3rem+1.2vw,2.5rem)] leading-[1.08] font-light">
                      {stage.title}
                    </p>
                    <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.7] text-cream/75">{stage.text}</p>
                    <Link
                      href={`/${lang}#stage-${stage.id}`}
                      className="link-hair link-hair-soft mt-5 inline-block text-[15px]"
                    >
                      {t.seeRoute}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`${stage ? "mt-14" : ""} border border-dashed border-cream/25 p-[clamp(20px,4vw,40px)]`}
              data-reveal
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-[clamp(1.8rem,1.3rem+1.2vw,2.4rem)] leading-[1.1] font-light">
                  {t.sectionDetails}
                </h2>
                <Tbc lang={lang} hint={t.sectionHint} />
              </div>
              <dl className="mt-6">
                {details.map((term: string) => (
                  <div
                    key={term}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/10 py-4 last:border-b-0"
                  >
                    <dt className="text-[16px] text-cream/85">{term}</dt>
                    <dd>
                      <Tbc lang={lang} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9" aria-label={t.moreIn.replace("{section}", section.label)}>
            <div className="tone-light p-[clamp(22px,3vw,36px)]" data-reveal>
              <p className="font-display text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] leading-[1.15] font-light">
                {t.discuss.replace("{item}", item.label)}
              </p>
              <Link href={`/${lang}/consultation`} className="btn btn-brass mt-6 w-full">
                {dict.consultCta.cta}
              </Link>
            </div>

            <nav aria-label={t.moreIn.replace("{section}", section.label)} data-reveal>
              <p className="label">{section.label}</p>
              <ul className="mt-5 border-t border-cream/15">
                {siblings.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={hrefFor(lang, section.id, other.slug)}
                      className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3.5 text-[15px] text-cream/85 hover:text-cream"
                    >
                      <span>{other.label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
