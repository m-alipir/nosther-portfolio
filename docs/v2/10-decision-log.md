# V2 decision log

## D-001 — Preserve the production V1 repository

- Date: 2026-07-19
- Status: accepted
- Decision: V2 evolves this Next.js repository. Lovable remains a visual reference only; no codebase migration or full-site regeneration.
- Reason: V1 contains tested localization, media, accessibility, interaction, SEO, security, and performance behavior.

## D-002 — Safe branch

- Date: 2026-07-19
- Status: accepted
- Decision: create `v2/tidal-glass` from clean `main` at `cf5f704` in the existing isolated workspace.
- Reason: the worktree was clean and already isolated; a second nested/external worktree added no practical safety benefit in this environment.

## D-003 — Phase 0 scope only

- Date: 2026-07-19
- Status: accepted
- Decision: this task changes documentation only. No production component/style implementation, deployment, or content/media Phase 1 work.

## D-004 — Visual direction

- Date: 2026-07-19
- Status: accepted direction; calibration pending
- Decision: Tidal Glass Editorial is light-first, editorial, ocean-blue, video-led, selectively glassy, finely textured, and calm/premium/cinematic.
- Constraint: no purple AI gradients, neon cyan, literal ocean imagery, SaaS/bento excess, stock final imagery, or invented proof.

## D-005 — Hero concept

- Date: 2026-07-19
- Status: accepted concept; implementation pending
- Decision: use Cinematic Sequence Stage with one dominant wide frame, one portrait cutaway, and one detail frame connected by restrained sequence metadata.
- Rejected: current Lovable hero, normal split hero, floating-card collage, software UI, single embedded player.
- Gate: real media and static desktop approval before GSAP.

## D-006 — Experiments hierarchy

- Date: 2026-07-19
- Status: accepted direction
- Decision: NoteZ/Experiments remains present but secondary to editing portfolio proof. Final placement requires Phase 1/5 approval.

## D-007 — Reference evidence limitation

- Date: 2026-07-19
- Status: resolved
- Observation: the live Lovable URL returned “No published build,” but the handoff and a 2560×6753 full-page screenshot were subsequently supplied.
- Decision: preserve stable repository copies and use the screenshot only for visual hierarchy, atmosphere, and rhythm. The copies matched the supplied files at copy time; Git may normalize text line endings. Its imagery, metrics, names, email, links, and claims remain placeholders and cannot enter production content.

## D-008 — V1 screenshot method

- Date: 2026-07-19
- Status: accepted
- Decision: preserve exact viewport captures after hero-ready state. Reject stitched full-page captures because the browser duplicated GSAP-driven viewport content.
- Limitation: reduced-motion emulation was unavailable in the selected browser tooling.

## D-009 — No invented evidence

- Date: 2026-07-19
- Status: permanent invariant
- Decision: metrics, client outcomes, testimonials, contribution claims, licensing, availability, and project results require verifiable input. Unknowns remain explicit gaps.

## Phase 1 decisions

The five content/media decisions are closed in D-011 through D-015. Palette calibration remains a Phase 2 visual decision, not a Phase 1 blocker.

## D-010 — Existing CI is part of the baseline

- Date: 2026-07-19
- Status: accepted correction
- Decision: `.github/workflows/ci.yml` is the committed CI source of truth. It verifies locked install, lint, typecheck, production build, and high-severity dependency audit on pull requests and pushes to `main`, using Node 22 and cancel-in-progress concurrency per ref.

## D-011 — Phase 1 flagship order

- Date: 2026-07-19
- Status: accepted
- Decision: order the initial flagships as Assetto Corsa Content Manager & Mod Setup Guide, BeamNG Performance Settings Guide, then BeamNG Cargo Run Without Fuel. Automotive edits are supporting work.
- Reason: prioritize verifiable self-produced credibility over artificial category variety.

## D-012 — Hero planning default

