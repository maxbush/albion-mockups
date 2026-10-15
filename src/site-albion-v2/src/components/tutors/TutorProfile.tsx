import Link from "next/link";
import PageBand from "@/components/pages/PageBand";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  formatLabel,
  languageLabel,
  levelLabel,
  subjectLabel,
  tutorUrl,
  tutorsHubUrl,
  TUTOR_COPY,
  type Tutor,
} from "@/lib/tutors";
import { TutorPhoto } from "./TutorCard";

const BASE = "https://albion-consult.com";

function JsonLd({ tutor, lang }: { tutor: Tutor; lang: Locale }) {
  const copy = TUTOR_COPY[lang];
  const url = `${BASE}${tutorUrl(lang, tutor.slug)}`;
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tutor.name[lang],
    jobTitle: tutor.title[lang],
    description: tutor.bio[lang],
    url,
    worksFor: { "@type": "Organization", name: "ALBION Oxford", url: BASE },
    knowsAbout: tutor.subjects.map((s) => subjectLabel(s, "en")),
  };
  if (tutor.photo) person.image = `${BASE}${tutor.photo.src}`;
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ALBION", item: `${BASE}${lang === "ru" ? "/ru/" : "/"}` },
      { "@type": "ListItem", position: 2, name: copy.eyebrow, item: `${BASE}${tutorsHubUrl(lang)}` },
      { "@type": "ListItem", position: 3, name: tutor.name[lang], item: url },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([person, crumbs]) }} />;
}

export default function TutorProfile({ tutor, lang }: { tutor: Tutor; lang: Locale }) {
  const copy = TUTOR_COPY[lang];
  const dict = getDictionary(lang);
  const form = lang === "ru" ? "/ru/anketa/" : "/apply/";
  const facts: [string, string][] = [
    [copy.education, tutor.education[lang]],
    [copy.subjects, tutor.subjects.map((s) => subjectLabel(s, lang)).join(", ")],
    [copy.levels, tutor.levels.map((l) => levelLabel(l, lang)).join(", ")],
    [copy.boards, tutor.examBoards.join(", ")],
    [copy.experience, tutor.experienceYears ? `${tutor.experienceYears} ${copy.years}` : ""],
    [copy.languages, tutor.languages.map((c) => languageLabel(c, lang)).join(", ")],
    [copy.formats, tutor.formats.map((f) => formatLabel(f, lang)).join(", ")],
  ];
  const rows = facts.filter(([, v]) => v);
  return (
    <>
      <JsonLd tutor={tutor} lang={lang} />
      <PageBand
        crumbs={[
          { label: copy.home, href: lang === "ru" ? "/ru/" : "/" },
          { label: copy.eyebrow, href: tutorsHubUrl(lang) },
          { label: tutor.name[lang] },
        ]}
        eyebrow={copy.eyebrow}
        title={tutor.name[lang]}
        lead={tutor.title[lang]}
        cta={{ label: dict.consultCta.cta, href: form }}
        art="/images/band-tutors.webp"
      />
      <section className="tone-light pt-[clamp(48px,7vw,88px)] pb-[clamp(64px,9vw,120px)]">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="max-w-[340px] lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <TutorPhoto tutor={tutor} lang={lang} sizes="(min-width: 1024px) 28vw, 80vw" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] leading-[1.15] font-light text-ink-2">{copy.about}</h2>
            <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-ink-2/85">{tutor.bio[lang]}</p>
            <dl className="mt-10 border-t border-ink-2/15">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-ink-2/10 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[13px] tracking-[0.08em] text-ink-2/60 uppercase">{k}</dt>
                  <dd className="text-[16px] text-ink-2/90">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link href={form} className="btn btn-brass">
                {dict.consultCta.cta}
              </Link>
              <Link href={tutorsHubUrl(lang)} className="link-hair self-center">
                {copy.all}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
