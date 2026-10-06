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
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  focus?: string;
}) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-quad.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        <div className="absolute inset-0 mix-blend-multiply">
          <Image
            src="/images/hero-foliage-wide.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,21,34,0.62)_0%,rgba(15,21,34,0.46)_36%,rgba(15,21,34,0.86)_72%,#0F1522_100%)]" />
      </div>

      <div className="container-x flex min-h-[min(74svh,760px)] flex-col justify-end pt-[calc(var(--header-h)+56px)] pb-[clamp(48px,7vw,96px)]">
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
        <p className="label mt-10">{eyebrow}</p>
        <h1
          id="page-title"
          className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,1.4rem+4.2vw,5.75rem)] leading-[0.98] font-light tracking-[-0.012em]"
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-[58ch] text-[clamp(16px,0.95rem+0.25vw,19px)] leading-[1.65] text-cream/85">{lead}</p>
        )}
      </div>
    </section>
  );
}
