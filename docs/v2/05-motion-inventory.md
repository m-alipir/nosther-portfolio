# Motion inventory

## Inventory

| System | File | Trigger / implementation | Breakpoints and input | Reduced motion / touch | Cleanup | Purpose and risk |
| --- | --- | --- | --- | --- | --- | --- |
| Hero intro | `src/components/hero/hero.tsx` | `useLayoutEffect`; dynamic GSAP, SplitText; staged eyebrow/title/lead/actions/media/cue timeline after fonts | Mobile <=767, tablet 768–1199, desktop >=1200 profiles | Skipped when reduced; no pointer dependency; locale/module state can skip replay | GSAP context/revert, SplitText revert, media-query listener removal, generation cancellation | Premium entrance. High regression risk: content starts hidden, font/GSAP timing, locale replay state. |
| Hero scroll | `src/components/hero/hero.tsx` | ScrollTrigger scrubs copy/title/media/cue | Desktop and tablet only; no mobile profile | Not created under reduced motion | `gsap.matchMedia().revert()` and context revert | Depth on exit. Medium/high risk: first viewport composition, blur/opacity, ScrollTrigger/Lenis coupling. |
| Hero video | `src/components/hero/hero-media.tsx` | Native video autoplay when IntersectionObserver threshold 0.15 and page visible | All sizes; playback policy checks reduced motion/save-data/MP4 | Poster-only under reduced motion/save-data; touch is allowed because fine hover is not required | Observer disconnect, visibility listener removal, pause | Ambient proof. Medium risk: autoplay, loading, fallback layering, competition with future multi-frame hero. |
| Selected Work heading/card reveals | `src/components/selected-work/selected-work.tsx` | GSAP SplitText plus ScrollTrigger scrub; cards grouped by index and layout kind | Desktop/tablet/mobile profiles; mobile one card per group | Entire setup skipped under reduced motion; touch receives scroll reveals but no tilt/video policy | contexts/matchMedia/SplitText revert; attributes removed; listeners removed | Editorial rhythm. High risk: index coupling, concealed content, many triggers, responsive refresh. |
| Project preview playback | `src/components/project-card/project-card.tsx` | Native/React video requested on pointer enter/move or focus; module singleton stops previous preview | Requires fine hover for playback policy; focus starts linked cards | Poster-only on touch/coarse pointer, reduced motion, save-data, failure | blur/visibility listeners removed; pause/reset; unmount stops preview | Core proof interaction. Highest risk: one-at-a-time invariant, async play races, source loading, keyboard parity. |
| Card tilt | `src/hooks/motion/use-project-card-tilt.ts` + card CSS | Delegated pointermove, rAF, CSS variables, max 1.5° | Fine hover mouse only | Disabled under reduced motion and coarse/touch | listeners removed, rAF cancelled, active card reset | Subtle material response. Medium risk: pointer/scroll work and transform composition with reveals/hover scale. |
| Custom cursor | `src/components/custom-cursor/custom-cursor.tsx` | Global pointermove/out, rAF follower, state from closest data attributes; copy custom event | Fine hover mouse only | Hidden/disabled for coarse pointer and reduced motion | all listeners removed, rAF cancelled, root attribute cleared | Context labels VIEW/COPY. Medium/high risk: native cursor suppression, focus/touch mismatch, global listener cost. |
| Magnetic interactions | `src/components/magnetic-runtime/magnetic-runtime.tsx` + global CSS | Delegated global pointermove/out, rAF CSS variables | Fine hover mouse only | Disabled under reduced motion/touch | listeners removed, rAF cancelled, target reset | Button tactility. Medium risk: global pointer work and transform conflicts. |
| Lenis integration | `src/providers/smooth-scroll-provider.tsx` | Lenis scroll event; GSAP ticker drives `lenis.raf`; ScrollTrigger update | All breakpoints | Entire runtime skipped under reduced motion | ticker/listener removal and `lenis.destroy()` | Smooth scroll/trigger synchronization. High risk: global scroll behavior, performance, native expectations. `gsap.ticker.lagSmoothing(0)` is global and not restored. |
| Services motion | `src/components/phase-2d-motion/phase-2d-motion.tsx` | GSAP SplitText, row ScrollTriggers, active-row state on desktop | Desktop sticky/active; tablet/mobile simpler reveal profiles | Setup skipped under reduced motion; CSS restores static content | contexts/matchMedia/SplitText/attributes reverted | Capability sequencing. Medium/high risk: many triggers and one global coordinator. |
| NoteZ motion | same Phase2D file | GSAP reveal of backing/copy/media plus desktop/tablet parallax | Desktop/tablet parallax; mobile reveal only | Skipped under reduced motion; static CSS fallback | contexts/matchMedia/SplitText reverted | Experiment depth. Medium risk; prominence may conflict with V2 hierarchy. |
| About motion | same Phase2D file | GSAP copy/media reveal and desktop parallax | Desktop parallax; tablet/mobile reveal | Skipped under reduced motion; static CSS fallback | contexts/matchMedia/SplitText reverted | Personal transition. Medium risk; will intersect deep-ocean transition. |
| Mobile navigation | `src/components/site-header/site-header.tsx` | Framer Motion AnimatePresence opacity and staggered link y/opacity | Header switches below 1200px | CSS forces transforms off under reduced motion, but Framer still mounts short transitions | React unmount; keydown listener/body overflow restored | Accessible mobile menu. Medium risk: reduced-motion completeness and focus containment. |
| Link/button hover | global/component CSS | transitions, underline, arrow, card scale/copy movement | hover/fine-pointer media queries for most effects | global reduced-motion duration override; specific card overrides | CSS only | Feedback. Low/medium risk when combined with GSAP transforms. |

## Redundancy and architecture observations

- Motion spans GSAP, Framer Motion, Lenis, native video/IntersectionObserver, rAF pointer systems, and CSS. Each has a valid role, but V2 should not add another motion layer.
- `MotionRuntime` preloads GSAP while Hero, SelectedWork, Phase2DMotion, and SmoothScroll independently call the same registered promise.
- `useGsapScope` is a clean helper but currently unused; motion components implement their own setup-generation/cancellation patterns.
- Phase2DMotion coordinates three sections by global selectors, increasing coupling and making partial section reuse harder.
- The work reveal profile is tightly tied to project array indexes and current grid roles.

## Performance priorities

1. Measure ScrollTrigger count and main-thread work after V2 layout changes.
2. Keep hero media to one active playback at a time even if three frames are visible.
3. Avoid stacking GSAP transforms with tilt, hover scale, parallax, and glass filters on the same element.
4. Re-evaluate global cursor/magnetic listeners on normal 1366x768 hardware, not only high-end devices.
5. Ensure texture/caustic effects use low-cost compositing and become static under reduced motion.
