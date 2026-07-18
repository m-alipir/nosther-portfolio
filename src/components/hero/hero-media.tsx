"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import { heroMedia } from "@/content/media";
import { useVideoPlaybackPolicy } from "@/hooks/media/use-video-playback-policy";
import styles from "./hero.module.css";

export function HeroMedia({ copy }: { copy: Dictionary["hero"] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const allowVideo = useVideoPlaybackPolicy();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const showFallback = videoFailed || posterFailed;

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
      { threshold: 0.15 },
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
      className={styles.media}
      role="img"
      aria-label={copy.mediaDescription}
      data-hero-media
      data-video-fallback={showFallback}
    >
      <div className={styles.mediaFallback} aria-hidden={showFallback ? undefined : true}>
        <div className={styles.mediaTopline}>
          <span>{copy.mediaLabel}</span>
          <span>00:00:00</span>
        </div>
        <div className={styles.mediaCenter}>
          <span className={styles.playMark} aria-hidden="true">
            ▶
          </span>
          <strong>{copy.mediaTitle}</strong>
          <p>{copy.mediaDescription}</p>
        </div>
        <div className={styles.timeline} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {!showFallback ? (
        <Image
          className={styles.mediaPoster}
          alt=""
          src={heroMedia.posterPath}
          fill
          loading="eager"
          sizes="(max-width: 1200px) 100vw, 50vw"
          onError={() => setPosterFailed(true)}
        />
      ) : null}

      {allowVideo && !videoFailed ? (
        <video
          ref={videoRef}
          className={styles.heroVideo}
          data-playing={videoPlaying}
          src={heroMedia.videoPath}
          poster={heroMedia.posterPath}
          preload="metadata"
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          onError={() => {
            setVideoPlaying(false);
            setVideoFailed(true);
          }}
        />
      ) : null}
    </div>
  );
}
