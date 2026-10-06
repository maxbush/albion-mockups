"use client";

import Image from "next/image";
import { useEffect } from "react";

type Chapter = {
  index: string;
  label: string;
  title: string;
  titleEm: string;
  body: string;
  topics: string;
  note: string;
  img: string;
  alt: string;
  href: string;
};

const CHAPTERS: Chapter[] = [
  {
    index: "01",
    label: "SCHOOLS",
    title: "Finding the",
    titleEm: "right school",
    body: "Day or boarding, England or nowhere yet — we begin with the child, not the ranking. A profile built in conversation, a shortlist built in honesty, and visits arranged where it matters.",
    topics: "Day & boarding  /  Ages 7–18  /  School visits  /  Shortlisting",
    note: "BEGIN WITH THE CHILD",
    img: "/images/journey-schools.jpg",
    alt: "Watercolour of a light English school facade among trees",
    href: "/private-schools",
  },
  {
    index: "02",
    label: "ENTRANCE EXAMS",
    title: "Preparing for",
    titleEm: "the exams",
    body: "The 11+, 13+ and 16+ entry points, UKiset, ISEB Common Pre-Test, CAT4, interviews, timelines — prepared for calmly and in the right order, without turning a childhood into a project.",
    topics: "11+ / 13+ / 16+  /  UKiset / ISEB / CAT4  /  Interviews",
    note: "CALMLY, IN THE RIGHT ORDER",
    img: "/images/journey-preparation.jpg",
    alt: "Watercolour still life with an open notebook, books and soft light by a window",
    href: "/admissions/entrance-exams",
  },
  {
    index: "03",
    label: "FOUNDATIONS",
    title: "Building academic",
    titleEm: "foundations",
    body: "GCSE, A-Level or IB; tutors where they matter, home education when the route requires it, intensive courses when the calendar tightens. Foundations laid properly, term by term.",
    topics: "GCSE  /  A-Level  /  IB  /  Tutors  /  Home education",
    note: "TERM BY TERM, PROPERLY",
    img: "/img/route-study.jpg",
    alt: "Watercolour of a desk set for study in early light",
    href: "/tuition",
  },
  {
    index: "04",
    label: "UNIVERSITY",
    title: "Choosing the right",
    titleEm: "university",
    body: "UK, Europe or the United States; Oxbridge where the ambition is real and the preparation is honest. One strategy across systems — not a single application season.",
    topics: "UK / Europe / USA  /  Oxbridge  /  UCAS  /  Personal statement",
    note: "ONE PLAN ACROSS SYSTEMS",
    img: "/images/journey-university.jpg",
    alt: "Watercolour gallery of an Oxford college looking onto a lit garden",
    href: "/universities",
  },
];

/**
 * THE ROUTE — site-01 journey-card design (paper sheets, topics row,
 * last card = dark CTA) carrying the five route stages. Each card links
 * to its SILO pillar page.
 */
export default function RouteSection() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".journey-card");
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle("is-in-view", entry.isIntersecting);
      }),
      { threshold: 0.26 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="journey" id="route" aria-labelledby="route-heading">
      <div className="section-shell journey-intro">
        <div className="section-index"><span>02 / THE EDUCATIONAL ROUTE</span><span className="index-rule" /></div>
        <div className="journey-intro-grid">
          <h2 id="route-heading">Five stages.<br /><em>One continuous conversation.</em></h2>
          <p>
            ALBION accompanies a family through the whole route into British education. Each stage is
            a plan we make together — none of them a transaction.
          </p>
        </div>
        <span className="journey-scroll-note">SCROLL TO FOLLOW THE ROUTE <span aria-hidden="true">↓</span></span>
      </div>

      <div className="section-shell journey-stack">
        {CHAPTERS.map((ch, i) => (
          <article
            className={`journey-card journey-card-${i + 1}`}
            key={ch.index}
            style={{ "--card-index": i } as React.CSSProperties}
          >
            <div className="journey-card-paper">
              <div className="journey-card-top"><span>ALBION / THE ROUTE</span><span>{ch.index} — 05</span></div>
              <div className="journey-card-body">
                <div className="journey-card-copy">
                  <span className="journey-chapter">{ch.index} <span className="journey-chapter-dash">/</span> {ch.label}</span>
                  <h3>{ch.title}<br /><em>{ch.titleEm}</em></h3>
                  <p>{ch.body}</p>
                  <a className="inline-link journey-open" href={ch.href}>
                    Explore this stage <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <a className="journey-card-image" href={ch.href} aria-label={`${ch.label} — ${ch.title} ${ch.titleEm}`} tabIndex={-1}>
                  <Image src={ch.img} alt={ch.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  <span className="image-corner" aria-hidden="true" />
                </a>
              </div>
              <div className="journey-card-bottom"><span>{ch.topics}</span><span>{ch.note}</span></div>
            </div>
          </article>
        ))}

        <article className="journey-card journey-card-last" style={{ "--card-index": 4 } as React.CSSProperties}>
          <div className="journey-card-paper">
            <div className="journey-card-top"><span>ALBION / THE ROUTE</span><span>05 — 05</span></div>
            <div className="journey-last-layout">
              <div className="journey-card-copy">
                <span className="journey-chapter">05 <span className="journey-chapter-dash">/</span> WHAT COMES NEXT</span>
                <h3>Preparing for<br /><em>the next step.</em></h3>
                <p>
                  Personal statements, LNAT, TMUA, UCAT, guardianship, career direction — and after
                  that, master&apos;s, MBA under executive education, or doctoral routes. The
                  conversation does not end at the offer.
                </p>
                <a className="inline-link light-link" href="/albion-mockups/green/executive-education/">
                  Discuss the next step <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="journey-line-art" aria-hidden="true">
                <svg viewBox="0 0 520 390" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-35 373C62 337 35 220 157 231C264 241 226 77 348 102C431 119 434 16 548-15" stroke="currentColor" strokeWidth="1" />
                  <path d="M-35 389C83 329 38 242 164 251C274 258 246 103 355 121C448 137 453 29 548 5" stroke="currentColor" strokeWidth="1" opacity=".35" />
                  <circle cx="157" cy="231" r="6" fill="currentColor" />
                  <circle cx="348" cy="102" r="26" stroke="currentColor" strokeWidth="1" />
                  <circle cx="348" cy="102" r="3" fill="currentColor" />
                </svg>
                <span>THERE IS NO SINGLE DESTINATION</span>
              </div>
            </div>
            <div className="journey-card-bottom"><span>Executive education · MBA  /  Master&apos;s  /  PhD  /  Careers</span><span>THE NEXT CHAPTER</span></div>
          </div>
        </article>
      </div>
    </section>
  );
}
