import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import HtmlLang from "@/components/HtmlLang";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ru: "/ru" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang: Locale = raw;
  const dict = getDictionary(lang);
  return (
    <>
      <HtmlLang lang={lang} />
      <a href="#main" className="skip-link">
        {dict.header.skip}
      </a>
      <SiteHeader lang={lang} />
      <main id="main">{children}</main>
      <SiteFooter lang={lang} />
      <WhatsAppFloat ariaLabel={dict.whatsapp.aria} />
    </>
  );
}
