import Link from "next/link";
import Image from "next/image";
import { Tbc } from "@/components/ui/Tbc";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { path } from "@/lib/site";

const leadership = [
  { name: "Anfisa Bashkirova", src: "/images/team/team-anfisa-bashkirova.jpg" },
  { name: "Altynay Yeshmatova", src: "/images/team/team-altynay-yeshmatova.jpg" },
  { name: "William Knox", src: "/images/team/team-william-knox.jpg" },
  { name: "Vladimir Ivanov-Krymskiy", src: "/images/team/team-vladimir-ivanov-krymskiy.jpg" },
  { name: "Jonathan Mintram", src: "/images/team/team-jonathan-mintram.jpg" },
];

function PersonCard({
  person,
  i,
  nameLabel,
  roleLabel,
}: {
  person: { name: string; role: string; src: string };
  i: number;
  nameLabel: string;
  roleLabel: string;
}) {
  return (
    <li className="group" data-reveal style={revealDelay(i * 70)}>
      <div className="relative aspect-[3/4] overflow-hidden border border-cream/12 bg-[#f3efe3] shadow-[0_22px_50px_-28px_rgba(0,0,0,0.75)]">
        <Image
          src={person.src}
          alt={`${person.name} — ${person.role}`}
          fill
          sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 45vw"
          className="object-cover object-top"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="text-[14px] leading-snug font-medium text-cream/90">{person.name}</p>
        <p className="min-w-0 max-w-[60%] text-right text-[12px] text-cream/70">{person.role}</p>
      </div>
    </li>
  );
}

export default function Team({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).team;
  const leaders = leadership.map((p, i) => ({ ...p, role: t.roles[i] }));
  return (
    <section aria-labelledby="team-title" className="bg-ink-2 py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]" data-reveal>
            <p className="label">{t.label}</p>
            <p className="mt-10 font-display text-[clamp(6rem,3rem+11vw,12rem)] leading-[0.8] font-light tracking-[-0.035em] text-brass">
              20+
            </p>
            <p className="mt-7 max-w-[20ch] text-[14px] leading-[1.5] font-medium tracking-[0.16em] text-cream/85 uppercase">
              {t.cap}
            </p>
            <h2
              id="team-title"
              className="mt-12 font-display text-[clamp(2rem,1.2rem+2.4vw,3.4rem)] leading-[1.04] font-light tracking-[-0.01em]"
            >
              <span className="lowercase">{t.title} {t.titleEm}</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-cream/80">{t.lead}</p>

            <figure className="mt-10 border-l border-brass/70 pl-6">
              <p className="display-italic text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] leading-[1.3] text-cream/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <figcaption className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-cream/65">
                {t.quoteBy} <Tbc lang={lang} />
              </figcaption>
            </figure>

            <div className="mt-10" data-reveal>
              <p className="label">{t.resultsLabel}</p>
              <dl className="mt-5 border-t border-cream/15">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 py-4">
                  <dt className="text-[15px] text-cream/85">{t.admissionsRow}</dt>
                  <dd>
                    <Tbc lang={lang} />
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 py-4">
                  <dt className="text-[15px] text-cream/85">{t.familiesRow}</dt>
                  <dd>
                    <Tbc lang={lang} />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[15px]">
              <Link href={path(lang, "team")} className="link-hair link-hair-soft">
                {t.linkTeam}
              </Link>
              <Link href={path(lang, "cases")} className="link-hair link-hair-soft">
                {t.linkResults}
              </Link>
              <Link href={path(lang, "reviews")} className="link-hair link-hair-soft">
                {t.linkTestimonials}
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="label" data-reveal>
            {t.leadershipAria}
          </p>
          <ul className="mt-6 grid gap-x-4 gap-y-10 sm:grid-cols-2" aria-label={t.leadershipAria}>
            {leaders.map((person, i) => (
              <PersonCard key={person.name} person={person} i={i} nameLabel={t.nameLabel} roleLabel={t.roleLabel} />
            ))}
          </ul>

          <div className="mt-12" data-reveal>
            <Link href={path(lang, "tutors")} className="link-hair link-hair-soft">
              {t.linkTutors}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
