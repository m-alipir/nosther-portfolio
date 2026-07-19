# V2 implementation plan

Each phase is a separate review gate. A phase begins only when its listed dependencies and user decisions are satisfied. Commands are run from the repository root.

## Phase 0 — Baseline and safe workspace

**Objective:** Freeze trustworthy V1 evidence and establish a safe V2 documentation branch without production changes.

**Files likely affected:** `AGENTS.md`, `design.md`, `docs/v2/**`; no production-facing components or styles.

**Dependencies:** Clean Git inspection; locked dependency workflow; repository, preserved handoff/full-page reference, and accessible browser tooling.

**Risks:** Committing unrelated work; treating placeholder reference content as real evidence; silently changing baseline failures; accidentally deploying.

**Acceptance criteria:** `v2/tidal-glass` exists from the known main commit; install/lint/typecheck/build/test/CI status recorded; architecture/content/motion/visual audits complete; references preserved; screenshots captured where reliable; evidence limits explicit.

**Verification commands:** `git status --short --branch`, `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, plus repository test command when one exists.

**Required user decisions:** Approve the corrected Phase 0 checkpoint before or as part of proceeding to Phase 1.

## Phase 1 — Real content and media mapping

**Checkpoint status (2026-07-19):** approved. Typed project/dictionary copy and documentation record the verified direction; no visual implementation or media derivation was performed.

**Objective:** Replace generic/temporary planning inputs with verified real portfolio content and a media map.

**Files likely affected:** `src/content/projects.ts`, `media.ts`, `services.ts`, `dictionaries.ts`, `types.ts`; new optimized files under `public/media`; docs content/media decision updates.

**Dependencies:** Approved flagship order, conservative contribution policy, bilingual copy, About direction, and hero planning set. All are resolved for implementation planning.

**Risks:** Unsupported claims; Turkish-only EN fields; oversized media; exposing unlicensed footage; letting current array order dictate editorial importance.

**Acceptance criteria:** Flagship order and evidence approved; visible projects have specific TR/EN copy and conservative metadata; the hero source set is approved for later crop/asset work; capability claims map to proof; automotive disclosure is explicit; no placeholder content.

**Verification commands:** `npm run lint`, `npm run typecheck`, `npm run build`; media-path existence/size audit; manual TR/EN content review.

**Resolved decisions:** Assetto, BeamNG settings, then BeamNG cargo are the flagship trio; Set 3 is the hero planning default; audio claims are omitted; automotive is disclosed supporting work; About is identity-led without photography; NoteZ remains secondary. Remaining factual follow-ups are non-blocking except domain/email readiness at final Preview/launch.

## Phase 2 — Global visual system

**Checkpoint status (2026-07-19):** implemented and verified. The semantic palette, type/spacing/container scale, shared surface/glass/texture primitives, floating header, deep About field, light Contact close, and minimal deep footer are established without layout or motion architecture changes.

**Objective:** Establish the light-first Tidal Glass Editorial foundation without rebuilding section composition or adding new motion.

**Files likely affected:** `src/app/globals.css`, shared primitives/tokens if introduced, header/footer CSS Modules, possibly font imports; `design.md` only for approved refinements.

**Dependencies:** Approved visual reference/evidence, real-media color tests, accessibility contrast review, stable content lengths.

**Risks:** Global regressions to focus, buttons, custom cursor, motion variables, dark section contrast, Turkish line lengths; expensive blur/grain/caustic effects.

**Acceptance criteria:** Approved color/type/spacing/container/glass/texture primitives; no purple/neon/literal-ocean drift; static reduced-motion-safe texture; old sections remain functional while restyled incrementally; contrast passes.

**Verification commands:** `npm run lint`, `npm run typecheck`, `npm run build`; visual checks at 1366x768, 1440x900, 1920x1080, tablet, mobile; TR/EN; keyboard focus; reduced motion.

**Resolved decisions:** use the approved ocean palette; retain the current local font stack; use static low-opacity grain/caustic layers; keep glass milky, thin-edged, and selective; add no font dependency or licensed-font risk.

## Phase 3 — Static hero

**Checkpoint status (2026-07-19):** implemented and verified. The V1 split hero and temporary automotive source are replaced by the static Cinematic Sequence Stage using approved Set 3, three traceable optimized posters, one playback-eligible dominant surface, localized line breaks/metadata, resilient poster fallbacks, and responsive three-to-two-surface adaptation without new GSAP.

**Objective:** Build and approve the static Cinematic Sequence Stage using real media. No GSAP until the static composition is approved.

**Files likely affected:** a new V2 hero component/CSS Module, `src/components/hero/**`, hero media content/types, locale dictionaries; existing playback policy reused where possible.

**Dependencies:** Phase 1 hero source set and copy; Phase 2 primitives. Exact frames, derived crop, fallback posters, and timecode metadata are produced and approved within this static phase.

**Risks:** Repeating the unapproved split hero; random collage; multiple simultaneous videos; TR overflow; 90–100svh failure at 1366x768; accessibility loss; placeholder UI cues.

**Acceptance criteria:** One dominant wide, one portrait, one detail frame read as one sequence; static poster state is compelling; media/typography are visibly connected; sequence track/timecode are restrained and real; desktop targets fit intentionally; tablet/mobile adaptation follows desktop approval; no new GSAP.

**Verification commands:** standard lint/typecheck/build; screenshot comparison at all three desktop targets, then tablet/mobile; TR/EN; keyboard order; touch/reduced-motion poster state; media error simulation.

**Resolved decisions:** BeamNG performance at 5.3s is the dominant wide frame and sole preview-eligible surface; Assetto at 13.7s is a clearly labeled cutaway; BeamNG cargo at 8.7s is the detail insert. Desktop/tablet use all three surfaces, narrow mobile omits the insert and is poster-only. TR/EN have explicit typed headline lines and localized sequence metadata.

## Phase 4 — Selected Work

**Checkpoint status (2026-07-19):** implemented and verified. The approved top three use explicit typed ranks and distinct flagship, comparison, and narrative compositions; AC Rally and disclosed automotive studies follow in a smaller evidence rail; the existing preview coordinator and policy remain singular.

**Objective:** Recompose portfolio proof around flagships and supporting work while preserving tested preview behavior.

**Files likely affected:** `selected-work.tsx/.module.css`, `project-card.tsx/.module.css`, project content/types, section-specific motion temporarily simplified or disabled during static approval.

**Dependencies:** Approved flagship order/evidence; Phase 2 primitives; approved posters/previews; baseline preview invariants.

**Risks:** Breaking one-at-a-time playback, focus preview, touch/reduced-motion posters, external-link semantics, array-index motion/layout coupling, media performance.

**Acceptance criteria:** Clear flagship hierarchy; asymmetrical editorial rhythm without bento overload; every card communicates specific evidence; keyboard and mouse parity; only one preview plays; posters remain complete on touch/reduced motion; failures stay graceful.

**Verification commands:** standard commands; focused browser tests for hover/focus switching, blur/visibility reset, touch/coarse pointer, reduced motion, failed source; viewport and locale screenshots.

**Resolved decisions:** Assetto is the dominant flagship; BeamNG Performance is the major text-first comparison composition; BeamNG Cargo is the compact narrative composition. AC Rally remains supporting self-produced evidence. Automotive edits remain smaller, carry the exact bilingual disclosure, and claim editing/VFX only. `Logo-V2.png` is approved and tracked for future About use without implementing About in this phase.

## Phase 5 — Supporting sections

**Objective:** Complete Capabilities, About, Experiments, Contact, and Footer in the new hierarchy.

**Files likely affected:** `services`, `about`, `notez-feature`, `contact`, `footer`, `site-header` components/CSS and dictionaries/content.

**Dependencies:** Phase 2 system; verified About/contact/experiment content; approved `Logo-V2.png` identity-led About direction; capability mapping.

**Risks:** Experiments competing with portfolio; deep section contrast failures; long TR copy; clipboard/social link regressions; mobile menu changes.

**Acceptance criteria:** Capabilities use a precise list; About owns the deep-ocean field; Experiments is visibly secondary; Contact is direct and verified; footer/header remain accessible; no placeholders or unsupported claims.

**Verification commands:** standard commands; TR/EN content/overflow review; keyboard/mobile menu/clipboard/live-region tests; link verification; viewport screenshots.

**Required user decisions:** Final About copy, capability labels, and contact presentation. Photography remains optional; verified availability wording is omitted unless later supplied.

## Phase 6 — Motion and interaction

**Objective:** Add only approved motion: hero sequence reveal, subtle scroll progression, media masks, ambient caustic motion, and light-to-depth transitions with simplified mobile behavior.

**Files likely affected:** hero/work/supporting-section motion modules, `phase-2d-motion`, motion hooks/runtimes, related CSS.

**Dependencies:** Approved static Phases 3–5; performance budget; motion storyboards; reduced-motion still states.

**Risks:** Scroll jank, content flash/hiding, transform conflicts, excess ScrollTriggers, simultaneous video/texture motion, Lenis interaction, cleanup leaks, motion sickness.

**Acceptance criteria:** One purposeful motion idea per section; strong initial static render; no concealed content on failure; reduced-motion complete; mobile simpler; only one preview/video priority; listeners/triggers clean up; target hardware feels calm and responsive.

**Verification commands:** standard commands; reduced-motion, keyboard, mouse, touch, visibility/resize tests; console inspection; performance recording and ScrollTrigger/listener audit at primary viewports.

**Required user decisions:** Approve hero motion storyboard, caustic intensity, scroll progression, and any simplification/removal of V1 cursor/magnetic/tilt behaviors.

## Phase 7 — QA and Preview Deployment

**Objective:** Prove V2 across content, behavior, accessibility, performance, security, SEO, and deployment before any production discussion.

**Files likely affected:** only scoped fixes, tests, QA docs, and deployment metadata required for Preview; no production promotion.

**Dependencies:** Feature-complete V2; Preview Deployment access/config; final content and media approval.

**Risks:** Environment-only failures, CSP/media errors, locale routing/cookie differences, real-device touch issues, missing OG/structured data updates, production accidentally promoted.

**Acceptance criteria:** QA checklist complete at 1366x768, 1440x900, 1920x1080, tablet, mobile; TR/EN; keyboard/touch/mouse/reduced motion; fallbacks; console; Lighthouse; headers/SEO; Preview URL reviewed and approved. Production remains unchanged.

**Verification commands:** clean `npm ci`, standard commands, repository tests, Preview smoke tests, Lighthouse, response-header checks, robots/sitemap/JSON-LD/OG validation.

**Required user decisions:** Preview approval; explicit decision on whether to open a separate production-promotion task.
