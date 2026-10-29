import pairsData from "@/generated/pairs.json";
import type { Locale } from "./i18n";

// url -> [language of the page, url of its translation]. Tiny (a few KB), safe for client components;
// the full page texts live in lib/content.ts and must only be imported by server components.
const pairs = pairsData as unknown as Record<string, [Locale, string | null]>;

export function pairOf(url: string): { lang: Locale; pair: string | null; url: string } | undefined {
  const u = url === "/" ? "/" : url.replace(/\/$/, "") + "/";
  const hit = pairs[u];
  return hit ? { lang: hit[0], pair: hit[1], url: u } : undefined;
}
