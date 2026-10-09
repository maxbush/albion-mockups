import Link from "next/link";
import type { Block } from "@/lib/content";

function html(s: string) {
  return { __html: s };
}

function Faq({ items }: { items: { q: string; a: string[] }[] }) {
  return (
    <div className="mt-8 divide-y divide-ink-2/12 border-y border-ink-2/12">
      {items.map((item) => (
        <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[17px] font-medium text-ink-2">
            <span dangerouslySetInnerHTML={html(item.q)} />
            <span aria-hidden="true" className="shrink-0 font-display text-[22px] leading-none text-brass transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-4 space-y-3 text-[15.5px] leading-[1.7] text-ink-2/80">
            {item.a.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={html(p)} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Segment list → card grid: every item is `**Title** — text`. */
function isCardList(b: Extract<Block, { type: "list" }>) {
  return !b.ordered && b.items.length >= 2 && b.items.every((it) => /^<strong>[^<]+<\/strong>\s*[-—:]/.test(it));
}

function CardList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((it, j) => {
        const m = it.match(/^<strong>([^<]+)<\/strong>\s*[-—:]\s*([\s\S]*)$/);
        return (
          <li key={j} className="border border-ink-2/15 bg-white/50 p-5">
            <p className="font-display text-[17px] leading-snug font-light text-ink-2">{m?.[1] ?? ""}</p>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-2/80" dangerouslySetInnerHTML={html((m?.[2] ?? it).replace(/^[\s,;:—-]+/, ""))} />
          </li>
        );
      })}
    </ul>
  );
}

/** One content section (between `---` separators) on the light parchment body. */
export function BlockGroup({ blocks, idPrefix = "s" }: { blocks: Block[]; idPrefix?: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h1":
          case "h2":
            return (
              <h2
                key={i}
                id={`${idPrefix}-${i}`}
                className="mt-[clamp(40px,5vw,64px)] scroll-mt-[calc(var(--header-h)+24px)] font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] leading-[1.1] font-light text-ink-2 first:mt-0"
                dangerouslySetInnerHTML={html(b.text)}
              />
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-10 font-display text-[clamp(1.3rem,1.1rem+0.8vw,1.7rem)] leading-[1.15] font-light text-ink-2"
                dangerouslySetInnerHTML={html(b.text)}
              />
            );
          case "lead":
            return <p key={i} className="mt-5 text-[18px] leading-[1.7] font-light text-ink-2" dangerouslySetInnerHTML={html(b.html)} />;
          case "p":
            return <p key={i} className="mt-5 text-[16px] leading-[1.75] text-ink-2/85" dangerouslySetInnerHTML={html(b.html)} />;
          case "stat":
            return (
              <p
                key={i}
                className="mt-8 border-l-2 border-brass pl-5 font-display text-[clamp(1.35rem,1.1rem+1vw,1.8rem)] leading-[1.25] font-light text-ink-2"
                dangerouslySetInnerHTML={html(b.html)}
              />
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="mt-5 list-decimal space-y-3 pl-6 text-[16px] leading-[1.7] text-ink-2/85 marker:text-brass">
                {b.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={html(it)} />
                ))}
              </ol>
            ) : isCardList(b) ? (
              <CardList key={i} items={b.items} />
            ) : (
              <ul key={i} className="mt-5 space-y-3 text-[16px] leading-[1.7] text-ink-2/85">
                {b.items.map((it, j) => (
                  <li key={j} className="relative pl-6 before:absolute before:top-[0.72em] before:left-0 before:h-px before:w-3 before:bg-brass" dangerouslySetInnerHTML={html(it)} />
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="mt-7 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-[15px]">
                  <thead>
                    <tr>
                      {b.header.map((c, j) => (
                        <th key={j} className="border-b border-ink-2/25 pb-3 pr-6 text-left text-[12px] font-semibold tracking-[0.14em] text-ink-2/70 uppercase last:pr-0" dangerouslySetInnerHTML={html(c)} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k} className="border-b border-ink-2/10 py-3.5 pr-6 align-top leading-[1.6] text-ink-2/85 last:pr-0" dangerouslySetInnerHTML={html(c)} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-9 border border-ink-2/15 bg-white/45 p-[clamp(20px,3vw,32px)] text-[16.5px] leading-[1.7] text-ink-2/90 italic"
                dangerouslySetInnerHTML={html(b.html)}
              />
            );
          case "cta":
            return (
              <Link key={i} href={b.href} className="btn btn-brass mt-7 inline-flex">
                <span dangerouslySetInnerHTML={html(b.label)} />
              </Link>
            );
          case "faq":
            return <Faq key={i} items={b.items} />;
          default:
            return null;
        }
      })}
    </>
  );
}
