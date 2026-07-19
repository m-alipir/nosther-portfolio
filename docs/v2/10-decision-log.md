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

## Open decisions before Phase 1/3

- Which current projects are flagships, supporting work, or removed?
- What exactly did ALI do on each project?
- Which real media forms the three hero frames, and what are its rights/source notes?
- Should original Turkish YouTube titles remain with translated editorial titles in EN?
- Is `public/media/portrait/Logo.png` the approved About asset?
- Is the current starting palette calibration accepted after comparison with the preserved reference and real portfolio media?

## D-010 — Existing CI is part of the baseline

- Date: 2026-07-19
- Status: accepted correction
- Decision: `.github/workflows/ci.yml` is the committed CI source of truth. It verifies locked install, lint, typecheck, production build, and high-severity dependency audit on pull requests and pushes to `main`, using Node 22 and cancel-in-progress concurrency per ref.
