import Image from "next/image";

/**
 * CONSULTATION — a calm close. The skyline returns as a horizon,
 * not a repeat of the hero.
 */
export default function Consult() {
  return (
    <section id="consult" className="section consult on-dark" aria-labelledby="consult-title">
      <div className="consult-sky" aria-hidden="true">
        <Image
          src="/img/route-spires.webp"
          alt=""
          width={1500}
          height={844}
          sizes="(max-width: 1500px) 130vw, 1500px"
          quality={80}
        />
      </div>
      <div className="container">
        <div className="consult-inner">
          <div>
            <p className="eyebrow">Consultation</p>
            <h2 id="consult-title">
              Let’s find
              <br />
              the <em>right route.</em>
            </h2>
            <p className="lede">
              A first conversation is unhurried and confidential: your child, your plans, and the
              routes worth considering — and those that are not.
            </p>
            <div className="cta-row">
              <a className="btn" href="mailto:consult@albionconsult.co.uk">
                Book a consultation
              </a>
              <a className="btn btn-ghost" href="#journal">
                Read the journal first <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <aside className="consult-aside">
            <div className="row">
              <span className="k">Office</span>
              Oxford · United Kingdom
            </div>
            <div className="row">
              <span className="k">Email</span>
              consult@albionconsult.co.uk
            </div>
            <div className="row">
              <span className="k">Telephone</span>
              TBC
            </div>
            <div>
              <span className="k">First conversation</span>
              Unhurried, confidential, without obligation.
            </div>
          </aside>
        </div>

        <form className="consult-form" aria-label="Write to us" method="post" action="#">
          <p className="consult-form-title">
            Or leave a message — we reply within one working day.
          </p>
          <div className="cf-grid">
            <label>
              <span className="cf-k">Name</span>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" />
            </label>
            <label>
              <span className="cf-k">Email or WhatsApp</span>
              <input type="text" name="contact" placeholder="How to reach you" autoComplete="email" />
            </label>
            <label className="cf-msg">
              <span className="cf-k">Message</span>
              <textarea rows={2} placeholder="A few words about your child and your plans" />
            </label>
          </div>
          <div className="cf-foot">
            <p className="cf-note">Confidential by default.</p>
            <button className="cf-send" type="submit">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
}
