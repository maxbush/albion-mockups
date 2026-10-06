import Image from "next/image";
import EnquiryForm from "@/components/forms/EnquiryForm";
import ContactList from "@/components/ui/ContactList";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Consultation({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).consultation;
  return (
    <section id="consultation" aria-labelledby="consult-title" className="tone-light py-[clamp(88px,12vw,168px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div data-reveal>
            <p className="label">{t.label}</p>
            <h2
              id="consult-title"
              className="mt-7 font-display text-[clamp(2.4rem,1.2rem+3.6vw,4.8rem)] leading-[1] font-light tracking-[-0.01em]"
            >
              {t.title} <em>{t.titleEm}</em>
            </h2>
            <p className="mt-7 max-w-[46ch] text-[17px] leading-[1.72] text-ink-2/80">{t.lead}</p>
          </div>
          <ContactList lang={lang} />
          <Image
            src="/images/consultation-scene.jpg"
            alt={t.imgAlt}
            width={1600}
            height={900}
            quality={70}
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="mt-12 hidden h-auto w-full max-w-[560px] mix-blend-multiply sm:block"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="border border-ink-2/15 p-[clamp(20px,4vw,48px)]">
            <EnquiryForm lang={lang} kind="consultation" submitLabel={t.submit} />
          </div>
        </div>
      </div>
    </section>
  );
}
