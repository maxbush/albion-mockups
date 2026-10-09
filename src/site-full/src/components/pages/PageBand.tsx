import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

/** Static echo of the hero composition for inner pages: quad seen through foliage, deep ink below. */
export default function PageBand({
  crumbs,
  eyebrow,
  title,
  lead,
  focus = "50% 45%",
  variant = "compact",
  cta,
  art,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  focus?: string;
  /** compact — leaf pages (~340px); pillar — section hubs (~480px) */
  variant?: "compact" | "pillar";
  cta?: { label: string; href: string };
  /** section-specific watercolour for the band background */
  art?: string;
}) {
  const tall = variant === "pillar";
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={art ?? "/images/hero-quad.webp"}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        {!art && (
          <div className="absolute inset-0 mix-blend-multiply">
            <Image
              src="/images/hero-foliage-wide.webp"
              alt=""
              fill
              sizes="100vw"
              quality={70}
              className="object-cover object-top"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,21,34,0.62)_0%,rgba(15,21,34,0.46)_36%,rgba(15,21,34,0.86)_72%,#0F1522_100%)]" />
      </div>

      <div
        className={`container-x flex flex-col justify-end pt-[calc(var(--header-h)+40px)] ${
          tall ? "min-h-[min(56svh,540px)] pb-[clamp(40px,6vw,72px)]" : "min-h-[min(40svh,360px)] pb-[clamp(28px,4vw,44px)]"
        }`}
      >
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-cream/80">
            {crumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="link-hair link-hair-soft">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-cream">
                    {crumb.label}
                  </span>
                )}
                {i < crumbs.length - 1 && (
                  <span aria-hidden="true" className="text-cream/45">
                    /
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className={`label ${tall ? "mt-8" : "mt-5"}`}>{eyebrow}</p>
        <h1
          id="page-title"
          className={`mt-4 font-display leading-[1.02] font-light tracking-[-0.01em] ${
            tall ? "max-w-[18ch] text-[clamp(2.4rem,1.5rem+3.4vw,4.5rem)]" : "max-w-[26ch] text-[clamp(1.9rem,1.4rem+2vw,3.2rem)]"
          }`}
        >
          {title}
        </h1>
        {lead && (
          <p className={`mt-4 max-w-[62ch] leading-[1.6] text-cream/85 ${tall ? "text-[clamp(16px,0.95rem+0.25vw,19px)]" : "text-[15.5px]"}`}>
            {lead}
          </p>
        )}
        {cta && (
          <p className="mt-5">
            <Link href={cta.href} className="btn btn-brass">
              {cta.label}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
