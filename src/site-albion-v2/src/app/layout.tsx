import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import RevealObserver from "@/components/layout/RevealObserver";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "500"],
  style: ["normal"],
  variable: "--font-cormorant",
  display: "swap",
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300"],
  style: ["italic"],
  variable: "--font-cormorant-italic",
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Preview builds (tutor cards shown with test data) are labelled and kept out of search engines.
const PREVIEW = process.env.NEXT_PUBLIC_TUTORS_PREVIEW === "1";

export const metadata: Metadata = {
  title: {
    default: "ALBION — independent education consultancy in Oxford",
    template: "%s — ALBION",
  },
  description:
    "ALBION walks international families along the whole British route: school preparation, the British school, GCSE, A-Level or IB, university, master's and MBA.",
  ...(PREVIEW ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0F1522",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantItalic.variable} ${interTight.variable}`}
    >
      <body className="bg-ink text-cream antialiased">
        {children}
        {PREVIEW && (
          <p className="pointer-events-none fixed bottom-3 left-3 z-[60] max-w-[26rem] border border-brass/60 bg-ink/90 px-3 py-2 text-[12px] leading-snug text-cream/90">
            Preview of the tutor cards. Four real photos supplied by ALBION and five invented test tutors. Not the live site.
          </p>
        )}
        <RevealObserver />
      </body>
    </html>
  );
}
