"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import {
  heroSequenceMedia,
  heroSequencePreview,
  type HeroSequenceSurface,
} from "@/content/media";
import { useVideoPlaybackPolicy } from "@/hooks/media/use-video-playback-policy";
import styles from "./hero.module.css";

type StageCopy = Dictionary["hero"]["stage"];

interface FrameProps {
  alt: string;
  className: string;
  label: string;
  sizes: string;
  surface: Exclude<HeroSequenceSurface, "dominant">;
  title: string;
}

function StaticSequenceFrame({
  alt,
  className,
  label,
  sizes,
  surface,
  title,
}: FrameProps) {
  const frame = heroSequenceMedia[surface];

  return (
    <figure className={className} data-hero-frame={surface}>
      <div className={styles.frameMeta}>
        <span>{label}</span>
        <span>{frame.sourceTimecode}</span>
      </div>
      <div className={styles.frameVisual} role="img" aria-label={alt}>
        <div className={styles.frameFallback} aria-hidden="true">
          <span>{label}</span>
          <strong>{title}</strong>
        </div>
        <Image
          alt=""
          src={frame.posterPath}
          fill
          unoptimized
          loading="lazy"
          sizes={sizes}
        />
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

export function HeroSequenceStage({ copy }: { copy: StageCopy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackAllowed = useVideoPlaybackPolicy(true);
  const [isNarrowViewport, setIsNarrowViewport] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const dominant = heroSequenceMedia.dominant;
  const allowVideo = playbackAllowed && !isNarrowViewport;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsNarrowViewport(query.matches);

    updateViewport();
    query.addEventListener("change", updateViewport);
    return () => query.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video || !allowVideo || videoFailed) {
      return;
    }

    video.muted = true;

    const updatePlayback = (isVisible: boolean) => {
      if (document.hidden || !isVisible) {
        video.pause();
        setVideoPlaying(false);
        return;
      }

      void video.play().catch(() => {
        setVideoPlaying(false);
      });
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback(isVisible);
      },
      { threshold: 0.18 },
    );
    const handleVisibility = () => updatePlayback(isVisible);

    observer.observe(root);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, [allowVideo, videoFailed]);

  return (
    <div
      ref={rootRef}
      className={styles.sequenceStage}
      role="group"
      aria-label={copy.ariaLabel}
      data-hero-media
      data-video-policy={allowVideo ? "preview-enabled" : "poster-only"}
    >
      <div className={styles.sequenceHeader} aria-hidden="true">
        <span>{copy.reelLabel}</span>
        <span>SEQ / 03</span>
      </div>

      <figure className={styles.dominantFrame} data-hero-frame="dominant">
        <div className={styles.frameMeta}>
          <span>{copy.wideLabel}</span>
          <span>{dominant.sourceTimecode}</span>
        </div>
        <div
          className={styles.frameVisual}
          role="img"
          aria-label={copy.wideAlt}
        >
          <div className={styles.frameFallback} aria-hidden="true">
            <span>{copy.wideLabel}</span>
            <strong>{copy.wideTitle}</strong>
          </div>
          <Image
            alt=""
            src={dominant.posterPath}
            fill
            unoptimized
            priority
            sizes="(max-width: 767px) 94vw, (max-width: 1199px) 82vw, 64vw"
          />

          {allowVideo && !videoFailed ? (
            <video
              ref={videoRef}
              className={styles.heroVideo}
              data-playing={videoPlaying}
              src={heroSequencePreview.videoPath}
              poster={heroSequencePreview.posterPath}
              preload="metadata"
              autoPlay
              muted
              playsInline
              loop
              aria-hidden="true"
              tabIndex={-1}
              onPlaying={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              onWaiting={() => setVideoPlaying(false)}
              onStalled={() => setVideoPlaying(false)}
              onError={() => {
                setVideoPlaying(false);
                setVideoFailed(true);
              }}
            />
          ) : null}

          <span className={styles.playhead} aria-hidden="true" />
        </div>
        <figcaption>{copy.wideTitle}</figcaption>
      </figure>

      <StaticSequenceFrame
        alt={copy.cutawayAlt}
        className={styles.cutawayFrame}
        label={copy.cutawayLabel}
        sizes="(max-width: 767px) 29vw, (max-width: 1199px) 24vw, 16vw"
        surface="cutaway"
        title={copy.cutawayTitle}
      />

      <StaticSequenceFrame
        alt={copy.detailAlt}
        className={styles.detailFrame}
        label={copy.detailLabel}
        sizes="(max-width: 1199px) 28vw, 19vw"
        surface="detail"
        title={copy.detailTitle}
      />

      <div className={styles.sequenceTrack} aria-hidden="true">
        <span className={styles.trackLabel}>IN</span>
        <span className={styles.trackSegment} />
        <span className={styles.trackSegment} />
        <span className={styles.trackSegment} />
        <span className={styles.trackMarker} />
        <span className={styles.trackSegment} />
        <span className={styles.trackLabel}>OUT</span>
      </div>
    </div>
  );
}
