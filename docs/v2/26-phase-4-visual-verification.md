# Phase 4 visual and interaction verification

Verification date: 2026-07-19. Browser evidence was captured from the local production build at `http://localhost:3104` with the in-app browser. Exact viewport PNGs are ignored under `artifacts/v2-phase-4/`.

## Screenshot matrix

| Evidence | File | Result |
| --- | --- | --- |
| EN desktop | `en-1366x768.png`, `en-1440x900.png`, `en-1920x1080.png` | Pass; flagship is dominant and does not become a full-page artboard. |
| TR desktop | `tr-1366x768.png`, `tr-1440x900.png` | Pass; heading and flagship copy wrap without collision. |
| Tablet | `tablet-1024x768.png`, `tablet-768x1024.png` | Pass; hierarchy remains legible and metadata is not squeezed. |
| Mobile | `mobile-390x844.png`, `mobile-320x800.png` | Pass; stack order is unchanged and no horizontal overflow appears. |
| Keyboard focus | `keyboard-focus-flagship-1440x900.png`, `tr-long-title-320x800.png` | Pass; whole-project focus is visible and starts the established preview path. |
| Locale/hash | `locale-switch-tr-hash-390x844.png` | Pass; `/en#work` switched to `/tr#work`, `lang=tr`, and the hash remained `#work`. |
| Automotive disclosure | `en-automotive-disclosure-1440x900.png`, `tr-automotive-disclosure-390x844.png` | Pass; exact approved copy is readable in both locales. |
| Poster-led state | Required mobile captures before project focus | Pass as visible still-state evidence; the browser could not emulate a coarse pointer or reduced motion. |

## Composition review

- Project 01 uses the largest media/title relationship and complete instructional evidence.
- Project 02 places editorial text before a wide comparison frame instead of repeating Project 01.
- Project 03 is narrower and right-offset on desktop, but retains large media, complete evidence, and a YouTube action.
- The secondary rail uses a 6/3/3 desktop rhythm: the self-produced AC Rally episode is larger than the two automotive studies.
- The portrait automotive frame remains portrait-led; the horizontal study remains compact. Neither is promoted above the top three.
- Borders, small radii, mono numbering, foam/ice surfaces, and ocean metadata stay inside the Phase 2 visual system. No new glass-card grid or design language was introduced.

## Interaction and accessibility

- Sequential keyboard focus produced exactly one `video[data-playing=true]`; moving focus to a non-project header link produced zero playing videos, all sourced project videos were paused, and their current time reset to `0`.
- All six project previews still use the same `ProjectCard` coordinator. No second playback system exists.
- Focus is visibly outlined around the complete project target. The four YouTube items remain external links; the two destination-less automotive studies are focusable preview articles with `aria-labelledby` titles.
- Heading order is `h2` for Selected Work, `h3` for the three featured projects, `h3` for the supporting group, and `h4` for its project titles.
- Project posters have localized meaningful descriptions. Disclosure and all contribution metadata are visible without hover.
- Measured document `scrollWidth` equaled `clientWidth` in the checked 390px EN/TR and 320px TR states.

## Runtime and diagnostics

- Browser console errors/warnings: none.
- Production stderr: empty.
- Local route/media smoke: `/`, `/en`, `/tr`, robots, sitemap, flagship poster/preview, automotive poster/preview, and `Logo-V2.png` returned HTTP 200.
- Locale switching preserved `#work` and changed the document language to Turkish.
- A source is assigned only through the existing pointer/focus request path. The local browser's persistent fine-pointer position can itself enter a project after hash navigation, so the browser session was not used to claim a zero-request network waterfall.

## Fallback and emulation limitations

The selected browser exposes viewport control but not reduced-motion, touch, coarse-pointer, save-data, or request interception. It also exposes DOM reads through a restricted wrapper that prevented a safe in-page video-source mutation for a controlled error. Phase 4 therefore does not claim a fresh runtime-emulated media error. The preserved video `onError` path was inspected to remove the failed video and reset playback, and the new poster `onError` path was inspected to reveal a localized CSS-backed fallback. Mobile captures prove the complete poster composition, while the policy hook continues to block project video on coarse pointers and reduced motion. Full emulated/real-device coverage remains a Phase 7 gate.

## Automated verification

- `npm run lint` — pass with no warnings after the final edit.
- `npm run typecheck` — pass.
- `npm run build` — pass; `/en` and `/tr` remain statically generated.
- No test script or test configuration exists in `package.json`; lint, typecheck, build, production smoke, and browser interaction checks are the available Phase 4 gates.
