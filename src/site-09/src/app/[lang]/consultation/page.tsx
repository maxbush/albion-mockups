import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PageBand from "@/components/pages/PageBand";
import ContactList from "@/components/ui/ContactList";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).consultPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ConsultationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw;
  const dict = getDictionary(lang);
  const t = dict.consultPage;
  return (
    <>
      <PageBand
        crumbs={[
          { label: dict.sectionPage.homeCrumb, href: `/${lang}` },
          { label: t.crumb },
        ]}
        eyebrow={t.eyebrow}
        title={
          <>
            {dict.consultation.title} <em>{dict.consultation.titleEm}</em>
          </>
        }
        lead={dict.consultation.lead}
      />

      <section className="tone-light py-[clamp(64px,9vw,128px)]">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="label">{t.howLabel}</p>
            <ol className="mt-7 border-t border-ink-2/15">
              {t.steps.map((step) => (
                <li
                  key={step.n}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-ink-2/15 py-6"
                >
                  <span aria-hidden="true" className="font-display text-[26px] leading-none font-light text-ink-2/55">
                    {step.n}
                  </span>
                  <div>
                    <h2 className="font-display text-[26px] leading-[1.15] font-medium">{step.title}</h2>
                    <p className="mt-2 text-[16px] leading-[1.7] text-ink-2/80">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ContactList lang={lang} />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-ink-2/15 p-[clamp(20px,4vw,48px)]">
              <EnquiryForm lang={lang} kind="consultation" submitLabel={dict.consultation.submit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
