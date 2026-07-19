# V2 QA checklist

Use this checklist at each relevant phase and complete it in full for Phase 7. Record browser/device, locale, result, and evidence rather than checking items from memory.

## Build and repository

- [ ] Working branch/scope is correct; unrelated changes are absent.
- [ ] `npm ci` succeeds from the lockfile.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes without unexplained warnings.
- [ ] All configured tests pass; if still absent, the limitation is recorded.
- [ ] Production console and server logs contain no errors or unexpected warnings.

## Viewports and visual composition

- [ ] 1366x768 desktop
- [ ] 1440x900 desktop
- [ ] 1920x1080 desktop
- [ ] Tablet portrait and landscape around the actual breakpoints
- [ ] Mobile at 390x844 and a narrower 320px minimum-width check
- [ ] Ultra-wide behavior does not become an overly tall artboard
- [ ] Hero fits intentionally within approximately 90–100svh on desktop targets
- [ ] No horizontal overflow, clipped controls, accidental overlaps, or broken Turkish line breaks
- [ ] Grain, caustic light, and glass remain subtle and legible
- [ ] Light-to-deep-blue transitions feel continuous

## Localization

- [ ] `/en` copy, navigation, metadata, project titles/descriptions, labels, alt text
- [ ] `/tr` copy, navigation, metadata, project titles/descriptions, labels, alt text
- [ ] `/` chooses persisted locale first, then browser language, then EN
- [ ] Manual switch persists and preserves the current hash/section
- [ ] Locale switch does not replay a disruptive hero intro
- [ ] Canonical/hreflang, sitemap, OG/Twitter, and structured data are correct per locale

## Keyboard and accessibility

- [ ] Skip link appears and lands on main content
- [ ] Logical tab order and visible focus on every interactive element
- [ ] Mobile menu traps focus, closes on Escape, restores focus, and restores body scroll
- [ ] Project focus starts the same preview behavior as hover where allowed
- [ ] Every link/button has an accurate accessible name
- [ ] Heading/landmark order is coherent
- [ ] Copy-email result is announced politely
- [ ] Color contrast meets WCAG AA; glass/texture do not weaken it
- [ ] Content remains available when JavaScript, animation setup, font loading, or media fails

## Mouse, touch, and motion policy

- [ ] Hover preview starts only for the intended card
- [ ] Moving between cards stops/resets the previous preview; only one plays
- [ ] Blur, tab visibility loss, pointer leave, and navigation stop media
- [ ] Custom cursor appears only for a fine mouse pointer and never hides the native cursor incorrectly
- [ ] Magnetic and tilt interactions reset on leave, scroll, resize, blur, and unmount
- [ ] Touch/coarse-pointer experience is poster-led and exposes all information/actions
- [ ] Reduced-motion experience disables Lenis, nonessential reveals, cursor/magnetic/tilt, and preview/autoplay as intended
- [ ] Reduced-motion content is never left hidden by `preparing` states
- [ ] Mobile motion is shorter/simpler and does not depend on hover

## Media and content integrity

- [ ] Every final image/video is real portfolio media with recorded ownership/licensing status
- [ ] No stock placeholders, generic AI portrait, placeholder address/link, or invented metric/outcome
- [ ] Three hero frames are coordinated and work as a static composition
- [ ] Hero playback priority prevents competing motion
- [ ] Posters are correct for touch, reduced motion, save-data, unsupported video, and source errors
- [ ] Image dimensions/sizes and video bitrates are appropriate; offscreen media is lazy where safe
- [ ] Project role/year/tools/contribution and descriptions are verified and project-specific

## SEO, security, and deployment

- [ ] Title, description, canonical, hreflang, OG/Twitter image, robots, sitemap, icon
- [ ] JSON-LD validates and contains verified facts only
- [ ] CSP permits only required V2 assets and still blocks frames/objects as intended
- [ ] Security headers are present on the Preview Deployment
- [ ] No production source maps or leaked environment values
- [ ] Lighthouse run recorded for performance, accessibility, best practices, and SEO at representative desktop/mobile sizes
- [ ] Preview Deployment reviewed in TR/EN and on real touch hardware where possible
- [ ] Production has not been promoted without explicit approval

## Baseline screenshot matrix

Capture stable viewport images after fonts/media and relevant intro state settle. Include EN/TR desktop and mobile, all primary desktop targets, tablet, and reduced-motion evidence. If the tool cannot emulate reduced motion or stitch GSAP pages reliably, use exact viewport captures and record the limitation rather than accepting misleading output.

## Phase 2 checkpoint

Phase 2 evidence and exact results are recorded in [19-phase-2-visual-verification.md](19-phase-2-visual-verification.md). Exact viewport captures are ignored under `artifacts/v2-phase-2/`. The selected browser exposed viewport control but no reduced-motion, coarse-pointer, or touch emulation; Phase 2 therefore records interactive fine-pointer checks plus static verification of the existing reduced-motion/touch safeguards rather than claiming unavailable emulation.
