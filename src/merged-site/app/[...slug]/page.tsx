import Link from "next/link";
import { JOURNAL_TITLES, NAV, titleForSlug } from "@/lib/nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  for (const node of NAV) {
    for (const child of node.children ?? []) {
      const slug = child.href.replace(/^\//, "");
      if (slug.includes("#")) continue;
      params.push({ slug: slug.split("/") });
    }
  }
  for (const key of Object.keys(JOURNAL_TITLES)) {
    params.push({ slug: key.split("/") });
  }
  return params;
}

export default async function PlaceholderPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const title = titleForSlug(slug);
  return (
    <>
      <main id="main">
        <div className="prep">
          <p className="eyebrow">ALBION · In preparation</p>
          <h1 className="display">{title}</h1>
          <p>
            This chapter of the route opens with the full site. For now the homepage carries the
            whole system — and the conversation starts with a consultation.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/#consult">
              Book a consultation
            </Link>
            <Link className="btn btn-ghost" href="/">
              Return to the route <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
