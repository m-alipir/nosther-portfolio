# Phase 3 summary — Cinematic Sequence Stage

Checkpoint date: 2026-07-19.

## Outcome

Phase 3 replaces the V1 text-left/floating-media hero and temporary third-party automotive source with a static-first Cinematic Sequence Stage built entirely from self-produced N0STHER work. The headline, wide comparison frame, portrait cutaway, detail insert, source timecodes, playhead, and sequence rail read as one editorial object before motion.

## Architecture

- `Hero` retains the existing CTA destinations, hero-intro replay lifecycle, and GSAP selectors while rendering explicit localized headline lines.
- `HeroSequenceStage` owns the unified stage, one dominant playback-eligible surface, two static supporting surfaces, loading policy, visibility pause, and video fallback.
- `StaticSequenceFrame` is a small internal primitive for the cutaway and detail surfaces; it is not independently interactive.
- `src/content/media.ts` holds typed source project IDs, preview paths, source seconds/timecodes, crop records, derived dimensions, and the sole preview path.
- Localized visible labels, titles, group descriptions, and meaningful media descriptions remain in the typed dictionaries.

## Responsive result

Desktop uses three connected overlapping surfaces inside a 95–96% viewport-height hero. Tablet stacks copy above the still-cohesive three-surface sequence with reduced headline scale. Narrow mobile keeps the dominant frame plus attached portrait cutaway, hides only the detail insert, keeps both CTAs above the stage, and is explicitly poster-only.

## Scope preserved

No Selected Work or later-section layout, project-card architecture, site-wide playback coordinator, navigation structure, route, SEO source, security configuration, dependency, or global motion architecture changed. The three original preview videos were not re-encoded. No automotive third-party footage appears in the hero.

## Verification

`npm run lint`, `npm run typecheck`, and `npm run build` pass. Local production smoke checks pass for both locales, discovery routes, all three hero posters, and the dominant preview. Exact visual and interaction evidence is recorded in [22-phase-3-visual-verification.md](22-phase-3-visual-verification.md).
