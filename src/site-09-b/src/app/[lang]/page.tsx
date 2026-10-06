import { notFound } from "next/navigation";
import Hero from "@/components/hero/Hero";
import Adults from "@/components/home/Adults";
import Consultation from "@/components/home/Consultation";
import Difference from "@/components/home/Difference";
import Directory from "@/components/home/Directory";
import LeadMagnet from "@/components/home/LeadMagnet";
import Manifesto from "@/components/home/Manifesto";
import Method from "@/components/home/Method";
import Offers from "@/components/home/Offers";
import OpenDay from "@/components/home/OpenDay";
import RouteSection from "@/components/home/RouteSection";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import NextStep from "@/components/home/NextStep";
import TrustBar from "@/components/home/TrustBar";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw;
  const dict = getDictionary(lang);
  return (
    <>
      <Hero dict={dict.hero} />
      <TrustBar lang={lang} />
      <Manifesto lang={lang} />
      <RouteSection lang={lang} />
      <Method lang={lang} />
      <Adults lang={lang} />
      <Difference lang={lang} />
      <Directory lang={lang} />
      <Offers lang={lang} />
      <Team lang={lang} />
      <Testimonials lang={lang} />
      <OpenDay lang={lang} />
      <LeadMagnet lang={lang} />
      <NextStep lang={lang} />
      <Consultation lang={lang} />
    </>
  );
}
