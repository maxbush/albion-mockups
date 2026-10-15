import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

/**
 * Where the site is served. The mockup lives on GitHub Pages under a sub-path; for production set
 * SITE_ORIGIN (and SITE_BASE_PATH is empty), and the same values flow into canonical, hreflang and social cards.
 */
const ORIGIN = (process.env.SITE_ORIGIN ?? "https://maxbush.github.io").replace(/\/$/, "");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = `${ORIGIN}${BASE}`;
export const metadataBase = new URL(`${SITE_URL}/`);

/** Search engines may index the site only when SITE_INDEXABLE=1 (set it at launch). Until then it is a closed mockup. */
export const INDEXABLE = process.env.SITE_INDEXABLE === "1";

const OG_IMAGE = "/images/og-default.jpg";

/** Open Graph and Twitter card fields. They replace (not merge with) the parent's, so every level passes them whole. */
export function social(title: string, description: string, url: string, lang: Locale): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: "ALBION Oxford",
      locale: lang === "ru" ? "ru_RU" : "en_GB",
      title,
      description,
      url,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ALBION Oxford" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

/** Structured data for the home page: who the company is and how to reach it (all facts from the contacts page). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALBION",
    alternateName: "ALBION Oxford",
    url: `${SITE_URL}/`,
    foundingDate: "2010",
    email: "info@albionconsult.co.uk",
    telephone: "+44 1865 236391",
    address: {
      "@type": "PostalAddress",
      streetAddress: "New Barclay House, 234 Botley Road",
      addressLocality: "Oxford",
      postalCode: "OX2 0HP",
      addressCountry: "GB",
    },
    sameAs: [
      "https://www.instagram.com/albionconsult/",
      "https://www.youtube.com/@ALBION_consult",
      "https://www.facebook.com/albionconsult",
      "https://www.linkedin.com/company/albionconsult",
      "https://t.me/albionedu",
    ],
  };
}
