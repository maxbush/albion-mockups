import data from "@/generated/tutors.json";
import type { Locale } from "./i18n";

type Labels = Record<Locale, string>;

export interface Tutor {
  slug: string;
  sort: number;
  name: Labels;
  title: Labels;
  education: Labels;
  bio: Labels;
  subjects: string[];
  levels: string[];
  examBoards: string[];
  experienceYears: number | null;
  languages: string[];
  formats: string[];
  photo: { src: string; focus: string; alt: Labels | null } | null;
}

interface Taxonomy {
  levels: Record<string, Labels>;
  subjects: Record<string, Labels>;
  formats: Record<string, Labels>;
}

const store = data as unknown as { taxonomy: Taxonomy; tutors: Tutor[] };

export const TAXONOMY: Taxonomy = store.taxonomy;

/**
 * How photos are treated. Tutors send their own pictures, so lighting and colour differ.
 *  "none" shows each photo as it is (the default);
 *  "soft" applies one gentle tone to all photos so a mixed showcase looks consistent.
 * This is a design decision to make once real photos arrive.
 */
export const PHOTO_TREATMENT = "none" as "none" | "soft";
export const PHOTO_CLASS = PHOTO_TREATMENT === "soft" ? "grayscale-[0.25] contrast-[1.03] sepia-[0.08]" : "";

export function allTutors(): Tutor[] {
  return store.tutors;
}

export function tutorsFor(opts: { level?: string; subject?: string } = {}): Tutor[] {
  return store.tutors.filter(
    (t) => (!opts.level || t.levels.includes(opts.level)) && (!opts.subject || t.subjects.includes(opts.subject)),
  );
}

export const tutorsHubUrl = (lang: Locale) => (lang === "ru" ? "/ru/repetitory/" : "/tutors/");
export const tutorUrl = (lang: Locale, slug: string) => `${tutorsHubUrl(lang)}${slug}/`;

/** Profile lookup for the catch-all routes: /tutors/{slug}/ and /ru/repetitory/{slug}/. */
export function tutorForSegments(lang: Locale, segments: string[]): Tutor | undefined {
  const hub = lang === "ru" ? "repetitory" : "tutors";
  const segs = segments.filter(Boolean);
  if (segs.length !== 2 || segs[0] !== hub) return undefined;
  return store.tutors.find((t) => t.slug === segs[1]);
}

export function tutorSegments(lang: Locale): string[][] {
  const hub = lang === "ru" ? "repetitory" : "tutors";
  return store.tutors.map((t) => [hub, t.slug]);
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

export const levelLabel = (key: string, lang: Locale) => TAXONOMY.levels[key]?.[lang] ?? key;
export const subjectLabel = (key: string, lang: Locale) => TAXONOMY.subjects[key]?.[lang] ?? key;
export const formatLabel = (key: string, lang: Locale) => TAXONOMY.formats[key]?.[lang] ?? key;

export function languageLabel(code: string, lang: Locale): string {
  try {
    return new Intl.DisplayNames([lang === "ru" ? "ru" : "en-GB"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Which tutor block each content page shows. A page not listed here shows nothing. */
export const TUTOR_BLOCKS: Record<string, { level?: string; hub?: boolean }> = {
  "/tutors/": { hub: true },
  "/tutors/gcse/": { level: "gcse" },
  "/tutors/a-level/": { level: "a-level" },
  "/tutors/ib/": { level: "ib" },
  "/ru/repetitory/": { hub: true },
  "/ru/repetitory/gcse/": { level: "gcse" },
  "/ru/repetitory/a-level/": { level: "a-level" },
  "/ru/repetitory/ib/": { level: "ib" },
};

export const TUTOR_COPY: Record<Locale, { section: string; all: string; shown: string; empty: string; subject: string; level: string; any: string; home: string; eyebrow: string; education: string; subjects: string; levels: string; boards: string; experience: string; languages: string; formats: string; years: string; about: string }> = {
  en: {
    section: "Our tutors",
    all: "All tutors",
    shown: "Showing {n} of {m}",
    empty: "No tutor matches this combination yet.",
    subject: "Subject",
    level: "Level",
    any: "Any",
    home: "Home",
    eyebrow: "Tutoring",
    education: "Education",
    subjects: "Subjects",
    levels: "Levels",
    boards: "Exam boards",
    experience: "Experience",
    languages: "Languages",
    formats: "Format",
    years: "years",
    about: "About",
  },
  ru: {
    section: "Наши тьюторы",
    all: "Все тьюторы",
    shown: "Показано {n} из {m}",
    empty: "Для этого сочетания тьютора пока нет.",
    subject: "Предмет",
    level: "Уровень",
    any: "Любой",
    home: "Главная",
    eyebrow: "Тьюторы",
    education: "Образование",
    subjects: "Предметы",
    levels: "Уровни",
    boards: "Exam boards",
    experience: "Опыт",
    languages: "Языки",
    formats: "Формат",
    years: "лет",
    about: "О тьюторе",
  },
};
