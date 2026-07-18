import Image from "next/image";

import type { Dictionary } from "@/content/dictionaries";
import styles from "./notez-feature.module.css";

export function NotezFeature({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section
      id="notez"
      className={styles.section}
      aria-labelledby="notez-title"
      data-motion-section="notez"
    >
      <div className={"container " + styles.layout}>
        <div className={styles.mediaStage} data-notez-media-stage>
          <span className={styles.backingPlane} data-notez-backing aria-hidden="true" />
          <div className={styles.media} data-notez-layer="media">
            <div className={styles.frameTop} data-notez-frame aria-hidden="true">
              <span />
              <span>notez-cover.png</span>
            </div>
            <div className={styles.imageWrap} data-notez-image>
              <Image
                src="/media/notez/notez-cover.png"
                alt={dictionary.notez.imageAlt}
                width={1182}
                height={734}
                loading="eager"
                sizes="(max-width: 896px) 100vw, (max-width: 1919px) 58vw, (max-width: 2559px) 64vw, 1600px"
              />
            </div>
          </div>
        </div>

        <div className={styles.copy} data-notez-layer="copy">
          <p className="eyebrow" data-notez-eyebrow>
            {dictionary.notez.eyebrow}
          </p>
          <span className={styles.status} data-notez-status>
            {dictionary.notez.status}
          </span>
          <h2 id="notez-title" data-notez-title>
            {dictionary.notez.title}
          </h2>
          <p data-notez-body>{dictionary.notez.body}</p>
          <a
            className="button button-secondary"
            href="https://github.com/m-alipir/NoteZ"
            target="_blank"
            rel="noopener noreferrer"
            data-notez-action
            data-link-interaction
          >
            {dictionary.notez.action}
            <span className="external-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
