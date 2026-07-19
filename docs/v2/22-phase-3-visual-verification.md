# Phase 3 visual verification

Verification date: 2026-07-19. Final target: local production build at `http://127.0.0.1:3103`.

## Exact screenshot matrix

Ignored captures are stored under `artifacts/v2-phase-3/`:

| Capture | Result |
| --- | --- |
| EN 1366×768 | Hero 738.27px / 96.1svh; all three frames and CTAs visible; zero overflow |
| EN 1440×900 | Hero 865px / 96.1svh; unified desktop composition; zero overflow |
| EN 1920×1080 | Hero 1025px / 94.9svh; container remains intentional; zero overflow |
| TR 1366×768 | Explicit three-line localized title; CTAs and all frames fit; zero overflow |
| TR 1440×900 | Localized labels/title remain intentional; zero overflow |
| Tablet 1024×768 | Copy scale reduced; stage starts within the first screen; three frames retained |
| Tablet 768×1024 | Full three-surface stage visible with reduced overlap; zero overflow |
| Mobile 390×844 | CTAs visible; dominant plus cutaway retained; detail omitted; poster-only; zero overflow |
| Mobile 320×800 | 305px content width equals scroll width; readable four-line EN title; poster-only |

Additional captures: `poster-only-390x844.png` and `media-error-fallback-390x844.png`. The media-error image was captured through a controlled temporary missing dominant poster path and shows the real labeled fallback; the approved path was restored before verification and commit.

## Composition and localization

- Desktop is not a normal split layout: the sequence begins behind the headline boundary, the cutaway bridges copy and wide media, the detail attaches to the main frame, and a shared rail/playhead connects all surfaces.
- The dominant frame carries most media weight; the portrait and detail are visibly secondary and are not random cards.
- Production cues are restrained labels and real source timecodes, not a software UI recreation.
- EN and TR use separately typed display lines and localized metadata, titles, group labels, and image descriptions.
- No automotive third-party footage appears in the stage.

## Media, interaction, and accessibility

- Desktop fine-hover state mounts exactly one sourced hero video: `youtube-01-preview.mp4`. It plays while sufficiently visible and pauses after the hero leaves view.
- The dominant optimized poster is prioritized; cutaway/detail images are lazy; secondary videos never exist. Narrow mobile mounts zero hero videos and reports `poster-only`.
- Mobile menu production test: opens, focuses `01 Work`, locks body overflow, closes on Escape, restores trigger focus and overflow.
- Locale test: `/en#work` switches to `/tr#work`; hash and localized H1 are correct and hero motion remains `ready`.
- Heading order remains H1 followed by existing H2/H3 structure. The sequence is a localized group; its three media surfaces have meaningful labels; noninteractive frames receive no tab stop.
- A clean final production tab reported no browser console warnings or errors.
- The browser exposed viewport control but no reduced-motion/coarse-pointer emulation. Reduced-motion remains complete by source: the playback policy denies video, the hero setup immediately marks content ready, and the CSS hides the video. Real-device coverage remains a Phase 7 gate.

## Automated and production checks

- `npm run lint`: pass
- `npm run typecheck`: pass
- `npm run build`: pass; seven static pages generated, `/en` and `/tr` SSG, proxy retained
- HTTP 200: `/en`, `/tr`, `/robots.txt`, `/sitemap.xml`, three derived WebPs, and the dominant MP4
- CSP, HSTS, and X-Frame-Options present on all smoke-tested responses
- Repository still has no configured automated test script; this baseline limitation is unchanged
