# V2 invariants

These are release-blocking behaviors unless a change is explicitly approved, documented in the decision log, and replaced with equivalent or better verified behavior.

## Localization

- `/en` and `/tr` remain statically generated and independently indexable.
- `/` selects a locale from the persisted `nosther_locale` cookie, then browser `Accept-Language`, then English.
- Manual locale switching preserves the current hash, persists preference, and does not replay the full hero intro during the locale transition.
- Copy, labels, metadata, alt text, navigation, SEO, and structured data remain coherent in both languages.

## Media and interaction

- Project preview video is requested lazily on hover or keyboard focus only when policy allows.
- Only one project preview plays at a time.
- Leaving/blur/visibility loss stops and resets the preview.
- Coarse pointers, touch devices, reduced-motion users, save-data users, unsupported MP4 environments, and failed video sources receive poster-led fallbacks.
- Hero media pauses when out of view or the document is hidden and falls back when poster/video loading fails.
- Real portfolio media replaces placeholders; third-party footage remains accurately disclosed.

## Motion and input

- Reduced motion disables Lenis, custom cursor, magnetic motion, tilt, GSAP section motion, and video playback policy where applicable.
- Custom cursor and magnetic/tilt behavior run only for fine mouse pointers with hover and no reduced-motion preference.
- Keyboard users can reach the same project links/actions as pointer users; focus previews remain supported.
- Touch never relies on hover-only information.
- Every animation registers cleanup for media-query changes, unmounts, document visibility, frames, timers, observers, and global listeners.

## Accessibility

- Keep the skip link, landmark structure, heading hierarchy, semantic links/buttons, focus visibility, mobile-menu focus trap/Escape behavior, and polite copy-email announcement.
- Avoid content hidden indefinitely while animation libraries or fonts fail.
- Media, glass, and texture must preserve contrast and legibility.

## SEO and platform

- Preserve localized metadata, canonical/hreflang alternates, Open Graph/Twitter image metadata, sitemap, robots, icon, and JSON-LD.
- Preserve production CSP and security headers unless a reviewed requirement forces a documented change.
- Keep production source maps disabled and the production console clean.
- Continue to build successfully with the locked npm workflow.

## Release safety

- No production promotion without approval.
- Preview Deployment plus TR/EN, viewport, input-mode, reduced-motion, media-fallback, console, and Lighthouse checks is the release gate.
- Never invent project evidence, clients, metrics, outcomes, testimonials, or availability.
