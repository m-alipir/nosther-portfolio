"use client";

import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import { cursorCopyStateEvent } from "@/lib/motion/pointer-events";
import styles from "./contact.module.css";

const email = "contact@nosther.site";

export function Contact({ dictionary }: { dictionary: Dictionary }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.dispatchEvent(
        new CustomEvent(cursorCopyStateEvent, { detail: { copied: true } }),
      );

      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }

      resetTimer.current = setTimeout(() => {
        setCopied(false);
        window.dispatchEvent(
          new CustomEvent(cursorCopyStateEvent, {
            detail: { copied: false },
          }),
        );
      }, 2400);
    } catch {
      setCopied(false);
      window.dispatchEvent(
        new CustomEvent(cursorCopyStateEvent, { detail: { copied: false } }),
      );
    }
  };

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
      data-motion-section="contact"
    >
      <svg className="atmosphere atmosphere--current" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#fx-current)" />
      </svg>

      <div className={"container " + styles.inner}>
        <p className="eyebrow">{dictionary.contact.eyebrow}</p>
        <h2 id="contact-title">{dictionary.contact.title}</h2>
        <p className={styles.body}>{dictionary.contact.body}</p>

        <div className={styles.emailRow}>
          <a
            className={styles.email}
            href={"mailto:" + email}
            data-magnetic
          >
            <span data-magnetic-content>{email}</span>
          </a>
          <button
            className={styles.copyButton}
            type="button"
            data-magnetic
            data-cursor-copy
            data-cursor-copy-state={copied ? "copied" : "copy"}
            onClick={copyEmail}
          >
            <span data-magnetic-content>
              {copied
                ? dictionary.contact.copied
                : dictionary.contact.copyAction}
            </span>
          </button>
          <span className={styles.liveStatus} aria-live="polite">
            {copied ? dictionary.contact.copied : ""}
          </span>
        </div>

        <div className={styles.socials} aria-label="Social links">
          <a
            href="https://www.youtube.com/@n0stheryt"
            target="_blank"
            rel="noopener noreferrer"
            data-link-interaction
          >
            YouTube <span className="external-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/m-alipir"
            target="_blank"
            rel="noopener noreferrer"
            data-link-interaction
          >
            GitHub <span className="external-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/muhammed-ali-pir-07012933a/"
            target="_blank"
            rel="noopener noreferrer"
            data-link-interaction
          >
            LinkedIn <span className="external-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
