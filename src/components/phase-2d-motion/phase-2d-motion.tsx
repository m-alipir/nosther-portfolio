"use client";

import { useLayoutEffect } from "react";

import type { Locale } from "@/content/types";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";
import { lineWidthStagger } from "@/lib/motion/line-stagger";

type MotionTools = Awaited<ReturnType<typeof ensureGsapRegistered>>;
type RevealTimeline = ReturnType<MotionTools["gsap"]["timeline"]>;

/**
 * SplitText's `autoSplit` rebuilds the timeline whenever it re-splits — on
 * font load, on resize, and after lazy media shifts the layout. A fresh
 * `fromTo` re-applies its hidden start state, so copy the reader has already
 * seen snaps away and replays. Once a reveal has finished, later rebuilds are
 * parked at the end instead.
 */
function keepRevealed(
  timeline: RevealTimeline,
  state: { done: boolean },
): RevealTimeline {
  timeline.eventCallback("onComplete", () => {
    state.done = true;
  });

  if (state.done) {
    timeline.progress(1);
  }

  return timeline;
}

interface SectionMotionProfile {
  end: string;
  isMobile: boolean;
  scrub: number;
  start: string;
  titleY: number;
  travel: number;
}

const desktopProfile: SectionMotionProfile = {
  end: "top 50%",
  isMobile: false,
  scrub: 0.72,
  start: "top 84%",
  titleY: 102,
  travel: 20,
};

const tabletProfile: SectionMotionProfile = {
  end: "top 56%",
  isMobile: false,
  scrub: 0.58,
  start: "top 85%",
  titleY: 86,
  travel: 16,
};

const mobileProfile: SectionMotionProfile = {
  end: "top 60%",
  isMobile: true,
  scrub: 0.44,
  start: "top 85%",
  titleY: 66,
  travel: 12,
};

function setupServicesMotion(root: HTMLElement, tools: MotionTools) {
  const { gsap, ScrollTrigger, SplitText } = tools;
  const heading = root.querySelector<HTMLElement>("[data-services-heading]");
  const eyebrow = root.querySelector<HTMLElement>("[data-services-eyebrow]");
  const title = root.querySelector<HTMLElement>("[data-services-title]");
  const rows = Array.from(
    root.querySelectorAll<HTMLElement>("[data-service-row]"),
  );

  if (!heading || !eyebrow || !title || rows.length === 0) {
    root.dataset.servicesMotion = "ready";
    return () => undefined;
  }

  let responsiveMotion: ReturnType<typeof gsap.matchMedia> | undefined;

  const context = gsap.context(() => {
    responsiveMotion = gsap.matchMedia();

    const addProfile = (
      query: string,
      profile: SectionMotionProfile,
      useActiveState: boolean,
    ) => {
      responsiveMotion?.add(query, () => {
        const revealState = { done: false };
        const splitTitle = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          aria: "auto",
          autoSplit: true,
          // A staggered fromTo only renders the first target's start state
          // immediately, so the rest stayed visible until the timeline ran.
          // Start states are therefore set explicitly.
          onSplit: (split) => {
            gsap.set(split.lines, { autoAlpha: 0, yPercent: profile.titleY });
            return keepRevealed(
              gsap
                .timeline({
                  defaults: { ease: "power2.out", immediateRender: true },
                  scrollTrigger: {
                    trigger: heading,
                    start: profile.start,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                  },
                })
                .fromTo(
                  eyebrow,
                  { autoAlpha: 0, y: profile.isMobile ? 9 : 14 },
                  { autoAlpha: 1, duration: 0.28, y: 0 },
                  0,
                )
                .to(
                  split.lines,
                  {
                    autoAlpha: 1,
                    duration: 0.68,
                    stagger: lineWidthStagger(profile.isMobile ? 0.04 : 0.065),
                    yPercent: 0,
                  },
                  0.12,
                ),
              revealState,
            );
          },
        });

        // Rows used to fade in as one block. They now read left to right:
        // the index slides in from the margin, the service name rises line by
        // line out of its own mask, and the description follows last.
        const rowSplits: Array<ReturnType<typeof SplitText.create>> = [];

        rows.forEach((row) => {
          const number = row.querySelector<HTMLElement>(
            "[data-service-number]",
          );
          const copy = row.querySelector<HTMLElement>("[data-service-copy]");
          if (!number || !copy) {
            return;
          }

          const rowTitle = copy.querySelector<HTMLElement>("h3");
          const rowBody = copy.querySelector<HTMLElement>("p");
          const rowSplit = rowTitle
            ? SplitText.create(rowTitle, {
                type: "lines",
                mask: "lines",
                aria: "auto",
              })
            : undefined;

          if (rowSplit) {
            rowSplits.push(rowSplit);
          }

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out", immediateRender: true },
            scrollTrigger: {
              trigger: row,
              start: profile.start,
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          });

          timeline.fromTo(
            number,
            { autoAlpha: 0, x: profile.isMobile ? -10 : -22 },
            { autoAlpha: 1, duration: 0.52, x: 0 },
            0,
          );

          if (rowSplit) {
            gsap.set(rowSplit.lines, { yPercent: 108 });
            timeline.to(
              rowSplit.lines,
              {
                duration: profile.isMobile ? 0.58 : 0.72,
                stagger: lineWidthStagger(profile.isMobile ? 0.05 : 0.075),
                yPercent: 0,
              },
              0.08,
            );
          }

          if (rowBody) {
            timeline.fromTo(
              rowBody,
              { autoAlpha: 0, y: profile.travel * 0.8 },
              { autoAlpha: 1, duration: 0.52, y: 0 },
              rowSplit ? 0.3 : 0.12,
            );
          }
        });

        if (useActiveState) {
          const activateRow = (activeRow: HTMLElement) => {
            rows.forEach((row) => {
              if (row === activeRow) {
                row.dataset.serviceActive = "true";
              } else {
                row.removeAttribute("data-service-active");
              }
            });
          };

          const viewportAnchor = window.innerHeight * 0.48;
          const initialRow =
            [...rows]
              .reverse()
              .find(
                (row) => row.getBoundingClientRect().top < viewportAnchor,
              ) ?? rows[0];
          activateRow(initialRow);

          rows.forEach((row, index) => {
            ScrollTrigger.create({
              trigger: row,
              start: "top 48%",
              onEnter: () => activateRow(row),
              onLeaveBack: () => activateRow(rows[Math.max(0, index - 1)]),
            });
          });
        }

        root.dataset.servicesMotion = "running";

        return () => {
          splitTitle.revert();
          rowSplits.forEach((split) => split.revert());
          rows.forEach((row) => {
            row.removeAttribute("data-service-active");
          });
        };
      });
    };

    addProfile("(min-width: 1200px)", desktopProfile, true);
    addProfile(
      "(min-width: 768px) and (max-width: 1199px)",
      tabletProfile,
      false,
    );
    addProfile("(max-width: 767px)", mobileProfile, false);
  }, root);

  return () => {
    responsiveMotion?.revert();
    context.revert();
    rows.forEach((row) => {
      row.removeAttribute("data-service-active");
    });
    root.dataset.servicesMotion = "ready";
  };
}

