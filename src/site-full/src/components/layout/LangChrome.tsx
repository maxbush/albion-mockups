import type { ReactNode } from "react";
import HtmlLang from "@/components/HtmlLang";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function LangChrome({ lang, children }: { lang: Locale; children: ReactNode }) {
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
