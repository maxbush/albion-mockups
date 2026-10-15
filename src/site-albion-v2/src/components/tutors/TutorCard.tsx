import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { initials, levelLabel, PHOTO_CLASS, tutorUrl, type Tutor } from "@/lib/tutors";

/** Fixed 4:5 frame: any photo is cropped to it, and a tutor without a photo gets initials, so the grid stays even. */
export function TutorPhoto({ tutor, lang, sizes }: { tutor: Tutor; lang: Locale; sizes: string }) {
  const name = tutor.name[lang];
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-ink-2/12 bg-ink-2">
      {tutor.photo ? (
        <Image
          src={tutor.photo.src}
          alt={tutor.photo.alt?.[lang] ?? name}
          fill
          sizes={sizes}
          className={`object-cover ${PHOTO_CLASS}`}
          style={{ objectPosition: tutor.photo.focus }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] font-light tracking-[0.04em] text-brass"
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}

export default function TutorCard({ tutor, lang }: { tutor: Tutor; lang: Locale }) {
  return (
    <li>
      <Link href={tutorUrl(lang, tutor.slug)} className="group block">
        <TutorPhoto tutor={tutor} lang={lang} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw" />
        <p className="mt-3 text-[16px] leading-snug font-medium text-ink-2 group-hover:underline">{tutor.name[lang]}</p>
        <p className="mt-1 text-[14px] leading-snug text-ink-2/70">{tutor.title[lang]}</p>
        <p className="mt-2 text-[12px] tracking-[0.08em] text-ink-2/60 uppercase">
          {tutor.levels.map((l) => levelLabel(l, lang)).join(" · ")}
        </p>
      </Link>
    </li>
  );
}
