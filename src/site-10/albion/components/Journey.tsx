import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Dictionary } from '@/dictionaries/en';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';
import styles from './Journey.module.css';

/* Art direction: four watercolours cover five stages; the quad returns
   in a different crop for the final stage (see README). */
const ART = [
  { src: '/images/hero-arch.jpg', pos: '50% 42%' },
  { src: '/images/hero-court.jpg', pos: '50% 62%' },
  { src: '/images/library.jpg', pos: '50% 50%' },
  { src: '/images/cherwell.jpg', pos: '50% 55%' },
  { src: '/images/hero-court.jpg', pos: '50% 18%' },
] as const;

export default function Journey({ dict }: { dict: Dictionary['journey'] }) {
  const total = dict.steps.length;

  return (
    <section
      id="route"
      aria-labelledby="route-title"
      className={`section ${styles.journey}`}
    >
      <div className="container">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 id="route-title" className={`display ${styles.title}`}>
            {dict.title}
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className={styles.intro}>{dict.intro}</p>
        </Reveal>
      </div>

      <div className={`container ${styles.stack}`}>
        {dict.steps.map((step, i) => (
          <article
            key={step.title}
            aria-label={`${dict.stageLabel} ${i + 1} ${dict.ofLabel} ${total}: ${step.title}`}
            className={styles.card}
            style={{ '--i': i } as CSSProperties}
          >
            <div className={styles.cardInner}>
              <span aria-hidden="true" className={styles.ghost}>
                0{i + 1}
              </span>
              <div>
                <p className={styles.stage}>
                  {dict.stageLabel} <b>0{i + 1}</b> / 0{total}
                </p>
                <h3 className={`display ${styles.cardTitle}`}>{step.title}</h3>
                <p className={styles.cardMeta}>{step.meta}</p>
                <p className={styles.cardDesc}>{step.text}</p>
              </div>
              <figure className={styles.cardFig}>
                <Image
                  src={ART[i].src}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectPosition: ART[i].pos }}
                />
              </figure>
            </div>
          </article>
        ))}
      </div>

      <div className="container">
        <Reveal>
          <div className={styles.through}>
            <p>{dict.throughline}</p>
            <MagneticButton href="#index" variant="ghost">
              {dict.throughlineCta}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
