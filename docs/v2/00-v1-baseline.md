# V1 baseline

Audit date: 2026-07-19 (Europe/Istanbul)

## Git safety

- Starting branch: `main`
- Starting commit: `cf5f704132519611c3b06ad05e393c5e5f297a69`
- Starting status: clean and aligned with `origin/main`
- Audit branch: `v2/tidal-glass`, created from that commit
- Workspace choice: the existing Codex workspace is already isolated and was clean, so the branch was created in place rather than adding a nested or external worktree.
- No reset, force update, deletion of user work, commit, push, deployment, or production promotion occurred.

## Environment

| Item | Value |
| --- | --- |
| OS | Microsoft Windows NT 10.0.26200.0 |
| Shell | PowerShell |
| Node.js | 24.16.0 |
| npm | 11.13.0 |
| Package manager | npm with `package-lock.json` |
| Next.js | 16.2.10, Turbopack build |
| React | 19.2.7 |
| TypeScript | 5.9.3 |
| Local production server | `next start`, inspected through the in-app browser |

The build reported `.env.local` as an environment source. Its contents were not inspected or recorded.

## Commands and results

| Command | Result | Notes |
| --- | --- | --- |
| `npm ci` | PASS | 353 packages added; 354 audited; 0 vulnerabilities. |
| `npm run lint` | PASS | ESLint completed with no findings. npm reported that 12.0.1 is available; this is informational. |
| `npm run typecheck` | PASS | `tsc --noEmit` completed with no diagnostics. |
| `npm run build` | PASS | Optimized production build compiled; TypeScript and static generation passed. Seven static pages generated. |
| Tests | NOT AVAILABLE | No test script and no Jest, Vitest, or Playwright configuration were found. GitHub Actions verifies install, lint, typecheck, build, and dependency audit instead. |

Build output confirmed static `/en` and `/tr` routes, static icon/robots/sitemap/not-found output, and the root proxy.

Warnings/observations:

- Next.js labels `experimental.globalNotFound` as an experiment; the build passed.
- npm printed a major-version update notice. The audit did not change npm or dependencies.
- GitHub Actions CI exists at `.github/workflows/ci.yml`. It runs for every pull request and pushes to `main`, with read-only contents permission, Ubuntu, a 15-minute timeout, Node 22 and npm cache. It executes `npm ci`, lint, typecheck, production build, and `npm audit --audit-level=high`.
- CI concurrency is grouped by workflow and Git ref; `cancel-in-progress: true` cancels superseded runs for the same workflow/ref.

Local production smoke checks returned HTTP 200 for `/en`, emitted the configured CSP/HSTS/X-Content-Type-Options/X-Frame-Options/Referrer-Policy/COOP headers, and produced no browser warnings or errors during the EN/TR viewport run. Clicking the TR locale control navigated from `/en` to `/tr`; a subsequent visit to `/` resolved to `/tr`, confirming persisted manual locale selection without directly inspecting browser storage.

## Browser baseline evidence

Stable above-the-fold captures were taken only after `data-hero-motion="ready"` at:

- EN: 1366x768, 1440x900, 1920x1080, 768x1024, 390x844
- TR: 1440x900, 390x844

Artifact directory: `C:/Users/Mali/.codex/visualizations/2026/07/19/019f7af5-5c58-7171-baf2-88693320cbb3/v1-baseline/`

The browser’s stitched full-page mode duplicated GSAP-driven viewport content and was rejected as unreliable evidence. Exact viewport screenshots were preserved instead. Browser tooling did not expose a supported reduced-motion emulation control, so no reduced-motion screenshot was captured; reduced-motion behavior was audited from source and remains a required manual/Preview QA item.

## Reference evidence

Phase 0 was corrected after the handoff and 2560×6753 Lovable full-page screenshot were supplied. Byte-identical copies are preserved at:

- `docs/v2/references/nosther-portfolio-v2-handoff.md`
- `docs/v2/references/lovable-v2-fullpage-reference.jpg`

The live Lovable URL still returned “No published build” during the original audit. The preserved screenshot is therefore the stable visual reference. It confirms compositional direction but contains placeholder/stock content and invented proof that is explicitly excluded from V2.

## Baseline visual summary

V1 is dark-first: near-black fields, warm paper typography, muted gray copy, and a restrained red accent. Archivo Variable drives heavy display text; Instrument Sans drives body copy; IBM Plex Mono carries metadata. Desktop uses a 12-column split hero and asymmetrical work grid; tablet/mobile stack the hero and collapse navigation. The current visual system is documented for preservation/reference, not for direct reuse as V2’s light-first palette.

## Extracted V1 visual system

| Area | Current system |
| --- | --- |
| Color | Ink `#0a0a0b` through `#2a292b`; warm paper `#f1eee8`, `#c8c3bb`, `#918c85`; red `#de7a76`, `#c55252`, `#a93f43`; success `#74a785`. `color-scheme: dark`; no light theme. |
| Typography | Archivo Variable display, Instrument Sans Variable body, IBM Plex Mono metadata. Hero `clamp(3.25rem, 7vw, 10rem)`; section `clamp(2.5rem, 4.4vw, 5.5rem)`; body roughly 1–1.125rem. Heavy negative tracking and compact display line-height. |
| Spacing | 0.25rem–6rem token scale; section spacing `clamp(5.5rem, 9vw, 9.5rem)`; hero targets 92svh on desktop. |
| Container | `clamp(90rem, 84vw, 176rem)` maximum token with fluid gutters `clamp(1.25rem, 4.4vw, 8rem)`. On ordinary desktops this produces a wide editorial field with side gutters. |
| Grid | 12 columns on desktop; 8-column hero tablet; one-column mobile. Work uses featured full-width, paired half-width, 8/4 landscape/portrait, and final wide roles tied to data indexes. |
| Buttons | Rectangular, mono uppercase, 1px borders, red primary and transparent secondary; magnetic CSS variables on opted-in controls. Minimal radii (2–6px; pill token exists but is not dominant). |
| Borders | Mostly 1px ink rules; section dividers and media/card frames establish rhythm. Red appears as active rules, metadata, and focus/selection accent. |
| Media | Edge-to-edge poster/video within hard editorial frames; object-fit cover; 16:9/16:10/9:14 ratios; opacity swap from poster to video; error fallback for hero. |
| Section rhythm | Dark base, slightly lighter Services/About/Footer fields, large vertical intervals, alternating split/list/media compositions, thin boundaries. |
| Responsive breakpoints | Primary motion/layout shift at 1200px/75rem; additional component changes near 1024px/64rem, 896px/56rem, 768px/48rem, 640px/40rem, and 576px/36rem. Ultra-wide type/media adjustments at 2560px/160rem. |
| Interaction | Visible red focus outline, skip link, underline/arrow hover, card hover scale/tilt, custom cursor, magnetic buttons, scroll reveals, Lenis. Reduced-motion CSS collapses transitions and component policies disable major runtimes. |
