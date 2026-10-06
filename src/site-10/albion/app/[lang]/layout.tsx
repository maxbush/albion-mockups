import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import HtmlLang from '@/components/HtmlLang';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
      locale: lang === 'ru' ? 'ru_RU' : 'en_GB',
    },
    alternates: {
      languages: { en: '/en', ru: '/ru' },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <HtmlLang lang={lang} />
      <Header lang={lang} dict={dict.header} langDict={dict.lang} sitemap={dict.sitemap} />
      <main id="main">{children}</main>
      <Footer
        lang={lang}
        dict={dict.footer}
        nav={dict.header.nav}
        sitemap={dict.sitemap}
        sectionsLabel={dict.header.sectionsLabel}
        langDict={dict.lang}
      />
    </>
  );
}
