"use client";

import { useLayoutEffect } from "react";

import type { Locale } from "@/content/types";
import { ensureGsapRegistered } from "@/lib/motion/gsap-client";

type MotionTools = Awaited<ReturnType<typeof ensureGsapRegistered>>;

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
        const splitTitle = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          aria: "auto",
          autoSplit: true,
          onSplit: (split) =>
            gsap
              .timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                  trigger: heading,
                  start: profile.start,
                  end: profile.end,
                  scrub: profile.scrub,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                eyebrow,
                { autoAlpha: 0, y: profile.isMobile ? 9 : 14 },
                { autoAlpha: 1, duration: 0.28, y: 0 },
                0,
              )
              .fromTo(
                split.lines,
                { autoAlpha: 0, yPercent: profile.titleY },
                {
                  autoAlpha: 1,
                  duration: 0.68,
                  stagger: profile.isMobile ? 0.04 : 0.065,
                  yPercent: 0,
                },
                0.12,
              ),
        });

        rows.forEach((row) => {
          const number = row.querySelector<HTMLElement>("[data-service-number]");
          const copy = row.querySelector<HTMLElement>("[data-service-copy]");
          if (!number || !copy) {
            return;
          }

          gsap
            .timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: row,
                start: profile.start,
                end: profile.end,
                scrub: profile.scrub,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              number,
              { autoAlpha: 0, y: profile.travel * 0.65 },
              { autoAlpha: 1, duration: 0.48, y: 0 },
              0,
            )
            .fromTo(
              copy,
              { autoAlpha: 0, y: profile.travel },
              { autoAlpha: 1, duration: 0.72, y: 0 },
              0.12,
            );
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

function setupNotezMotion(root: HTMLElement, tools: MotionTools) {
  const { gsap, SplitText } = tools;
  const mediaStage = root.querySelector<HTMLElement>("[data-notez-media-stage]");
  const backing = root.querySelector<HTMLElement>("[data-notez-backing]");
  const image = root.querySelector<HTMLElement>("[data-notez-image]");
  const frame = root.querySelector<HTMLElement>("[data-notez-frame]");
  const copy = root.querySelector<HTMLElement>("[data-notez-layer='copy']");
  const eyebrow = root.querySelector<HTMLElement>("[data-notez-eyebrow]");
  const status = root.querySelector<HTMLElement>("[data-notez-status]");
  const title = root.querySelector<HTMLElement>("[data-notez-title]");
  const body = root.querySelector<HTMLElement>("[data-notez-body]");
  const action = root.querySelector<HTMLElement>("[data-notez-action]");

  if (
    !mediaStage ||
    !backing ||
    !image ||
    !frame ||
    !copy ||
    !eyebrow ||
    !status ||
    !title ||
    !body ||
    !action
  ) {
    root.dataset.notezMotion = "ready";
    return () => undefined;
  }

  let responsiveMotion: ReturnType<typeof gsap.matchMedia> | undefined;

  const context = gsap.context(() => {
    responsiveMotion = gsap.matchMedia();

    const addProfile = (
      query: string,
      profile: SectionMotionProfile,
      parallax: { copyFrom: number; copyTo: number; mediaFrom: number; mediaTo: number } | null,
    ) => {
      responsiveMotion?.add(query, () => {
        const splitTitle = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          aria: "auto",
          autoSplit: true,
          onSplit: (split) =>
            gsap
              .timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                  trigger: root,
                  start: profile.start,
                  end: profile.end,
                  scrub: profile.scrub,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                backing,
                { autoAlpha: 0, x: -8, y: 8 },
                { autoAlpha: 1, duration: 0.34, x: 0, y: 0 },
                0,
              )
              .fromTo(
                eyebrow,
                { autoAlpha: 0, y: profile.travel * 0.65 },
                { autoAlpha: 1, duration: 0.3, y: 0 },
                0.04,
              )
              .fromTo(
                split.lines,
                { autoAlpha: 0, yPercent: profile.titleY },
                { autoAlpha: 1, duration: 0.5, yPercent: 0 },
                0.16,
              )
              .fromTo(
                [status, body, action],
                { autoAlpha: 0, y: profile.travel },
                {
                  autoAlpha: 1,
                  duration: 0.48,
                  stagger: profile.isMobile ? 0.035 : 0.055,
                  y: 0,
                },
                0.36,
              )
              .fromTo(
                image,
                {
                  autoAlpha: 0,
                  clipPath: `inset(0% 0% ${profile.isMobile ? 7 : 13}% 0%)`,
                  scale: profile.isMobile ? 1.012 : 1.032,
                  y: profile.travel,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.62,
                  scale: 1,
                  y: 0,
                },
                0.48,
              )
              .fromTo(
                frame,
                { autoAlpha: 0, y: 7 },
                { autoAlpha: 1, duration: 0.34, y: 0 },
                0.66,
              ),
        });

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
            .fromTo(
              mediaStage,
              { y: parallax.mediaFrom },
              { y: parallax.mediaTo },
              0,
            )
            .fromTo(
              copy,
              { y: parallax.copyFrom },
              { y: parallax.copyTo },
              0,
            );
        }

        root.dataset.notezMotion = "running";

        return () => splitTitle.revert();
      });
    };

    addProfile("(min-width: 1200px)", desktopProfile, {
      copyFrom: 4,
      copyTo: -8,
      mediaFrom: -12,
      mediaTo: 24,
    });
    addProfile(
      "(min-width: 768px) and (max-width: 1199px)",
      tabletProfile,
      { copyFrom: 2, copyTo: -4, mediaFrom: -5, mediaTo: 10 },
    );
    addProfile("(max-width: 767px)", mobileProfile, null);
  }, root);

  return () => {
    responsiveMotion?.revert();
    context.revert();
    root.dataset.notezMotion = "ready";
  };
}

