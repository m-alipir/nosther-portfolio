# Tidal Glass Editorial

Status: V2 visual source of truth. The direction is approved, reconciled against the preserved 2560×6753 Lovable full-page reference, and calibrated as the Phase 2 global foundation. The screenshot is compositional evidence, not a source of final content or code.

## Identity

Tidal Glass Editorial is a calm, premium, cinematic portfolio system for ALI, creator behind N0STHER. It is light-first and editorial rather than software-like: foam-white space, ice-blue atmosphere, ocean-ink typography, large moving-image compositions, restrained production metadata, and selective frosted surfaces. Gaming and automotive work appear as evidence within a broader video-editing practice for creators and digital brands.

## Color tokens

These tokens express hierarchy rather than decoration. Values are the controlled V2 starting palette and must be visually verified with real media before Phase 2 approval.

| Token | Starting value | Role |
| --- | --- | --- |
| Foam White | `#F7FBFF` | Primary light canvas |
| Ice Blue | `#E7F5FC` | Alternating light section atmosphere |
| Soft Aqua | `#A9DCF2` | Quiet ambient light and glass edge accent |
| Tidal Blue | `#4DAAD8` | Rules and restrained interactive accents |
| Ocean Blue | `#1677A8` | Primary interactive color and metadata accent |
| Deep Water | `#064564` | About/depth and footer contrast fields |
| Ocean Ink | `#102C3B` | Primary light-surface typography |
| Muted Ink | `#3D5F70` | Secondary copy and meaningful metadata |
| Warm Sand | `#E8CDA7` | Optional, sparingly used warm counter-accent |
| White Foam | `#FFFFFF` | Type on deep fields and glass highlights |

Purple-heavy gradients, neon cyan, and saturated synthetic “AI” color transitions are outside the system.

## Typography direction

- Display typography is editorial, high-contrast in scale, confident, and cinematic. It may be a refined grotesk or an editorial display face, but it must remain legible in Turkish and English.
- Body typography is quiet, contemporary, and readable at normal monitor distances.
- Small production metadata uses a monospaced face for format, role, year, timecode, and sequence cues.
- Hierarchy comes from scale, weight, line breaks, and negative space—not from many type styles.
- Turkish characters must render correctly, and line breaks must be designed separately for TR and EN.

## Glass usage

Glass is a selective material, not a universal card treatment. Use it for the hero sequence stage, occasional metadata rails, or a contact detail where translucency clarifies layering. A glass surface needs a reason: it must connect media, depth, and typography. Avoid grids of glass cards, floating dashboard panels, and glass on every section.

Phase 2 defines a milky white surface at approximately 72% opacity, a thin white/ice edge, an inner top highlight, a low ocean-colored shadow, and restrained `1.1rem` backdrop blur. The current floating header validates the material; later phases may reuse the shared primitive selectively.

## Texture rules

- Film grain is fine, low-contrast, and global or section-scoped; it must not dirty text or reduce media clarity.
- Water-caustic light is abstract, soft, and very subtle. It is light behavior, not a literal ocean illustration.
- Texture must degrade to a stable still state under reduced motion.
- No fish, coral, shells, bubbles, water droplets, or literal ocean props.

Phase 2 uses one lightweight inline SVG noise tile and static layered radial gradients. Neither texture animates; both remain stable under reduced motion and must stay low enough in contrast that text and media are unaffected.

## Section atmosphere

The page begins in foam white and ice blue, with generous editorial breathing room. Selected Work uses large media and asymmetrical rhythm. Capabilities become a precise list rather than a grid of product cards. The page then transitions gradually into a deep-ocean About field before returning to a clear, spacious contact close. Section boundaries may use tonal shifts, fine rules, or controlled overlap; they must not feel like disconnected templates.

The reference confirms an intentionally long page with large intervals between editorial moments, but implementation must reinterpret that rhythm for normal 1366×768, 1440×900, and 1920×1080 viewports rather than reproducing the screenshot as one tall artboard. Its strongest transferable patterns are the quiet top information rail, broad negative space, large work imagery with restrained metadata, ledger-like capabilities, and a single deep-blue chapter containing About and secondary Experiments.

## Media hierarchy

Real moving-image work is the primary visual proof. A small number of large frames outrank decorative surfaces. Every flagship item needs project-specific evidence, a strong poster, a purposeful preview, and a localized description. Experiments are secondary to client/portfolio editing work.

## Motion principles

- The static composition must be strong before motion is introduced.
- Motion supports sequencing, masks, focus, and the light-to-depth transition.
- Prefer restrained reveals, subtle scroll progression, and media masks over constant floating motion.
- One clear motion idea per section is usually enough.
- Mobile motion is simpler and shorter. Touch never depends on hover.
- Reduced motion produces a complete, legible, poster-led experience with no concealed content.
- Preserve the one-preview-at-a-time rule and avoid simultaneous autoplay competition.

## Desktop viewport targets

Primary visual QA targets are 1366x768, 1440x900, and 1920x1080. The hero must fit intentionally within roughly 90–100svh on these normal desktop proportions. A tall artboard is not an acceptable substitute for viewport design.

## Accessibility constraints

- Maintain semantic headings, landmarks, skip navigation, keyboard reachability, and visible focus.
- Meet WCAG AA contrast for body copy, controls, focus indicators, and metadata that carries meaning.
- Glass and texture must not compromise contrast.
- Media needs meaningful adjacent context and reliable poster/error fallbacks.
- Do not encode state using motion, translucency, or color alone.
- Honor reduced motion, coarse pointers, touch, save-data, and browser visibility.

## Hero: Cinematic Sequence Stage

The future hero is not the current Lovable hero. It must use one dominant wide showreel frame, one narrow portrait cutaway, and one smaller detail or motion frame as a unified editorial sequence. A restrained sequence track, playhead, and timecode should connect typography to media. Selective frosted glass, subtle grain, and caustic light may establish depth. All frames must use real portfolio media and form a compelling still composition before GSAP is added.

The reference validates overlap, hierarchy, and sequence metadata as useful ingredients. It does not approve the reference's specific automotive stock frame, portrait inset, caustic tile, or exact text-left/media-right arrangement. V2 must create a stronger connection between the typography and the three real-media frames while avoiding three independent floating cards.

It must not become a text-left/cards-right split, three unrelated floating cards, a random collage, a software interface, or a single embedded video player.

## Selected Work

Selected Work is the portfolio’s evidence core. Lead with one or two flagship edits at generous scale, then establish supporting rhythm through asymmetry, orientation changes, and project-specific metadata. Preserve hover/focus previews and touch/reduced-motion posters. Avoid a bento-grid-heavy appearance and repeated generic descriptions.

## About and Experiments

About carries the deep-ocean contrast field and should feel personal, credible, and editorial. Use an approved real portrait or intentionally approved identity asset. NoteZ/Experiments remains visible but clearly secondary to video-editing work; it must not interrupt the portfolio proof hierarchy.

## Contact

The closing composition is spacious, direct, and confidence-building: a strong invitation, verified email, and verified social links. A restrained glass or light-transition detail may connect it to the system. Do not use placeholder addresses, invented availability claims, or decorative form fields without a real workflow.

## Anti-patterns

Do not use stock imagery in the final portfolio, placeholder portraits, invented statistics, generic project names, random floating cards, excessive glass, generic SaaS/bento structures, Apple imitation, Adobe Premiere UI imitation, or literal ocean imagery. Do not copy the Lovable hero arrangement or any prototype implementation that conflicts with proven V1 behavior.
