import type { VideoSource } from "./types";

/**
 * Codec strings are declared in full so `<source type>` is answerable by
 * `canPlayType` instead of being a bare container guess. Browsers that cannot
 * decode VP9 skip the WebM entry and land on the H.264 MP4 fallback.
 *
 * Levels are declared one step above the encodes actually in `public/media`
 * (H.264 High @ 3.1–3.2, VP9 profile 0 8-bit), which every browser that can
 * decode the codec at all also supports — over-declaring is safe, and it keeps
 * the pair valid if a re-export nudges bitrate or frame rate.
 */
export const previewVideoMimeTypes = {
  webm: 'video/webm; codecs="vp09.00.31.08"',
  mp4: 'video/mp4; codecs="avc1.640020"',
} as const;

/**
 * Both encodes of a preview share one base path and differ only by extension,
 * e.g. `/media/projects/youtube-01-preview` → `.webm` + `.mp4`.
 */
export function previewVideoSources(basePath: string): VideoSource[] {
  return [
    { src: `${basePath}.webm`, type: previewVideoMimeTypes.webm },
    { src: `${basePath}.mp4`, type: previewVideoMimeTypes.mp4 },
  ];
}

export const heroReelMedia = {
  videoSources: previewVideoSources("/media/hero/hero-reel"),
  posterPath: "/media/hero/hero-reel-poster.webp",
  posterWidth: 1920,
  posterHeight: 800,
  sourceProjectId: "hero-reel",
  sourceKind: "original-production",
  /**
   * The reel itself always plays and loops in full. The glass copy card
   * (headline/CTAs) is hidden for this many seconds at the start of the
   * *first* pass only, with a countdown shown in its place — see hero.tsx's
   * `cardRevealed`/`cardLockedOpen` state. Once the card reappears at the
   * end of that first pass it stays up permanently; the cycle never repeats
   * on later loops.
   */
  copyCardWindowSeconds: 10,
  crop: "Full 1920×800 source frame; responsive object-fit crop in the hero",
} as const;
