import Image from "next/image";
import Link from "next/link";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { findSection, hrefFor, sectionItems } from "@/lib/site";

/** A separate door for adult learners (master's, doctorate, MBA, management programmes) — a different audience from the school route. */
export default function Adults({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).adults;
  const section = findSection(lang, "adults");
  if (!section) return null;
  const items = sectionItems(section);
  return (
    <section
      id="adults"
      aria-labelledby="adults-title"
      className="border-t border-cream/10 bg-ink-2 py-[clamp(72px,9vw,136px)]"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-reveal>
          <p className="label">{t.label}</p>
          <h2
            id="adults-title"
            className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.2rem)] leading-[1.02] font-light tracking-[-0.01em]"
          >
            {t.title} <em>{t.titleEm}</em>
          </h2>
          <p className="mt-7 max-w-[46ch] text-[17px] leading-[1.72] text-cream/75">{t.lead}</p>
          <a href="#consultation" className="btn btn-brass mt-9">
            {t.cta}
          </a>
          <figure className="relative mt-14 hidden w-full max-w-[380px] lg:block">
            <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border border-brass/45" />
            <Image
              src="/images/adults-scene.jpg"
              alt={t.imgAlt}
              width={1200}
              height={1600}
              quality={70}
              sizes="380px"
              className="relative h-auto w-full"
            />
          </figure>
        </div>

        <ul className="border-t border-cream/15 lg:col-span-6 lg:col-start-7">
          {items.map((item, i) => (
            <li key={item.slug} className="border-b border-cream/15" data-reveal style={revealDelay(i * 70)}>
              <Link
                href={hrefFor(lang, "adults", item.slug)}
                className="group grid items-baseline gap-2 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] sm:gap-6"
              >
                <span className="font-display text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] leading-[1.1] font-light">
                  {item.label}
                </span>
                <span className="text-[15px] leading-[1.6] text-cream/65">{item.description}</span>
                <span
                  aria-hidden="true"
                  className="hidden text-[20px] transition-[translate] duration-300 group-hover:translate-x-1 sm:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
