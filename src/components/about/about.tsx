import Image from "next/image";

import type { Dictionary } from "@/content/dictionaries";
import styles from "./about.module.css";

export function About({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
      data-motion-section="about"
    >
      <div className={"container " + styles.layout}>
        <div className={styles.mediaStage} data-about-media-stage>
          <div
            className={styles.media}
            role="img"
            aria-label={dictionary.about.mediaLabel}
            data-about-media
          >
            <span className={styles.initials}>A</span>
            <span className={styles.mediaLabel}>{dictionary.about.mediaLabel}</span>
            <Image
              className={styles.avatar}
              src="/media/portrait/Logo.png"
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 896px) min(100vw, 384px), (max-width: 1919px) 34vw, 480px"
            />
          </div>
        </div>

        <div className={styles.copy} data-about-copy>
          <p className="eyebrow" data-about-eyebrow>
            {dictionary.about.eyebrow}
          </p>
          <h2 id="about-title" className="section-title" data-about-title>
            {dictionary.about.title}
          </h2>
          <p data-about-body>{dictionary.about.body}</p>
          <a
            className="button button-secondary"
            href="https://www.youtube.com/@n0stheryt"
            target="_blank"
            rel="noopener noreferrer"
            data-about-action
            data-link-interaction
          >
            {dictionary.about.action}
            <span className="external-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