function setupAboutMotion(root: HTMLElement, tools: MotionTools) {
  const { gsap, SplitText } = tools;
  const mediaStage = root.querySelector<HTMLElement>("[data-about-media-stage]");
  const media = root.querySelector<HTMLElement>("[data-about-media]");
  const copy = root.querySelector<HTMLElement>("[data-about-copy]");
  const eyebrow = root.querySelector<HTMLElement>("[data-about-eyebrow]");
  const title = root.querySelector<HTMLElement>("[data-about-title]");
  const body = root.querySelector<HTMLElement>("[data-about-body]");
  const action = root.querySelector<HTMLElement>("[data-about-action]");

  if (!mediaStage || !media || !copy || !eyebrow || !title || !body || !action) {
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
        const splitTitle = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          aria: "auto",
          autoSplit: true,
          onSplit: (split) =>
            gsap
              .timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                  trigger: root,
                  start: profile.start,
                  end: profile.end,
                  scrub: profile.scrub,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                eyebrow,
                { autoAlpha: 0, y: profile.travel * 0.65 },
                { autoAlpha: 1, duration: 0.28, y: 0 },
                0,
              )
              .fromTo(
                split.lines,
                { autoAlpha: 0, yPercent: profile.titleY },
                {
                  autoAlpha: 1,
                  duration: 0.62,
                  stagger: profile.isMobile ? 0.04 : 0.06,
                  yPercent: 0,
                },
                0.12,
              )
              .fromTo(
                body,
                { autoAlpha: 0, y: profile.travel },
                { autoAlpha: 1, duration: 0.48, y: 0 },
                0.42,
              )
              .fromTo(
                action,
                { autoAlpha: 0, y: profile.travel * 0.7 },
                { autoAlpha: 1, duration: 0.38, y: 0 },
                0.55,
              )
              .fromTo(
                media,
                {
                  autoAlpha: 0,
                  clipPath: `inset(0% 0% ${profile.isMobile ? 6 : 10}% 0%)`,
                  scale: profile.isMobile ? 1.01 : 1.024,
                  y: profile.isMobile ? 12 : 22,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.62,
                  scale: 1,
                  y: 0,
                },
                profile.isMobile ? 0.5 : 0.62,
              ),
        });

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

        return () => splitTitle.revert();
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
    const notezRoot = document.querySelector<HTMLElement>(
      "[data-motion-section='notez']",
    );
    const aboutRoot = document.querySelector<HTMLElement>(
      "[data-motion-section='about']",
    );
    if (!servicesRoot || !notezRoot || !aboutRoot) {
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
      notezRoot.dataset.notezMotion = "ready";
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
      notezRoot.dataset.notezMotion = "preparing";
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
            disposers.push(setupNotezMotion(notezRoot, tools));
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
