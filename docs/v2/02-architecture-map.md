# Architecture map

## Stack

- Next.js 16.2.10 App Router, React 19.2.7, TypeScript 5.9.3
- CSS Modules plus global design tokens
- GSAP 3.15 with ScrollTrigger and SplitText
- Lenis 1.3.25 for smooth wheel scrolling
- Framer Motion 12.42.2 for the mobile menu
- Self-hosted Fontsource packages: Archivo Variable, Instrument Sans Variable, IBM Plex Mono
- npm lockfile workflow; Vercel is named as the production platform in README
- GitHub Actions CI at `.github/workflows/ci.yml`

No test runner or platform-specific Vercel configuration is committed.

## Routing and rendering

| Route/file | Rendering | Responsibility |
| --- | --- | --- |
| `src/proxy.ts` | Proxy/middleware | Redirects `/` using locale cookie, `Accept-Language`, then English. |
| `src/app/[locale]/layout.tsx` | Server layout | Generates locale params/metadata, loads fonts/global CSS, sets `<html lang>`, wraps client runtimes. |
| `src/app/[locale]/page.tsx` | Server page | Validates locale, loads dictionary, composes the one-page portfolio. |
| `src/app/[locale]/not-found.tsx` | Server | Locale 404. |
| `src/app/global-not-found.tsx` | Server | Global bilingual 404 using experimental global not-found. |
| `src/app/icon.tsx` | Server image route | Generated brand icon. |
| `src/app/robots.ts` | Server metadata route | Robots/host/sitemap. |
| `src/app/sitemap.ts` | Server metadata route | EN/TR URLs and alternates. |

`generateStaticParams()` emits `en` and `tr`; the production build reports both as SSG.

## Locale architecture

- Locale type and content types: `src/content/types.ts`
- Dictionaries: `src/content/dictionaries.ts`
- Locale validation/default/dictionary selection: `src/lib/i18n/config.ts`
- Root selection: `src/proxy.ts`
- Manual switch and persistence: `src/components/locale-toggle/locale-toggle.tsx`
- Cookie and localStorage share the key `nosther_locale`; the proxy reads the cookie.
- Locale transitions use `sessionStorage` key `nosther_skip_hero_intro` to avoid replaying the intro.

## Page composition

`HomePage` renders, in order: StructuredData, skip link, SiteHeader, Hero, SelectedWork, Services, NoteZ, About, Phase2DMotion runtime, Contact, Footer.

## Client/server boundaries

Server components: locale layout/page, About, Services, NoteZ, Footer, StructuredData, 404s, metadata routes.

Client components/runtimes: ClientProviders, SmoothScrollProvider, MotionRuntime, CustomCursor, MagneticRuntime, SiteHeader, LocaleToggle, Hero, HeroMedia, SelectedWork, ProjectCard, Phase2DMotion, Contact.

Passing server-rendered children through `ClientProviders` does not convert the entire subtree into client-authored source, but the provider installs global client runtimes around it.

## Providers and global runtimes

`ClientProviders` nests `SmoothScrollProvider`, then mounts GSAP preload, custom cursor, and magnetic runtime before page children. `SmoothScrollProvider` dynamically imports/uses GSAP and constructs Lenis only when reduced motion is off.

## Hooks and utilities

- `use-video-playback-policy.ts`: reduced motion, save-data, MP4, and optional fine-hover gate.
- `use-prefers-reduced-motion.ts`: reactive media-query state; conservative `true` initial state.
- `use-pointer-motion-policy.ts`: fine hover mouse plus no reduced motion.
- `use-project-card-tilt.ts`: delegated pointer tilt and cleanup.
- `use-gsap-scope.ts`: reusable scoped GSAP helper; currently no caller was found.
- `gsap-client.ts`: one dynamic registration promise for GSAP plugins.
- `hero-intro.ts`: module/session state for intro replay policy.
- `pointer-events.ts`: custom cursor copy-state event name.

## Content and media

- Dictionaries: `src/content/dictionaries.ts`
- Projects: `src/content/projects.ts`
- Services: `src/content/services.ts`
- Hero media config: `src/content/media.ts`
- Media root: `public/media/automotive`, `projects`, `notez`, `portrait`
- Social/SEO constants: `src/lib/seo/site.ts`

There is no CMS or remote content layer; content is typed local source.

## SEO and structured data

Localized metadata is generated in the locale layout with canonical URLs, hreflang, Open Graph, and Twitter cards. `robots.ts`, `sitemap.ts`, `og.png`, generated icon, and WebSite/Person JSON-LD complete the system. Schema values come from `src/lib/seo/site.ts` and `StructuredData`.

## Security

`next.config.ts` adds production-only CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP, and DNS-prefetch control. CSP limits frames/objects and media/images/fonts/connects to the site as configured. Form action permits same-origin and `mailto:`.

## Deployment and CI

README identifies `https://nosther.site` on Vercel. No `vercel.json` or other platform-specific deployment config was found, so deployment behavior may live in Vercel project settings and must be verified before Preview Deployment work.

GitHub Actions runs the `verify` job on every pull request and on pushes to `main`. It uses `ubuntu-latest`, Node 22 with npm caching, a 15-minute job timeout, read-only repository contents, and the locked dependency workflow. Steps are checkout, `npm ci`, lint, TypeScript typecheck, production build, and `npm audit --audit-level=high`. Concurrency key `ci-${{ github.workflow }}-${{ github.ref }}` with cancellation enabled prevents stale runs for the same ref from consuming capacity.
