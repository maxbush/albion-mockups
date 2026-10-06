const STATS = [
  { n: "20+", cap: "years of experience" },
  { n: "240+", cap: "offers received" },
  { n: "180+", cap: "families guided" },
];

/**
 * TRUST BAR — one quiet line after the hero: Google rating + key figures.
 * Values are placeholders pending the client's verified numbers.
 */
export default function TrustBar() {
  return (
    <section className="trust" aria-label="Trust and results">
      <div className="container trust-inner">
        <div className="trust-rating">
          <span className="trust-stars" aria-hidden="true">★★★★★</span>
          <span className="trust-rating-txt"><b>5.0</b> on Google</span>
        </div>
        <div className="trust-divider" aria-hidden="true" />
        <ul className="trust-stats">
          {STATS.map((s) => (
            <li key={s.cap}>
              <b>{s.n}</b> {s.cap}
            </li>
          ))}
        </ul>
        <p className="trust-note">figures in preparation</p>
      </div>
    </section>
  );
}
