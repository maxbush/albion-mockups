import Link from "next/link";
import { revealDelay } from "@/lib/css";
import { getDictionary, type Locale } from "@/lib/i18n";
import { path } from "@/lib/site";

/**
 * Where the route leads: areas of work, with no school or university names
 * (names are not published without the client's permission).
 */
export default function Offers({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).offers;
  return (
    <section aria-labelledby="offers-title" className="bg-parchment py-[clamp(72px,10vw,132px)]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal>
          <div className="lg:col-span-7">
            <p className="label">{t.label}</p>
            <h2
              id="offers-title"
              className="mt-7 font-display text-[clamp(2.2rem,1.2rem+3.2vw,4.4rem)] leading-[1.02] font-light tracking-[-0.01em] text-ink-2"
            >
              {t.title} <span className="border-b-2 border-brass/70 pb-1">{t.titleEm}</span>
            </h2>
          </div>
          <p className="max-w-[48ch] text-[16px] leading-[1.7] text-ink-2/70 lg:col-span-4 lg:col-start-9">{t.lead}</p>
        </div>

        <ul
          aria-label={t.itemsAria}
          className="mt-[clamp(40px,5vw,64px)] grid border-t border-ink-2/15 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.items.map((item, i) => (
            <li
              key={item.title}
              className="border-b border-ink-2/15 lg:border-b-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0"
              data-reveal
              style={revealDelay(i * 70)}
            >
              <Link href={path(lang, item.key)} className="group block h-full py-8">
                <span className="block font-display text-[clamp(1.5rem,1.2rem+0.8vw,1.9rem)] leading-[1.12] font-medium text-ink-2">
                  {item.title}
                </span>
                <span className="mt-3 block text-[15px] leading-[1.65] text-ink-2/75">{item.text}</span>
                <span
                  aria-hidden="true"
                  className="mt-5 block text-[18px] text-brass transition-[translate] duration-300 group-hover:translate-x-1"
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
