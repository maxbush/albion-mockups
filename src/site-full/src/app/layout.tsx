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

export const metadata: Metadata = {
  title: {
    default: "ALBION — independent education consultancy in Oxford",
    template: "%s — ALBION",
  },
  description:
    "ALBION walks international families along the whole British route: school preparation, the British school, GCSE, A-Level or IB, university, master's and MBA.",
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
        <RevealObserver />
      </body>
    </html>
  );
}
