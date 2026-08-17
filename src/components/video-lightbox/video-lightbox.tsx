"use client";

import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { Dictionary } from "@/content/dictionaries";
import type { Locale, Project } from "@/content/types";
import { usePrefersReducedMotion } from "@/hooks/motion/use-prefers-reduced-motion";
import styles from "./video-lightbox.module.css";

interface VideoLightboxProps {
  projects: Project[];
  activeIndex: number;
  locale: Locale;
  dictionary: Dictionary;
  onClose: () => void;
  onStep: (delta: number) => void;
}

export function VideoLightbox({
  projects,
  activeIndex,
  locale,
  dictionary,
  onClose,
  onStep,
}: VideoLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const project = projects[activeIndex];
  const hasSiblings = projects.length > 1;

  // Keyboard contract for the dialog: Escape dismisses, arrows step, Tab is
  // trapped. Focusables are re-queried per keypress rather than cached on
  // open, because the "Open on YouTube" link only exists for some projects
  // and stepping swaps it in and out underneath us.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && hasSiblings) {
        event.preventDefault();
        onStep(-1);
        return;
      }

      if (event.key === "ArrowRight" && hasSiblings) {
        event.preventDefault();
        onStep(1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      // Queried from the overlay, not the panel: the step arrows are pinned to
      // the viewport edges and so live outside the panel, and a trap that only
      // knew about the panel would let Tab walk straight out of the dialog.
      const overlay = overlayRef.current;
      if (!overlay) {
        return;
      }

      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), video[controls]",
        ),
      ).filter((element) => element.tabIndex !== -1);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasSiblings, onClose, onStep]);

  // Scroll lock, mirroring the mobile menu in site-header. Lenis is held off
  // separately by data-lenis-prevent on the overlay.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleBackdropPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Only a press that both starts and ends on the backdrop should close —
      // otherwise a drag that began on the video's scrub bar and drifted
      // outside would dismiss the dialog mid-interaction.
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!project) {
    return null;
  }

  const youtubeUrl = project.externalUrl;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      data-lenis-prevent
      onPointerDown={handleBackdropPointerDown}
    >
      {/* Pinned to the viewport edges rather than the video: the stage now
          hugs each clip's own aspect ratio, so arrows anchored to it would
          jump horizontally every time you stepped to a differently-shaped
          source. */}
      {hasSiblings ? (
        <>
          <button
            type="button"
            className={styles.prev}
            onClick={() => onStep(-1)}
            aria-label={dictionary.work.lightboxPrev}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={styles.next}
            onClick={() => onStep(1)}
            aria-label={dictionary.work.lightboxNext}
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      ) : null}

      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${dictionary.work.lightboxLabel}: ${project.title[locale]}`}
        data-orientation={project.orientation}
      >
        {/* The clip's aspect ratio is handed to CSS so the video can be
            capped by height without letterboxing: the stylesheet turns it
            into a max-width, which bounds the height proportionally instead
            of squashing a fixed-width box. */}
        <div
          className={styles.stage}
          style={
            {
              "--clip-aspect": project.posterWidth / project.posterHeight,
            } as React.CSSProperties
          }
        >
          <video
            key={project.id}
            className={styles.video}
            poster={project.posterPath}
            controls
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
          >
            {project.previewVideoSources?.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={dictionary.work.lightboxClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Side rail. Scrolls independently of the stage so a long process
            list never pushes the video out of the viewport. */}
        <div className={styles.detail}>
          <div className={styles.detailScroll}>
            <p className={styles.meta}>
              <span>{project.format[locale]}</span>
              <span aria-hidden="true">·</span>
              <span>{project.platform[locale]}</span>
              {project.year ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </>
              ) : null}
            </p>

            <p className={styles.title}>{project.title[locale]}</p>
            <p className={styles.description}>{project.description[locale]}</p>

            {project.role ? (
              <p className={styles.role}>
                <span>{dictionary.work.roleLabel}</span>
                <strong>{project.role[locale]}</strong>
              </p>
            ) : null}

            {/* Written breakdown when the project has one, otherwise the
                short contribution chips — never an empty rail. */}
            {project.breakdown ? (
              <div className={styles.breakdown}>
                <h3 className={styles.sectionLabel}>
                  {dictionary.work.lightboxProcessLabel}
                </h3>
                {project.breakdown.map((group) => (
                  <section key={group.label.en} className={styles.group}>
                    <h4 className={styles.groupLabel}>{group.label[locale]}</h4>
                    <ul className={styles.groupItems}>
                      {group.items.map((item) => (
                        <li key={item.en}>{item[locale]}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : project.contributions.length > 0 ? (
              <div className={styles.breakdown}>
                <h3 className={styles.sectionLabel}>
                  {dictionary.work.lightboxContributionsLabel}
                </h3>
                <ul className={styles.groupItems}>
                  {project.contributions.map((item) => (
                    <li key={item.en}>{item[locale]}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.tools.length > 0 ? (
              <div className={styles.tools}>
                <h3 className={styles.sectionLabel}>
                  {dictionary.work.toolsLabel}
                </h3>
                <ul className={styles.toolList}>
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.disclosure ? (
              <p className={styles.disclosure}>{project.disclosure[locale]}</p>
            ) : null}
          </div>

          <div className={styles.detailFooter}>
            {youtubeUrl ? (
              <a
                className={styles.external}
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary.work.externalAction}
                <span className="external-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : null}
            <p className={styles.counter} aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")}
              <span aria-hidden="true"> / </span>
              {String(projects.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
