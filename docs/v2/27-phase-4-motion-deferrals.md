# Phase 4 motion deferrals

Phase 4 is a static composition phase. It adds no new GSAP timeline, autoplay behavior, ambient motion, or site-wide interaction architecture.

## Retained behavior

- The existing Selected Work heading and card reveal lifecycle remains registered through the same `useLayoutEffect`, reduced-motion media query, GSAP context, match-media profiles, ScrollTrigger refresh, SplitText revert, and unmount cleanup.
- Card profile selection now reads semantic `data-project-layout` values (`flagship`, `major`, `narrative`, or supporting) rather than treating a raw array index as the layout definition.
- Reveal groups match the new editorial sequence: `[01]`, `[02]`, `[03]`, `[S01]`, `[S02, S03]`. The array indices remain only as local sequencing references inside the preserved animation profile.
- The existing fine-pointer tilt hook still targets `data-project-card` and `data-project-media-visual`; it was not redesigned.
- Reduced motion still bypasses the reveal setup and disables tilt/preview policies through the existing hooks and CSS.

## Deferred to Phase 6

1. Decide whether each of the three featured compositions needs a distinct mask/reveal vocabulary or whether one shared restrained media reveal is calmer.
2. Re-evaluate the 6/3/3 supporting rail reveal so the two automotive studies do not compete simultaneously with the larger self-produced item.
3. Review whether whole-project tilt remains appropriate for the large flagship media or should be reduced/removed.
4. Review custom-cursor wording on large external project links and keep destination-less studies free of misleading “view” language.
5. Tune reveal distance/duration at 1366×768 and narrow mobile only after Phase 5 fixes final page length and light-to-depth transitions.
6. Add no ambient caustic motion until the complete static page passes performance and reduced-motion review.

## Non-negotiable motion gates

- The still composition and all copy remain complete if GSAP, fonts, JavaScript animation setup, or video playback fails.
- Only one project preview may play; hero and project media may not become competing autoplay systems.
- Touch, coarse pointers, reduced motion, save-data, unsupported MP4, and failed sources remain poster-led.
- All media queries, ScrollTriggers, SplitText instances, global listeners, frames, and active previews must clean up on change or unmount.
- Phase 6 must simplify mobile motion and must not hide disclosures, source titles, contributions, or actions behind interaction.
