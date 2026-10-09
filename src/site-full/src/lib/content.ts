import pagesData from "@/generated/pages.json";
import type { Locale } from "./i18n";

export type Block =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "p" | "lead"; html: string }
  | { type: "stat"; html: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "quote"; html: string }
  | { type: "cta"; label: string; href: string }
  | { type: "faq"; items: { q: string; a: string[] }[] }
  | { type: "hr" };

export interface ContentPageData {
  lang: Locale;
  url: string;
  file: string;
  stub?: boolean;
  h1: string;
  lead: string;
  title: string;
  description: string;
  parent: string | null;
  pair: string | null;
  siblings: string[];
  children: string[];
  hasFaq: boolean;
  faqItems: { q: string; a: string[] }[];
  todos: string[];
  blocks: Block[];
}

const all = (pagesData as { pages: ContentPageData[] }).pages;
const byUrl = new Map(all.map((p) => [p.url, p]));

export function allPages(): ContentPageData[] {
  return all;
}

export function pageByUrl(url: string): ContentPageData | undefined {
  const u = url === "/" ? "/" : url.replace(/\/$/, "") + "/";
  return byUrl.get(u);
}

export function pageForSegments(lang: Locale, segments: string[]): ContentPageData | undefined {
  const path = "/" + segments.filter(Boolean).join("/") + "/";
  const url = lang === "ru" ? `/ru${path === "/" ? "/" : path}` : path;
  return byUrl.get(url);
}

export function segmentsForUrl(url: string, lang: Locale): string[] {
  const clean = lang === "ru" ? url.replace(/^\/ru/, "") : url;
  return clean.split("/").filter(Boolean);
}

const SILO_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    "private-schools": "Private schools",
    "university-admissions": "University admissions",
    "executive-education": "Executive education",
    tutors: "Tutoring",
    "summer-schools": "Summer schools",
  },
  ru: {
    "chastnye-shkoly": "Частные школы",
    "postuplenie-v-universitety": "Поступление в вузы",
    "executive-obrazovanie": "Образование для взрослых",
    repetitory: "Тьюторы",
    "letnie-shkoly": "Летние школы",
    "": "ALBION",
  },
};

export function siloOf(page: ContentPageData): string | null {
  const segs = page.url.split("/").filter(Boolean).slice(page.lang === "ru" ? 1 : 0);
  const top = segs[0] ?? "";
  return SILO_LABELS[page.lang][top] ?? null;
}

export function crumbsFor(page: ContentPageData, homeLabel: string): { label: string; href?: string }[] {
  const crumbs: { label: string; href?: string }[] = [{ label: homeLabel, href: page.lang === "ru" ? "/ru/" : "/" }];
  const chain: ContentPageData[] = [];
  let cur = page.parent ? byUrl.get(page.parent) : undefined;
  while (cur) {
    chain.unshift(cur);
    cur = cur.parent ? byUrl.get(cur.parent) : undefined;
  }
  const text = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  for (const ancestor of chain)
    crumbs.push({ label: ancestor.parent ? text(ancestor.h1) : (siloOf(ancestor) ?? text(ancestor.h1)), href: ancestor.url });
  crumbs.push({ label: text(page.h1) });
  return crumbs;
}
