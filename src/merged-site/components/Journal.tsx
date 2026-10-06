const INDEX = [
  { n: "01", slug: "entrance-exams-11-13-16", t: "Entrance exams 11+, 13+, 16+: what schools actually test", g: "Testing" },
  { n: "02", slug: "iseb-ukiset-cat4-cem", t: "ISEB, UKiset, CAT4, CEM — what actually differs", g: "Testing" },
  { n: "03", slug: "choosing-a-private-school", t: "How to choose a British private school", g: "Schools" },
  { n: "04", slug: "boarding-or-day", t: "Boarding or day: deciding honestly", g: "Schools" },
  { n: "05", slug: "a-level-or-ib", t: "A-Level or IB: choosing a curriculum", g: "Curriculum" },
  { n: "06", slug: "oxbridge-interview", t: "The Oxbridge interview, demystified", g: "Oxbridge" },
  { n: "07", slug: "oxford-acceptance-rates", t: "Oxford acceptance rates, read carefully", g: "Oxbridge" },
  { n: "08", slug: "ucas-personal-statement", t: "UCAS deadlines & the personal statement", g: "University" },
];

/**
 * JOURNAL — an editorial publication: one feature, one index.
 * Topics are real; contents are not invented — each entry is marked
 * as in preparation until written.
 */
export default function Journal() {
  return (
    <section id="journal" className="section journal" aria-labelledby="journal-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">The journal</p>
            <h2 className="section-title" id="journal-title">
              Notes from <em>the route.</em>
            </h2>
          </div>
          <p className="lede">
            Essays and briefings on British education, written by the consultants who do the
            work — published when they are ready, not when the calendar asks.
          </p>
        </header>

        <div className="journal-grid">
          <article className="journal-feature">
            <figure className="journal-feature-cover" aria-hidden="true">
              <div className="paper-cover">
                <span className="paper-cover-kicker">Albion · Journal · No. 01</span>
                <span className="paper-cover-rule" />
                <span className="paper-cover-title">
                  The 11+, 13+ and 16+ route: <em>what schools test</em>
                </span>
                <div className="paper-cover-foot">
                  <span>Briefing · TBC</span>
                  <span className="paper-cover-mark">Albion</span>
                </div>
              </div>
            </figure>
            <p className="kicker">Briefing · Admissions testing</p>
            <h3>The 11+, 13+ and 16+ route: what schools actually test.</h3>
            <p className="dek">
              A plain-language walk through the entry points British schools use — which tests sit
              behind each (UKiset, ISEB, CAT4, CEM), how they are structured, and what sensible
              preparation looks like for a family starting today.
            </p>
            <p className="journal-status">First run in preparation — publication date TBC.</p>
          </article>

          <div>
            <ol className="journal-index">
              {INDEX.map((row) => (
                <li key={row.n}>
                  <a href={`/journal/${row.slug}`} aria-label={`${row.t} — in preparation`}>
                    <span className="n">{row.n}</span>
                    <span className="t">{row.t}</span>
                    <span className="g">{row.g}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="journal-events" id="events">
          <span>EVENTS / ALBION</span>
          <p>Webinars & meetings · Open day <em>TBC</em></p>
        </div>
        <p className="journal-foot">Publishing schedule — TBC</p>
      </div>
    </section>
  );
}
