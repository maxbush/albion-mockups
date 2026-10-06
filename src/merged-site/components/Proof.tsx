/**
 * PROOF — an honest ledger. One verified figure, everything else marked
 * TBC until it can be published in full. No invented statistics,
 * testimonials, logos or school names.
 */
export default function Proof() {
  return (
    <section id="proof" className="section proof" aria-labelledby="proof-title">
      <div className="container">
        <div className="proof-grid">
          <div className="proof-figure">
            <p className="eyebrow">Proof</p>
            <p className="num" aria-hidden="true">
              20+
            </p>
            <h2 className="section-title" id="proof-title" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}>
              years of combined experience across British and international education —
              the only number we publish today.
            </h2>
          </div>

          <div>
            <ul className="ledger">
              <li>
                <span className="what">University & school offer outcomes</span>
                <span className="status">TBC</span>
              </li>
              <li>
                <span className="what">Family testimonials</span>
                <span className="status">TBC — in conversation, on request</span>
              </li>
              <li>
                <span className="what">School & university references</span>
                <span className="status">TBC</span>
              </li>
              <li>
                <span className="what">Media & mentions</span>
                <span className="status">TBC</span>
              </li>
              <li>
                <span className="what">Combined experience of the team</span>
                <span className="status ok">20+ years — verified</span>
              </li>
            </ul>

            <div className="proof-cards">
              <figure className="quote-card">
                <blockquote className="q">“Family testimonial — in preparation.”</blockquote>
                <figcaption className="by">— Family, TBC</figcaption>
              </figure>
              <figure className="quote-card">
                <blockquote className="q">“School reference — in preparation.”</blockquote>
                <figcaption className="by">— School, TBC</figcaption>
              </figure>
            </div>

            <p className="proof-note">
              ALBION publishes figures only when they can be verified in full. Placeholder entries
              on this ledger resolve as the practice grows; until then, references are offered in
              conversation rather than on a page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
