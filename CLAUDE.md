# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Bilingual (EN/TR) Next.js portfolio site for ALI / N0STHER, a video editor. Production domain: `nosther.site`, deployed on Vercel. This is a maintained product — treat it as production-tested, not a disposable prototype.

The repo is currently mid-redesign on branch `v2/tidal-glass` (a visual overhaul called "Tidal Glass"). `design.md` at the repo root is the visual source of truth for V2; `docs/v2/` holds the audit/planning/QA/decision-log trail for that redesign, and `docs/v2/01-invariants.md` lists release-blocking behaviors that must survive the redesign unchanged.

## Commands

```bash
npm run dev         # start dev server (localhost:3000)
npm run build        # production build
npm run start         # serve production build
npm run lint          # eslint (next/core-web-vitals + next/typescript)
npm run typecheck    # tsc --noEmit
```

There is no test script — verification is lint + typecheck + build, plus manual QA (see below). Run all three after every meaningful implementation phase.

On Windows, `siteyi-baslat.bat` opens the browser and runs `npm run dev`.

## Working rules (from AGENTS.md)

- Preserve existing functionality unless a change is explicitly approved and the replacement is verified.
- Read the relevant implementation, content, and media before editing — don't guess.
- Work in small, reviewable, verified phases. Do not regenerate or rebuild the site from scratch.
- Lovable-generated code/designs are visual reference only — never replace this repo's code with them.
- Use real portfolio media only. Never invent metrics, clients, testimonials, outcomes, or awards.
- Keep TR and EN complete and equivalent — never ship untranslated fallback copy as final content.
- Never promote to production without explicit approval. Use a Preview Deployment and verify it first.
- Preserve unrelated local/uncommitted changes — never reset, discard, or force-update user work outside the active task.
- On the V2 branch: build the static composition before adding GSAP/scroll behavior, and prefer adapting the existing localization/playback/motion-policy/accessibility/SEO/security systems over rewriting them.

## Manual QA checklist

For any UI-affecting change, verify (see `docs/v2/02-qa-checklist.md` for the full V2 checklist):

- Both locales: `/en` and `/tr`
- Desktop, tablet, mobile; desktop targets 1366×768, 1440×900, 1920×1080
- Keyboard navigation and visible focus
- Mouse hover/focus preview behavior, including the one-preview-at-a-time rule
- Touch/coarse-pointer poster fallback behavior
- `prefers-reduced-motion` behavior
- Media error and poster fallback paths
- Browser console and production logs are clean

Do not silently fix a pre-existing baseline failure — document it before proposing a fix.

## Architecture

**Routing & i18n.** App Router with a single dynamic `[locale]` segment (`src/app/[locale]/`); `en` and `tr` are statically generated via `generateStaticParams`. `src/proxy.ts` (Next's middleware, renamed) redirects `/` to a locale chosen from the `nosther_locale` cookie, then `Accept-Language`, then `defaultLocale` ("en"). Locale config and dictionary lookup live in `src/lib/i18n/config.ts`; all copy is defined in `src/content/dictionaries.ts` and typed through `src/content/types.ts`. There is no runtime i18n library — dictionaries are plain typed objects passed down as props.

**Content as data.** `src/content/{dictionaries,media,projects,services}.ts` are the single source of truth for copy, media paths, and project/service data. Components receive a `dictionary` (and `locale`) prop rather than importing translation hooks. When adding/editing site copy, edit these files, not JSX strings — and see `docs/nosther-content-agent.md` for the copywriting standing rules (single persona, no overclaiming, case-study template, EN/TR must match in register).

**Client runtime layering.** `src/providers/client-providers.tsx` composes the client-side singletons that wrap every page: `SmoothScrollProvider` (Lenis + GSAP ScrollTrigger sync) → `LoadingScreen` → `MotionRuntime` (lazy-loads and registers GSAP/ScrollTrigger/SplitText, re-runs `ScrollTrigger.refresh()` on resize/orientation/pageshow/visibility/font-load/lazy-media-load) → `CustomCursor` → `MagneticRuntime`. GSAP itself is dynamically imported once and memoized via `ensureGsapRegistered()` in `src/lib/motion/gsap-client.ts` — never import `gsap` directly in a component; go through that helper so registration happens exactly once, client-side only.

**Motion/interaction policy hooks.** `src/hooks/motion/` and `src/hooks/media/` centralize *when* animation/video is allowed to run, and every consuming component should defer to these rather than re-deriving the checks:
- `use-prefers-reduced-motion` — the base gate; reduced motion disables Lenis, custom cursor, magnetic/tilt motion, GSAP section motion, and video playback.
- `use-pointer-motion-policy` — fine pointer + hover + no reduced-motion, gates cursor/magnetic/tilt effects.
- `use-video-playback-policy` — reduced-motion, `navigator.connection.saveData`, MP4 support, and (optionally) fine-hover, gates project preview video playback.

Any new animation must clean up on unmount, media-query change, visibility change, and pending frames/timers/observers/listeners — this is a stated invariant, not just style.

**Security headers.** `next.config.ts` sets a strict CSP and related security headers (COOP, X-Frame-Options DENY, HSTS, Permissions-Policy, etc.), but only when `NODE_ENV === "production"` — headers are absent in dev. Changes to CSP/headers are release-sensitive; see `docs/manual-security-checklist.md` for the non-code (GitHub/Vercel/DNS/email) security checklist, which is tracked separately and nothing on it should be assumed done.

**Page composition.** `src/app/[locale]/page.tsx` is a flat, ordered list of section components: `Hero → SelectedWork → Services → About → Phase2DMotion → Contact`, wrapped by `SiteHeader`/`Footer` and a skip link. Each section is `src/components/<name>/<name>.tsx` + co-located `.module.css`. `Phase2DMotion` gates locale-specific decorative motion; do not assume it's a content section.

**Path alias.** `@/*` resolves to `src/*` (see `tsconfig.json`).

## Working directly with the design/content docs

- `design.md` — canonical visual spec for the V2 ("Tidal Glass") redesign: color tokens, typography, glass usage, motion principles, per-section direction, anti-patterns. Consult before making any visual change on `v2/tidal-glass`.
- `docs/v2/01-invariants.md` — behaviors that must not regress during the redesign (localization, media/interaction policy, motion cleanup, accessibility, SEO/CSP, release gating). Treat as a checklist against any V2 change.
- `docs/v2/02-qa-checklist.md`, `docs/v2/03-decision-log.md` — QA sign-off log and record of explicitly-approved deviations from invariants/baseline.
- `docs/nosther-content-agent.md` — standing rules for any copywriting task (positioning, tone, case-study structure, EN/TR parity). Written in Turkish; read it before touching `dictionaries.ts` copy.
