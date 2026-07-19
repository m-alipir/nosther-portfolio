# Component map

## Hierarchy

```text
LocaleLayout (server)
└─ ClientProviders (client)
   ├─ SmoothScrollProvider / MotionRuntime / CustomCursor / MagneticRuntime
   └─ HomePage (server composition)
      ├─ StructuredData
      ├─ Skip link
      ├─ SiteHeader (client)
      │  └─ LocaleToggle (client)
      ├─ Hero (client)
      │  └─ HeroMedia (client)
      ├─ SelectedWork (client)
      │  └─ ProjectCard × 6 (client)
      ├─ Services
      ├─ NotezFeature
      ├─ About
      ├─ Phase2DMotion (client runtime for Services/NoteZ/About)
      ├─ Contact (client)
      └─ Footer
```

## Responsibilities and V2 implications

| Component | Current responsibility | Important dependency | V2 guidance |
| --- | --- | --- | --- |
| SiteHeader | Fixed brand/nav, locale, desktop CTA, accessible mobile overlay | Framer Motion, LocaleToggle | Restyle carefully; preserve focus trap, Escape, body overflow restore, locale access. |
| Hero | Copy/actions, intro, desktop/tablet scroll treatment | GSAP/SplitText/ScrollTrigger | Replace only in Phase 3 after real media; static Cinematic Sequence Stage first. |
| HeroMedia | Autoplay-in-view video plus poster/failure schematic fallback | playback policy, IntersectionObserver | Reuse policy and error semantics across future three-frame stage. |
| SelectedWork | Heading, project grid, responsive reveal profiles, tilt hook | ProjectCard, GSAP | Preserve behavior while changing hierarchy in Phase 4. |
| ProjectCard | Poster/video, one-at-a-time preview, metadata, external link | module-level active preview, playback policy | High-risk invariant; adapt rather than rewrite casually. |
| Services | Three-item capability list | local content, Phase2DMotion selectors | Good structural starting point for V2 capabilities. |
| NotezFeature | Secondary experiment with real repo link/screenshot | Phase2DMotion | De-emphasize and rename hierarchy as Experiments without hiding provenance. |
| About | Identity copy, image, channel CTA | Phase2DMotion | Move to deep-ocean atmosphere; confirm portrait asset. |
| Contact | Email link/copy state/social links | Clipboard API, custom cursor event | Preserve directness, live status, verified destinations. |
| Footer | Identity/year/rights | dictionary | Restyle only. |
| Phase2DMotion | Services, NoteZ, About scroll reveals/parallax | global DOM selectors, GSAP | Candidate to split by section when V2 motion is approved; no Phase 2 motion expansion. |
| CustomCursor | Cursor states for links/projects/copy | pointer policy, global listeners | Optional V2 surface, but existing conditional behavior is invariant. |
| MagneticRuntime | Delegated button transforms | pointer policy, CSS variables | Preserve or intentionally simplify after interaction QA. |
| SmoothScrollProvider | Lenis-to-GSAP ticker bridge | Lenis, GSAP | High regression risk for scroll/ScrollTrigger and reduced motion. |
| StructuredData | WebSite/Person schema | SEO constants | Update copy only with verified facts. |

## Current CSS architecture

Global CSS defines dark V1 tokens, typography, spacing, container, shared button/link/magnetic/focus behavior, and reduced-motion overrides. Each visual component owns a colocated CSS Module. Breakpoints are component-specific but cluster around 1200px/75rem, 1024px/64rem, 896px/56rem, 768px/48rem, 640px/40rem, and 576px/36rem.

## Coupling to watch

- Motion code discovers elements through `data-*` contracts shared with server components and CSS.
- Project layout special-cases indexes 0, 3, 4, and 5; reordering data changes visual/motion roles.
- Preview exclusivity is a module-level singleton in `project-card.tsx`.
- Hero intro replay state spans module state, sessionStorage, LocaleToggle, and Hero.
- Phase2DMotion coordinates three separate server sections from one global client component.
- Global `ClientProviders` installs multiple delegated listeners; duplicating runtimes would multiply work.
