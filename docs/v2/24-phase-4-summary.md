# Phase 4 summary — Selected Work editorial hierarchy

Checkpoint date: 2026-07-19.

## Outcome

Phase 4 replaces the repeated card grid with a static, media-led Selected Work sequence. The approved self-produced trio now carries three distinct levels of emphasis: Assetto is the dominant flagship, BeamNG Performance reverses the media/text relationship as a major comparison project, and BeamNG Cargo is a narrower, right-offset narrative project. AC Rally and both automotive studies follow in a smaller supporting evidence rail.

## Architecture

- `SelectedWork` separates explicitly ranked featured projects from supporting projects and owns the section heading, supporting-work introduction, responsive evidence rail, and the preserved GSAP lifecycle.
- `ProjectCard` remains the sole preview runtime. It now renders from typed editorial metadata rather than using array positions for layout.
- The typed project model adds `editorialClass`, `featuredRank`, `sourceTitle`, `contributions`, `disclosure`, and `posterAlt`. It adds no CSS measurements or broad content-system abstraction.
- Project source paths, preview URLs, destinations, platform, year, tools, and project-specific descriptions remain unchanged.

## Editorial result

1. Assetto Corsa Content Manager & Mod Setup Guide — large media-first flagship with the strongest title scale and complete source/contribution metadata.
2. BeamNG Performance Settings Guide — text-first comparison composition with wide media and explicit comparison-graphics evidence.
3. BeamNG Cargo Run Without Fuel — compact, offset narrative composition that remains substantial and actionable.
4. Supporting evidence — AC Rally occupies a larger supporting span; the portrait and landscape automotive studies are smaller and retain their exact bilingual third-party-footage disclosure.

## Preview and fallback result

The module-level one-preview coordinator, fine-hover/reduced-motion/save-data/codec policy, pointer/focus entry, leave/blur/visibility cleanup, lazy source assignment, muted looping playback, and video-error poster return remain in the existing `ProjectCard` runtime. Phase 4 also adds a CSS-backed labeled image fallback for a failed poster. All Selected Work images are lazy because the section follows the hero.

Keyboard focus was verified to start the same preview path, sequential focus kept exactly one project preview playing, and moving focus outside a project paused and reset the sourced video to `0`. Touch/coarse-pointer and reduced-motion emulation remain unavailable in the selected browser; their poster-led policy paths were inspected and preserved.

## Responsive result

Desktop keeps three deliberately different compositions and a 6/3/3 supporting evidence rail. Tablet reduces the top-three asymmetry to readable single-column sequences while preserving the second project's text-first order; supporting work becomes one full-width self-produced item plus two half-width studies. Mobile stacks the sequence, keeps the second project text-first, offsets the third project's media, retains large posters and all metadata, and keeps disclosure copy readable without horizontal overflow.

## Future About asset

`public/media/portrait/Logo-V2.png` is accepted and tracked as the future primary N0STHER identity portrait / brand portrait. It is a 1024×1024 opaque RGBA PNG, 1,019,018 bytes (0.972 MiB), SHA-256 `EC7FB3E1C0347EDE4A2FB81CE340D0713F3EE72CBA26E4CBE3705604F3A67BF1`. It is a blue illustrated N0STHER mark, not a photograph of Ali. Phase 4 does not implement About. A later About implementation should preserve this source and serve responsive WebP/AVIF derivatives through the existing image pipeline.

## Scope preserved

No About, Capabilities, Experiments, Contact, Footer, header behavior, route, SEO, security, hero architecture, dependency, site-wide motion architecture, deployment, or production branch was changed. Phase 5 did not begin.

## Verification

`npm run lint`, `npm run typecheck`, and `npm run build` pass. Local production routes and representative media return HTTP 200, browser console warnings/errors are empty, and production stderr is empty. Exact evidence is recorded in [26-phase-4-visual-verification.md](26-phase-4-visual-verification.md).
