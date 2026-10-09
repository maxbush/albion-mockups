import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getStages, stageLinks } from "@/lib/site";
import RouteProgress from "./RouteProgress";
import styles from "./Route.module.css";

export default function RouteSection({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).route;
  const stages = getStages(lang);
  return (
    <section id="route" className={styles.section} aria-labelledby="route-title">
      <div className="container-x">
        <div className={styles.head} data-reveal>
          <p className="label">{t.label}</p>
          <h2 id="route-title" className={styles.title}>
            {t.title} <em>{t.titleEm}</em>
          </h2>
          <p className={styles.intro}>{t.intro}</p>
        </div>

        <div id="route-track" className={styles.track}>
          <div className={styles.rail} data-rail="" aria-hidden="true">
            <div className={styles.railFill} data-rail-fill="" />
          </div>

          <ol>
            {stages.map((stage) => (
              <li key={stage.id} id={`stage-${stage.id}`} className={styles.station} data-stop="" data-lit="false">
                <p className={styles.numeral} aria-hidden="true">
                  {stage.numeral}
                </p>
                <div className={styles.marker} aria-hidden="true">
                  <span className={styles.dot} data-dot="" />
                </div>
                <div className={styles.body}>
                  <p className={styles.kicker}>
                    {t.stagePrefix} {stage.numeral}
                  </p>
                  <h3 className={styles.stationTitle}>{stage.title}</h3>
                  <p className={styles.short}>{stage.short}</p>
                  <p className={styles.text}>{stage.text}</p>
                  <ul className={styles.links} aria-label={t.linksAria.replace("{title}", stage.title)}>
                    {stageLinks(lang, stage.id).map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={styles.link}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.coda} data-stop="" data-lit="false">
            <div className={styles.marker} aria-hidden="true">
              <span className={`${styles.dot} ${styles.diamond}`} data-dot="" />
            </div>
            <div className={styles.body}>
              <p className={styles.codaText}>{t.coda}</p>
              <a href="#consultation" className="btn btn-brass">
                {t.codaCta}
              </a>
            </div>
          </div>
        </div>
      </div>
      <RouteProgress trackId="route-track" />
    </section>
  );
}
