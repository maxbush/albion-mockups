import Link from "next/link";
import PageBand from "@/components/pages/PageBand";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { BlockGroup } from "@/components/content/Blocks";
import { crumbsFor, pageByUrl, siloOf, type Block, type ContentPageData } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";

const strip = (s: string) => s.replace(/<[^>]+>/g, "");

/** Split blocks into sections at `hr` markers. */
function sections(blocks: Block[]): Block[][] {
  const out: Block[][] = [[]];
  for (const b of blocks) {
    if (b.type === "hr") out.push([]);
    else out[out.length - 1].push(b);
  }
  return out.filter((s) => s.length);
}

function JsonLd({ page }: { page: ContentPageData }) {
  const base = "https://albion-consult.com";
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALBION Oxford",
    url: base,
    telephone: "+44 1865 236391",
    address: {
      "@type": "PostalAddress",
      streetAddress: "234 Botley Road, New Barclay House",
      addressLocality: "Oxford",
      postalCode: "OX2 0HP",
      addressCountry: "GB",
    },
  };
  const segs = page.url.split("/").filter(Boolean);
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "ALBION", item: `${base}${page.lang === "ru" ? "/ru/" : "/"}` },
    ...segs.map((s, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: decodeURIComponent(s),
      item: `${base}/${segs.slice(0, i + 1).join("/")}/`,
    })),
  ];
  const graph: object[] = [
    org,
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: `${base}${page.url}`,
      inLanguage: page.lang === "ru" ? "ru" : "en-GB",
      isPartOf: { "@type": "WebSite", name: "ALBION Oxford", url: base },
    },
  ];
  const faqForSchema = page.faqItems.filter((f) => strip(f.a.join(" ")).trim().length > 0);
  if (page.hasFaq && faqForSchema.length >= 2) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqForSchema.map((f) => ({
        "@type": "Question",
        name: strip(f.q),
        acceptedAnswer: { "@type": "Answer", text: strip(f.a.join(" ")) },
      })),
    });
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}

const FORM_PAGES: Record<Locale, Set<string>> = {
  en: new Set(["/apply/"]),
  ru: new Set(["/ru/anketa/"]),
};
const CONTACT_PAGES: Record<Locale, Set<string>> = {
  en: new Set(["/contact/"]),
  ru: new Set(["/ru/kontakty/"]),
};

const PILLAR_STATS: Record<Locale, { n: string; cap: string }[]> = {
  ru: [
    { n: "96%", cap: "учеников получают место в выбранной школе" },
    { n: "100%", cap: "клиентов — оффер минимум от одного вуза Russell Group" },
    { n: "3 из 4", cap: "кандидатов доходят до интервью в Оксбридж" },
    { n: "150+", cap: "преподавателей в разных часовых поясах" },
    { n: "с 2010", cap: "в британском образовании" },
  ],
  en: [
    { n: "96%", cap: "of pupils win a place at a chosen school" },
    { n: "100%", cap: "of clients receive at least one Russell Group offer" },
    { n: "3 in 4", cap: "of candidates reach the Oxbridge interview" },
    { n: "150+", cap: "tutors across time zones" },
    { n: "since 2010", cap: "in British education" },
  ],
};

