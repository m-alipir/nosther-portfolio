# Tidal Glass Editorial

Status: current visual source of truth for the live site. This document describes what is actually implemented today, not a historical build log — process journals and phase-by-phase decision records live in `docs/v2/03-decision-log.md` for anyone who needs the "why."

## Identity

Tidal Glass Editorial is a calm, premium, cinematic portfolio system for ALI, creator behind N0STHER. It is light-first and editorial rather than software-like: foam-white space, ice-blue atmosphere, ocean-ink typography, large moving-image compositions, restrained production metadata, and selective frosted surfaces. Gaming and automotive work appear as evidence within a broader video-editing practice for creators and digital brands.

## Color tokens ("Deep Field")

One body of water at seven depths — every hue sits between roughly 185° and 205° so no section can drift out of the family. Warm Sand is the sole warm value and stays at hairline scale: an underline, a tag, a live indicator, never a fill larger than a button. Tokens live in `src/app/globals.css` as `--color-*`.

| Token | Value | Role |
| --- | --- | --- |
| Foam | `#F1F5F6` | Primary light canvas |
| Ice | `#DCE6E9` | Alternating light section atmosphere |
| Aqua | `#BCD2D4` | Quiet ambient light and glass edge accent |
| Tidal | `#8FB3B8` | Rules and restrained interactive accents |
| Ocean | `#4E7C8A` | Primary interactive color and metadata accent |
| Deep | `#1D3946` | About/depth contrast fields |
| Ocean Ink | `#0A1319` | Deepest fields and primary light-surface typography |
| Sand | `#C9B79C` | Hairline-only warm counter-accent |

Purple-heavy gradients, neon cyan, and saturated synthetic "AI" color transitions are outside the system.

## Typography direction

