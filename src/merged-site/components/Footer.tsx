import { NAV } from "@/lib/nav";

export default function Footer() {
  const links = NAV.flatMap((n) => (n.children ? [n, ...n.children] : [n]));
  return (
    <footer className="site-footer" id="resources">
      <div className="footer-top">
        <span>Independent education guidance · Oxford</span>
        <a href="#consult" className="footer-consult">
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-wordmark" aria-hidden="true">ALBION</div>
      <div className="footer-bottom">
        <div className="footer-identity">
          <strong>ALBION Consult</strong>
          <span>Oxford, United Kingdom</span>
        </div>
        <nav aria-label="Footer">
          {links.map((l, i) => (
            <a key={(l.href ?? l.label) + i} href={l.href ?? "/#route"}>{l.label}</a>
          ))}
        </nav>
        <div className="footer-meta">
          <span>Content in preparation where marked TBC</span>
          <span>© {new Date().getFullYear()} ALBION Consult</span>
        </div>
      </div>
    </footer>
  );
}
