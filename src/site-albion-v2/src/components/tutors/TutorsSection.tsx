import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { allTutors, tutorsFor, tutorsHubUrl, TUTOR_COPY } from "@/lib/tutors";
import TutorCard from "./TutorCard";
import TutorFilter from "./TutorFilter";

/**
 * Tutor block for content pages. Renders nothing while there are no published tutors,
 * so the groundwork changes nothing on the live site until real profiles exist.
 */
export default function TutorsSection({ lang, level, hub }: { lang: Locale; level?: string; hub?: boolean }) {
  const list = hub || !level ? allTutors() : tutorsFor({ level });
  if (!list.length) return null;
  const copy = TUTOR_COPY[lang];
  return (
    <section aria-labelledby="tutors-title" className="tone-light border-t border-ink-2/10 py-[clamp(48px,7vw,96px)]">
      <div className="container-x">
        <h2 id="tutors-title" className="font-display text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] leading-[1.1] font-light text-ink-2">
          {copy.section}
        </h2>
        {hub ? (
          <div className="mt-8">
            <TutorFilter tutors={list} lang={lang} />
          </div>
        ) : (
          <>
            <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {list.slice(0, 4).map((t) => (
                <TutorCard key={t.slug} tutor={t} lang={lang} />
              ))}
            </ul>
            <p className="mt-10">
              <Link href={tutorsHubUrl(lang)} className="link-hair">
                {copy.all}
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