function setupAboutMotion(root: HTMLElement, tools: MotionTools) {
  const { gsap } = tools;
  const mediaStage = root.querySelector<HTMLElement>(
    "[data-about-media-stage]",
  );
  const media = root.querySelector<HTMLElement>("[data-about-media]");
  const copy = root.querySelector<HTMLElement>("[data-about-copy]");
  const eyebrow = root.querySelector<HTMLElement>("[data-about-eyebrow]");
  const title = root.querySelector<HTMLElement>("[data-about-title]");
  const body = root.querySelector<HTMLElement>("[data-about-body]");
  const action = root.querySelector<HTMLElement>("[data-about-action]");

  if (
    !mediaStage ||
    !media ||
    !copy ||
    !eyebrow ||
    !title ||
    !body ||
    !action
  ) {
    root.dataset.aboutMotion = "ready";
    return () => undefined;
  }

  let responsiveMotion: ReturnType<typeof gsap.matchMedia> | undefined;

  const context = gsap.context(() => {
    responsiveMotion = gsap.matchMedia();

    const addProfile = (
      query: string,
      profile: SectionMotionProfile,
      parallax: boolean,
    ) => {
      responsiveMotion?.add(query, () => {
        // The identity mark and the copy beside it are deliberately not
        // revealed on scroll: this section is the calm one, and a logo that
        // animates itself in reads as a widget rather than an object. Only the
        // gentle parallax remains.
        if (parallax) {
          gsap
            .timeline({
              defaults: { duration: 1, ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: profile.scrub,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(mediaStage, { y: -10 }, { y: 24 }, 0)
            .fromTo(copy, { y: 4 }, { y: -8 }, 0);
        }

        root.dataset.aboutMotion = "running";

        return () => undefined;
      });
    };

    addProfile("(min-width: 1200px)", desktopProfile, true);
    addProfile(
      "(min-width: 768px) and (max-width: 1199px)",
      tabletProfile,
      false,
    );
    addProfile("(max-width: 767px)", mobileProfile, false);
  }, root);

  return () => {
    responsiveMotion?.revert();
    context.revert();
    root.dataset.aboutMotion = "ready";
  };
}

export function Phase2DMotion({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const servicesRoot = document.querySelector<HTMLElement>(
      "[data-motion-section='services']",
    );
    const aboutRoot = document.querySelector<HTMLElement>(
      "[data-motion-section='about']",
    );
    if (!servicesRoot || !aboutRoot) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let cancelled = false;
    let setupGeneration = 0;
    let disposeAnimations: (() => void) | undefined;

    const markReady = () => {
      servicesRoot.dataset.servicesMotion = "ready";
      aboutRoot.dataset.aboutMotion = "ready";
    };

    const clearAnimations = () => {
      disposeAnimations?.();
      disposeAnimations = undefined;
      markReady();
    };

    const setupAnimations = () => {
      const currentGeneration = ++setupGeneration;
      clearAnimations();

      if (reducedMotionQuery.matches) {
        return;
      }

      servicesRoot.dataset.servicesMotion = "preparing";
      aboutRoot.dataset.aboutMotion = "preparing";

      void Promise.all([ensureGsapRegistered(), document.fonts.ready])
        .then(([tools]) => {
          if (
            cancelled ||
            currentGeneration !== setupGeneration ||
            reducedMotionQuery.matches
          ) {
            markReady();
            return;
          }

          const disposers: Array<() => void> = [];

          try {
            disposers.push(setupServicesMotion(servicesRoot, tools));
            disposers.push(setupAboutMotion(aboutRoot, tools));
            tools.ScrollTrigger.refresh();
            disposeAnimations = () => {
              [...disposers].reverse().forEach((dispose) => dispose());
            };
          } catch {
            [...disposers].reverse().forEach((dispose) => dispose());
            markReady();
          }
        })
        .catch(() => {
          markReady();
        });
    };

    setupAnimations();
    reducedMotionQuery.addEventListener("change", setupAnimations);

    return () => {
      cancelled = true;
      reducedMotionQuery.removeEventListener("change", setupAnimations);
      clearAnimations();
    };
  }, [locale]);

  return null;
}
