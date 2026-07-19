# Phase 3 hero media source map

All Phase 3 hero imagery is derived from self-produced N0STHER project previews already present in the repository. Automotive third-party footage is excluded.

| Surface | Derived production asset | Size | Exact source | Frame and crop | Loading / playback |
| --- | --- | ---: | --- | --- | --- |
| Dominant wide | `public/media/hero/beamng-performance-wide.webp` | 71,726 B; 1280×720 | `public/media/projects/youtube-01-preview.mp4`; project `youtube-w0ZkuiOucCo` | 5.3s / `00:00:05:07`; full 1280×720 frame showing the Vulkan/DX11 comparison | Priority image; direct optimized WebP; sole video-eligible surface using the original 1,876,247 B preview with metadata preload |
| Portrait cutaway | `public/media/hero/assetto-setup-cutaway.webp` | 19,020 B; 480×720 | `public/media/projects/youtube-02-preview.mp4`; project `youtube-q47Fa_4U9Q0` | 13.7s / `00:00:13:17`; 480×720 crop at x=400, y=0 from the 1280×720 frame | Lazy static image only; explicitly labeled cutaway/in-game verification, never presented as a vertical project |
| Detail insert | `public/media/hero/beamng-cargo-detail.webp` | 43,434 B; 800×600 | `public/media/projects/youtube-04-preview.mp4`; project `youtube-dnbg1JSiAQQ` | 8.7s / `00:00:08:17`; 960×720 crop at x=160, y=0 reduced to 800×600 | Lazy static image only; omitted visually below 768px |

## Derivation

Frames were extracted locally with FFmpeg and encoded once as WebP at controlled quality. The dominant source remains at native size; the cutaway is a crop without an upscaled duplicate; the detail is a downscaled crop. Total new poster weight is 134,180 B. Existing preview videos remain byte-for-byte unchanged.

## Fallback and attribution

Each frame carries a localized adjacent title and a meaningful localized image description. A labeled Deep Water fallback is permanently layered behind every poster, so request failure leaves complete context without layout shift; a controlled temporary missing dominant path verified the rendered state, then the approved path was restored. Video failure leaves the valid dominant poster visible. Source IDs, preview paths, exact seconds, timecodes, dimensions, and crop instructions are typed in `src/content/media.ts`.
