# Phase 3 motion deferrals

Phase 3 accepts the static hero. It adds no GSAP timeline, parallax, scroll choreography, animated caustic layer, or independent playback system.

## Existing motion retained unchanged

- Hero intro replay suppression and locale-transition consumption
- Reduced-motion early exit that marks the hero complete and visible
- Existing whole-copy/whole-stage intro selectors
- Existing desktop/tablet scroll response for copy opacity/blur and whole-stage translation/scale
- Existing GSAP registration, SplitText cleanup, ScrollTrigger refresh/revert, media-query rebuild, and unmount cleanup
- Shared Lenis, magnetic, custom-cursor, and project-preview lifecycles

The new DOM deliberately preserves `data-hero-*` hooks so the proven lifecycle still resolves. No new element-level frame choreography was attached.

## Phase 6 review list

1. Storyboard one purposeful sequence reveal for the approved static stage before changing code.
2. Decide whether the inherited title blur/copy fade and whole-stage scroll translation still support the new composition or should be reduced/removed.
3. If approved, sequence the dominant, cutaway, detail, rail, and playhead as one reveal without independent floating motion.
4. Keep narrow mobile shorter and poster-led; do not animate the omitted detail or require hover.
5. Keep reduced-motion at the complete static state with no `preparing` concealment.
6. Revalidate locale replay suppression, interrupted GSAP setup, resize/media-query rebuild, ScrollTrigger count, and cleanup.
7. Revalidate playback priority so motion never causes multiple hero/project previews to compete.

## Known static-phase limitation

The inherited scroll response was not redesigned in Phase 3. It remains functional and cleaned up, but its final artistic fit with the new sequence is explicitly unapproved until Phase 6. Phase 4 should not alter this hero motion contract while rebuilding Selected Work.
