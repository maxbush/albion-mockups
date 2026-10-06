import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n';
import HeroEntrance from '@/components/HeroEntrance';
import TrustBar from '@/components/TrustBar';
import Journey from '@/components/Journey';
import Principle from '@/components/Principle';
import SchoolsMarquee from '@/components/SchoolsMarquee';
import IndexDirections from '@/components/IndexDirections';
import Advantages from '@/components/Advantages';
import JournalTeaser from '@/components/JournalTeaser';
import LeadMagnet from '@/components/LeadMagnet';
import FinalCTA from '@/components/FinalCTA';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'ALBION',
    description: d.meta.description,
    areaServed: ['GB', 'EU', 'US'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oxford',
      addressCountry: 'GB',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroEntrance dict={d.hero} />
      <TrustBar dict={d.trust} />
      <Journey dict={d.journey} />
      <Principle dict={d.principle} />
      <SchoolsMarquee dict={d.schools} />
      <IndexDirections dict={d.index} />
      <Advantages dict={d.why} />
      <JournalTeaser dict={d.journal} />
      <LeadMagnet dict={d.leadmagnet} />
      <FinalCTA dict={d.contact} />
      <WhatsAppFloat dict={d.whatsapp} />
    </>
  );
}
