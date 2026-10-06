import { getDictionary, type Locale } from "./i18n";

export type SectionId = "about" | "admissions" | "learning" | "services" | "blog";
export type StageId = "prep" | "school" | "exams" | "university" | "postgrad";

export interface NavItem {
  slug: string;
  label: string;
  description: string;
  stage?: StageId;
  note?: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface NavSection {
  id: SectionId;
  label: string;
  intro: string;
  groups: NavGroup[];
}

export interface Stage {
  id: StageId;
  numeral: string;
  title: string;
  short: string;
  text: string;
  links: Array<{ section: SectionId; slug: string }>;
}

export const getNav = (lang: Locale): NavSection[] => getDictionary(lang).site.nav;
export const getStages = (lang: Locale): Stage[] => getDictionary(lang).site.stages;
export const getStageOptions = (lang: Locale) => getDictionary(lang).site.stageOptions;
export const getDestinationOptions = (lang: Locale) => getDictionary(lang).site.destinationOptions;

export function findSection(lang: Locale, id: string): NavSection | undefined {
  return getNav(lang).find((section) => section.id === id);
}

export function sectionItems(section: NavSection): NavItem[] {
  return section.groups.flatMap((group) => group.items);
}

export function findItem(section: NavSection, slug: string): NavItem | undefined {
  return sectionItems(section).find((item) => item.slug === slug);
}

export function hrefFor(lang: Locale, section: SectionId, slug?: string): string {
  return slug ? `/${lang}/${section}/${slug}` : `/${lang}/${section}`;
}

export function labelFor(lang: Locale, section: SectionId, slug: string): string {
  const found = findSection(lang, section);
  return (found && findItem(found, slug)?.label) || slug;
}

export function findStage(lang: Locale, id: StageId | undefined): Stage | undefined {
  return id ? getStages(lang).find((stage) => stage.id === id) : undefined;
}
