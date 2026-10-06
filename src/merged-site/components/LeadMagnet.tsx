"use client";

import { useState } from "react";

const GUIDES = [
  "A parent's guide to British schools",
  "Entrance exams 11+/13+/16+ in 90 days",
  "The admissions interview, decoded",
];

/**
 * LEAD MAGNET — the resources funnel entry. Email capture for the parent
 * guide; two more guides listed as companions.
 */
export default function LeadMagnet() {
  const [sent, setSent] = useState(false);

  return (
    <section id="guides" className="leadmagnet" aria-labelledby="leadmagnet-title">
      <div className="container leadmagnet-grid">
        <figure className="leadmagnet-visual" aria-hidden="true">
          <div className="paper-cover">
            <span className="paper-cover-kicker">Albion · Guides · Vol. I</span>
            <span className="paper-cover-rule" />
            <span className="paper-cover-title">
              A parent&apos;s guide to <em>British schools</em>
            </span>
            <div className="paper-cover-foot">
              <span>PDF · free</span>
              <span className="paper-cover-mark">Albion</span>
            </div>
          </div>
        </figure>
        <div className="leadmagnet-copy">
          <p className="eyebrow">Guides · free PDF</p>
          <h2 className="section-title" id="leadmagnet-title">
            Start with the <em>parent&apos;s guide.</em>
          </h2>
          <p className="lede">
            A calm, honest walk through the British system — schools, exams, timelines — written by
            the consultants who do the work. No jargon, no sales funnel inside.
          </p>
          <ul className="leadmagnet-list" aria-label="Available guides">
            {GUIDES.map((g, i) => (
              <li key={g}>
                <span className="lm-n">0{i + 1}</span>
                {g}
                {i === 0 && <span className="lm-tag">this one</span>}
              </li>
            ))}
          </ul>
          {sent ? (
            <p className="leadmagnet-done" role="status">
              Thank you — the guide is on its way to your inbox.
            </p>
          ) : (
            <form
              className="leadmagnet-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label htmlFor="lm-email" className="sr-only">Email address</label>
              <input id="lm-email" type="email" required placeholder="Your email" autoComplete="email" />
              <button className="btn" type="submit">Send me the guide</button>
            </form>
          )}
          <p className="leadmagnet-note">One email with the PDF. No sequence, no pressure.</p>
        </div>
      </div>
    </section>
  );
}