- Display: Archivo Variable, self-hosted. A locked type scale (`--d1`–`--d4` in `globals.css`) ties weight (780–840), tracking (-.028em to -.052em), and line-height to rendered size — heavier and tighter as headlines get larger — so no component hand-picks its own weight/tracking pair.
- Body: Instrument Sans Variable.
- Metadata: IBM Plex Mono, for format/role/year/tag/timecode-style labels.
- Hierarchy comes from scale, weight, line breaks, and negative space — not from many type styles.
- Turkish characters must render correctly, and line breaks are designed separately for TR and EN (see the Selected Work headline for an example of a manually forced break where the column width doesn't leave room for the natural wrap the copy needs).

## Glass usage

Glass is a selective material, not a universal card treatment. Three weights, one build, defined as token quartets (`fill`/`edge`/`cast`/`filter`, plus `drop` for clip-path surfaces) in `globals.css`:

- **Clear** — 3px blur. Nearly invisible; only its lit edge says it's there. Nav bars, captions, thumbnails.
- **Frosted** — 16px blur, saturation pushed so color behind it intensifies rather than greys out. The workhorse weight, used on most panels (header, hero copy plate, service-row hover, project-card body).
- **Deep** — 34px blur, inner bloom. Only for panels that must obscure — dark grounds, long text, overlays (About's copy plate and media frame, Contact's card, Selected Work's supporting-heading panel).

Avoid grids of glass cards, floating dashboard panels, and glass on every section — each surface needs a reason connecting media, depth, and typography.

## Texture and photography rules

- Film grain is fine, low-contrast, page-level (one layer, not per-section) and must not dirty text or reduce media clarity.
- Water-caustic/current/cloud light is procedural SVG (`feTurbulence` chains defined in `src/components/atmosphere/atmosphere-defs.tsx`, applied via the `.atmosphere` utility classes) — abstract, soft, section-scoped, never a literal ocean illustration on its own.
- Real coastal photography is now used as a subordinate background layer in Selected Work, Services, and About (`public/media/backgrounds/`), always sitting under the section's own color gradient — either alpha-blended or `multiply`-blended — so it reads as depth/texture within the palette, never as a raw, saturated stock photo. Keep it that way: a new background photo goes in tinted, not bare.
- No fish, coral, shells, bubbles, water-droplet props, or decorative wave illustrations. Photography is real aerial/coastal imagery, not illustrated ocean kitsch.
- Texture must degrade to a stable still state under reduced motion.

## Section atmosphere

One continuous progression, hero to footer, hero excluded from the rule below since it's a full-bleed cinematic object rather than a color field:

Selected Work (ice → aqua → ocean, "shallow-water depth") → Services (foam-dominant, "shoreline neutrality") → About (aqua → ocean → deep → ocean-ink, "light-to-deep chapter") → Contact (ocean-ink → ocean → aqua → ice → foam, "deep-to-ice release") → Footer (foam → ice, light coastal close).

Section boundaries carry a thin sand-tinted hairline (`[data-motion-section] + [data-motion-section]::before` in `globals.css`) rather than a hard cut. Content width for every section below the hero is intentionally narrower than the hero's own full-bleed width (`min(84vw, 70rem)` vs. the hero's `min(88vw, 76rem)`/wider ultra-wide steps) — editorial reading content wants more edge margin than a cinematic media object does.

## Media hierarchy

Real moving-image work is the primary visual proof. A small number of large frames outrank decorative surfaces. Every flagship item needs project-specific evidence, a strong poster, a purposeful preview, and a localized description. Experiments (NoteZ) have been removed from the site entirely — video editing is the sole proof surface now, nothing subordinate to distinguish it from.

## Motion principles

- The static composition must be strong before motion is introduced.
- Motion supports sequencing, masks, focus, and the light-to-depth transition.
- Prefer restrained reveals, subtle scroll progression, and media masks over constant floating motion.
- One clear motion idea per section is usually enough.
- Mobile motion is simpler and shorter. Touch never depends on hover.
- Reduced motion produces a complete, legible, poster-led experience with no concealed content.
- Preserve the one-preview-at-a-time rule and avoid simultaneous autoplay competition.
- Cursor-tracked 3D tilt (hero copy plate, project-card media) is restrained — a few degrees of rotation, eased slower than the cursor — and runs only for fine pointers with hover and no reduced-motion preference.

## Desktop viewport targets

Primary visual QA targets are 1366×768, 1440×900, and 1920×1080. The hero fits intentionally within roughly one viewport on these normal desktop proportions. A tall artboard is not an acceptable substitute for viewport design. Below the hero, sections are allowed to run taller than one viewport — Selected Work's carousel + supporting grid, About's copy, and Contact all need more room than 100vh generally offers, and forcing them to fit would just cram content.

## Accessibility constraints

- Maintain semantic headings, landmarks, skip navigation, keyboard reachability, and visible focus.
- Meet WCAG AA contrast for body copy, controls, focus indicators, and metadata that carries meaning.
- Glass and texture must not compromise contrast.
- Media needs meaningful adjacent context and reliable poster/error fallbacks.
- Do not encode state using motion, translucency, or color alone.
- Honor reduced motion, coarse pointers, touch, save-data, and browser visibility.

## Hero: The Showreel Surface

The hero is one cinematic object: `/media/automotive/automotive-horizontal-preview.mp4` (poster: `/media/hero/automotive-single-reel.webp`) as the sole hero media source, filling the full content width and height-capped to roughly one viewport. A frosted glass copy plate sits on top of the footage at the bottom-left, holding the eyebrow, headline, lead, and both CTAs — with cursor-tracked 3D tilt (see Motion principles) on desktop.

The localized headline is `STORIES SHAPED IN MOTION.` in English and `HİKÂYELER HAREKETLE ŞEKİLLENİR.` in Turkish, each rendered as three staggered lines with the middle line offset right for an editorial stack rather than a solid block. Because the edit uses third-party footage, visible copy claims editing and visual effects only, and a localized disclosure line sits directly beneath the media in normal flow (not boxed, not inside the footage). Ali's embedded `mamilex` creator watermark stays visible and unchanged inside the edit.

Runtime policy: video mounts only above 767px width when the established fine-hover, reduced-motion, save-data, codec, visibility, and intersection checks all pass; narrow mobile is explicitly poster-only with a vertical glass fade and no secondary media. The single-preview, poster-fallback, and locale-replay-suppression policies are unchanged from the rest of the site's video handling.

It must not become a text-left/media-right split, multiple floating cards, a random collage, a software-editing-interface imitation, timecodes/frame counters/playhead UI, or a montage of unrelated clips.

## Selected Work

Selected Work is the portfolio's evidence core: three featured projects in a looping front-and-center carousel (Assetto Corsa Content Manager as the media-first flagship, BeamNG Performance as a text-first comparison composition, BeamNG Cargo as a narrower right-offset narrative composition), then a supporting grid (AC Rally plus two smaller automotive motion/VFX studies) below a glass heading panel. Numbering, original source titles, contributions, roles, years, tools, and exact third-party disclosures make the proof project-specific — no generic "published long-form work" filler descriptions.

The project-preview coordinator is singular: video sources are assigned on eligible pointer/focus intent, one preview plays at a time, and touch/reduced-motion/error states stay poster-led. On the supporting cards, the caption scrim slides down and fades out on hover/focus (fine pointer only) so the preview plays clean, and returns the moment the pointer leaves.

Avoid a bento-grid-heavy appearance, repeated generic descriptions, equal-column card shells, and excessive glass repetition.

## About

About carries the deep-ocean contrast field (aqua → ocean → deep → ocean-ink) and should feel personal, credible, and editorial. The identity visual is `public/media/portrait/Logo-V2.png` — a square blue illustrated N0STHER brand mark, not a photograph of Ali — set inside a deep-glass media stage sized to read as a proportionate mark, not an oversized centerpiece. `Logo.png` remains secondary and is not used in About.

NoteZ/Experiments has been removed from the site. About is now video-editing identity only, with no secondary "in development" section to subordinate.

## Contact

The closing composition is spacious, direct, and confidence-building: a strong invitation, verified email (`contact@nosther.site`), and verified social links, inside a single clear-glass card with a clipped top edge. Do not use placeholder addresses, invented availability claims, or decorative form fields without a real workflow.

## Anti-patterns

Do not use placeholder portraits, invented statistics, generic project names, random floating cards, excessive glass, generic SaaS/bento structures, Apple imitation, Adobe Premiere UI imitation, literal ocean props (fish/coral/shells/bubbles/droplets), or decorative wave illustrations. Real coastal photography is allowed only tinted into the palette per the texture rules above — never shown raw/saturated, never the dominant element over type or media.