- Date: 2026-07-19
- Status: accepted planning default; implementation pending Phase 3
- Decision: Candidate Set 3 uses BeamNG settings as the dominant wide source, a portrait crop/cutaway from the same Assetto guide project, and BeamNG cargo as the secondary detail source.
- Constraint: the Assetto portrait is a derived crop, not separate vertical work. Automotive footage is excluded. Broader non-gaming work is optional and does not block implementation.

## D-013 — About asset classification

- Date: 2026-07-19
- Status: accepted
- Decision: initial About is identity-led without photography. `public/media/portrait/Logo.png` is a secondary N0STHER identity mark, never a portrait. A real photograph may be added later without requiring a complete section restructure.

## D-014 — Preview audio evidence

- Date: 2026-07-19
- Status: accepted contribution policy
- Decision: retain only visually or repository-verifiable production, recording, screen/game capture, editing, instructional structure, captions/callouts, comparison graphics, and visibly supported motion/VFX claims. Omit detailed audio claims until full exports, timelines, or source projects verify them.

## D-015 — Contact verification

- Date: 2026-07-19
- Status: accepted source values; infrastructure follow-up open
- Decision: retain `https://nosther.site`, `contact@nosther.site`, and existing social URLs. Missing web/mail DNS does not block Phase 2/3, but blocks final Preview acceptance and production launch until deployment DNS, MX, and send/receive tests pass.

## D-016 — Automotive evidence boundary

- Date: 2026-07-19
- Status: accepted
- Decision: automotive edits remain supporting motion/VFX work, are excluded from hero and the top three, and carry the approved bilingual third-party-footage disclosure. Source and licensing details remain unresolved factual follow-up.

## D-017 — Typed content scope

- Date: 2026-07-19
- Status: accepted
- Decision: update safe existing localized project/dictionary fields and editorial array order during Phase 1. Defer explicit source-title, classification/rank, disclosure, evidence, and multi-surface hero fields until their relevant component/schema phase rather than overloading unrelated fields.

## D-018 — Phase 2 visual calibration

- Date: 2026-07-19
- Status: accepted implementation checkpoint
- Decision: use the exact approved foam/ice/aqua/tidal/ocean/deep/ink palette, retain the existing local Archivo/Instrument Sans/IBM Plex Mono stack, cap the shared container at `92rem`, use responsive gutters up to `4.5rem`, and establish static CSS grain/caustic plus selective milky glass.
- Scope: header, footer, global primitives, inherited colors, borders, section atmosphere, and typography/proportion corrections only. No JSX structure, section order, content schema, playback policy, GSAP timeline, or hero/project composition was changed.
- Accessibility evidence: core foreground/background pairs meet WCAG AA in calculated contrast checks; the 320px viewport has no content-width overflow; Turkish hero scaling is localized to prevent crowded diacritics.

## D-019 — Phase 3 Cinematic Sequence Stage

- Date: 2026-07-19
- Status: accepted implementation checkpoint
- Decision: implement approved Set 3 as one static editorial sequence using a BeamNG performance comparison at 5.3s, an Assetto guide cutaway at 13.7s, and a BeamNG cargo insert at 8.7s. Store traceable optimized WebP derivatives under `public/media/hero/` and typed source metadata in `src/content/media.ts`.
- Playback: only the dominant BeamNG performance preview may mount. It requires a viewport wider than 767px plus the established fine-hover, reduced-motion, save-data, codec, visibility, and intersection checks. Narrow mobile is explicitly poster-only; secondary surfaces never mount video.
- Scope: the existing hero intro/replay and whole-stage scroll lifecycle remains unchanged. No GSAP choreography, later-section layout, project-card architecture, navigation, route, SEO, or security implementation is redesigned in Phase 3.
- Accessibility: the stage has a localized group label, every media surface has a meaningful localized image description, decorative sequence cues are hidden, frames are non-focusable, and CSS-backed labeled fallbacks remain visible if a poster fails.
