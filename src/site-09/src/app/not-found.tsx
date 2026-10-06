import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-ink px-[var(--gutter)] pt-[calc(var(--header-h)+32px)] pb-20">
      <div className="max-w-[680px] text-center">
        <p className="label">Page not found</p>
        <h1 className="mt-8 font-display text-[clamp(2.4rem,1.4rem+4vw,5rem)] leading-[1] font-light">
          This footpath <em>does not lead to the quad</em>
        </h1>
        <p className="mt-6 text-[17px] leading-[1.7] text-cream/75">
          The page may have moved. Head back to the homepage — the route begins there.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-brass">
            Back to the homepage
          </Link>
          <Link href="/consultation" className="btn btn-ghost">
            Book a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