function StatsStrip({ lang }: { lang: Locale }) {
  return (
    <section className="tone-light border-b border-ink-2/10">
      <div className="container-x grid grid-cols-2 gap-x-8 gap-y-5 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {PILLAR_STATS[lang].map((s) => (
          <p key={s.n} className="text-[13px] leading-[1.5] text-ink-2/75">
            <b className="block font-display text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] leading-tight font-light text-ink-2">{s.n}</b>
            {s.cap}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function ContentPage({ page }: { page: ContentPageData }) {
  const lang = page.lang;
  const dict = getDictionary(lang);
  const crumbs = crumbsFor(page, dict.slugPage.homeCrumb);
  const secs = sections(page.blocks);
  const parent = page.parent ? pageByUrl(page.parent) : undefined;
  const eyebrow = (parent ? strip(parent.h1) : siloOf(page)) ?? "ALBION";
  const showForm = FORM_PAGES[lang].has(page.url);
  const showContact = CONTACT_PAGES[lang].has(page.url);
  const pillar = page.children.length > 0;
  const segs = page.url.split("/").filter(Boolean).slice(lang === "ru" ? 1 : 0);
  const sectionArt: Record<string, string> = {
    "chastnye-shkoly": "/images/band-schools.webp",
    "private-schools": "/images/band-schools.webp",
    "postuplenie-v-universitety": "/images/band-university.webp",
    "university-admissions": "/images/band-university.webp",
    "executive-obrazovanie": "/images/band-executive.webp",
    "executive-education": "/images/band-executive.webp",
    "letnie-shkoly": "/images/band-summer.webp",
    "summer-schools": "/images/band-summer.webp",
    repetitory: "/images/band-tutors.webp",
    tutors: "/images/band-tutors.webp",
  };
  const bandArt =
    segs[1] === "opeka" || segs[1] === "guardianship"
      ? "/images/band-guardianship.webp"
      : sectionArt[segs[0]];
  const toc = secs.flatMap((blocks, si) =>
    blocks.flatMap((b, bi) => (b.type === "h2" ? [{ id: `s${si}-${bi}`, text: strip(b.text) }] : [])),
  );

  return (
    <>
      <JsonLd page={page} />
      <PageBand
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={<span dangerouslySetInnerHTML={{ __html: page.h1 }} />}
        lead={strip(page.lead)}
        variant={pillar ? "pillar" : "compact"}
        cta={showForm ? undefined : { label: dict.consultCta.cta, href: lang === "ru" ? "/ru/anketa/" : "/apply/" }}
        art={bandArt}
      />
      {pillar && <StatsStrip lang={lang} />}

      <section className="tone-light pt-[clamp(48px,7vw,88px)] pb-[clamp(64px,9vw,120px)]">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <article className="lg:col-span-7 xl:col-span-7">
            {secs.map((blocks, i) => (
              <div
                key={i}
                className={`${i ? "mt-[clamp(40px,5vw,64px)]" : ""} ${i % 2 === 1 ? "border border-ink-2/12 bg-white/50 p-[clamp(20px,3vw,36px)]" : ""}`}
              >
                <BlockGroup blocks={blocks} idPrefix={`s${i}`} />
              </div>
            ))}
            {showContact && (
              <div className="mt-10 border border-ink-2/15 p-[clamp(20px,3vw,32px)]" data-reveal>
                <p className="label">{lang === "ru" ? "Контакты" : "Contact"}</p>
                <div className="mt-6 space-y-3 text-[16px] leading-[1.7] text-ink-2/85">
                  <p>
                    <a className="link-hair" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                  </p>
                  <p>
                    <a className="link-hair" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </p>
                  <p>{CONTACT.address}</p>
                </div>
              </div>
            )}
            {showForm && (
              <div className="mt-12 border border-ink-2/15 bg-white/40 p-[clamp(22px,3vw,40px)]" data-reveal>
                <EnquiryForm lang={lang} kind="consultation" submitLabel={dict.consultCta.cta} />
              </div>
            )}
            {page.todos.length > 0 &&
              page.todos.map((t, i) => <span key={i} dangerouslySetInnerHTML={{ __html: `<!-- TODO: ${t.replace(/--/g, "—")} -->` }} />)}
          </article>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
            {toc.length >= 3 && (
              <nav aria-label={lang === "ru" ? "На этой странице" : "On this page"} className="hidden lg:block">
                <p className="label">{lang === "ru" ? "На этой странице" : "On this page"}</p>
                <ul className="mt-4 space-y-2 border-l border-ink-2/15">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block py-1 pl-4 text-[14px] leading-snug text-ink-2/70 transition-colors hover:text-ink-2">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {!showForm && (
              <div className="border border-ink-2/15 bg-white/40 p-[clamp(22px,3vw,36px)]" data-reveal>
                <p className="font-display text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] leading-[1.15] font-light text-ink-2">
                  {dict.slugPage.discuss.replace("{item}", strip(page.h1))}
                </p>
                <Link href={lang === "ru" ? "/ru/anketa/" : "/apply/"} className="btn btn-brass mt-6 w-full">
                  {dict.consultCta.cta}
                </Link>
              </div>
            )}
            <div className="hidden lg:block lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <SiblingNavDark page={page} lang={lang} />
            </div>
          </aside>
        </div>
      </section>

      <section className="tone-light border-t border-ink-2/10 pb-[clamp(56px,8vw,96px)] lg:hidden">
        <div className="container-x pt-10">
          <SiblingNavDark page={page} lang={lang} />
        </div>
      </section>
    </>
  );
}

/** Sibling/children list for the parchment body. */
function SiblingNavDark({ page, lang }: { page: ContentPageData; lang: Locale }) {
  const siblings = page.siblings.map((u) => pageByUrl(u)).filter(Boolean) as ContentPageData[];
  const parent = page.parent ? pageByUrl(page.parent) : undefined;
  const children = page.children.map((u) => pageByUrl(u)).filter(Boolean) as ContentPageData[];
  const links = children.length ? children : siblings;
  if (!links.length) return null;
  const dict = getDictionary(lang);
  return (
    <nav aria-label={dict.slugPage.moreIn.replace("{section}", parent?.h1 ? strip(parent.h1) : (siloOf(page) ?? ""))} data-reveal>
      <p className="label">{parent ? strip(parent.h1) : siloOf(page)}</p>
      <ul className="mt-5 border-t border-ink-2/15">
        {links.map((s) => (
          <li key={s.url}>
            <Link
              href={s.url}
              className="flex items-baseline justify-between gap-4 border-b border-ink-2/10 py-3.5 text-[15px] text-ink-2/85 hover:text-ink-2"
            >
              <span dangerouslySetInnerHTML={{ __html: s.h1 }} />
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
