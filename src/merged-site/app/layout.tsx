import type { Metadata } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALBION Consult — a route into education | Oxford",
  description:
    "ALBION Consult guides international families through British education — schools, universities, Oxbridge, testing and tuition. Independent, Oxford-based, unhurried.",
  openGraph: {
    title: "ALBION Consult — a route into education",
    description: "Oxford-based education consultancy for international families.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
