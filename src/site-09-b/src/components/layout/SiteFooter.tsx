import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { CONTACT, SOCIALS, getNav, hrefFor } from "@/lib/site";
import { Tbc } from "@/components/ui/Tbc";

export default function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).footer;
  const nav = getNav(lang);
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink text-cream">
      <div className="container-x pt-[clamp(64px,9vw,120px)] pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p
              aria-hidden="true"
              className="font-display text-[clamp(3.4rem,1.6rem+9vw,10.5rem)] leading-[0.82] font-light tracking-[0.16em] text-cream/90"
            >
              ALBION
            </p>
            <p className="mt-7 max-w-[46ch] text-[16px] leading-[1.65] text-cream/75">{t.tag}</p>
          </div>

          <div className="space-y-7 lg:col-span-4 lg:col-start-9">
            <Link href={`/${lang}/consultation`} className="btn btn-brass w-full sm:w-auto">
              {t.cta}
            </Link>
            <dl className="grid gap-3 text-[14px] text-cream/75">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="min-w-[5.5rem] text-cream/60">{t.email}</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`} className="link-hair link-hair-soft text-cream/90">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="min-w-[5.5rem] text-cream/60">{t.tel}</dt>
                <dd>
                  <a href={CONTACT.phoneHref} className="link-hair link-hair-soft text-cream/90">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="min-w-[5.5rem] text-cream/60">{t.office}</dt>
                <dd className="max-w-[28ch]">{CONTACT.address}</dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="min-w-[5.5rem] text-cream/60">{t.follow}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {SOCIALS.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          className="link-hair link-hair-soft text-cream/90"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <nav aria-label={t.navAria} className="mt-16 border-t border-cream/10 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
            {nav.map((section) => (
              <li key={section.id}>
                <Link href={hrefFor(lang, section.id)} className="link-hair link-hair-soft text-cream/85">
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={hrefFor(lang, "consulting", "open-day")} className="link-hair link-hair-soft text-cream/85">
                {t.openDay}
              </Link>
            </li>
            <li>
              <Link href={hrefFor(lang, "about", "contact")} className="link-hair link-hair-soft text-cream/85">
                {t.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-3 text-[13px] text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.rights}</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              {t.privacy} <Tbc lang={lang} />
            </span>
            <span className="inline-flex items-center gap-2">
              {t.company} <Tbc lang={lang} />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
