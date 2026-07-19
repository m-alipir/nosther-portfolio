# Working agreement

This repository is the production-tested V1 of the ALI / N0STHER bilingual video-editing portfolio. Treat it as a maintained product, not as a disposable prototype.

## Non-negotiable rules

- Preserve V1 functionality unless a change is explicitly approved and its replacement is verified.
- Inspect the relevant implementation, content, media, and tests before editing.
- Work in small, reviewable, verified phases. Do not regenerate or rebuild the full site from scratch.
- Do not replace this repository with Lovable-generated code. Lovable is a visual reference only.
- Use real portfolio media. Never invent metrics, clients, testimonials, outcomes, awards, or project evidence.
- Keep TR and EN complete and equivalent. Do not ship untranslated fallback copy as final content.
- Do not promote or deploy to production without explicit approval. Use a Preview Deployment and verify it before any production promotion.
- Perform safe repository actions autonomously when possible instead of asking the user to run commands.
- Preserve unrelated local changes. Never reset, discard, force-update, or commit user work outside the active task.

## Verification contract

After every meaningful implementation phase, run:

```bash
npm run lint
npm run typecheck
npm run build
```

Run all repository tests when test scripts or test configuration exist. For UI phases, also verify:

- TR and EN
- desktop, tablet, and mobile
- 1366x768, 1440x900, and 1920x1080 desktop targets
- keyboard navigation and visible focus
- mouse hover/focus previews and the one-preview-at-a-time rule
- touch/coarse-pointer poster behavior
- reduced-motion behavior
- media errors and poster fallbacks
- console and production logs

Record commands, results, warnings, and limitations. Do not silently repair a pre-existing baseline failure; document it before proposing a fix.

## V2 workflow

- Work on `v2/tidal-glass` or a task branch derived from it.
- Follow [design.md](design.md) as the visual source of truth and `docs/v2/` as the audit, planning, and QA source of truth.
- Build the static composition before adding GSAP or scroll behavior.
- Prefer adapting existing localization, playback, motion-policy, accessibility, SEO, security, and media systems over rewriting them.
- Preview Deployment is the release gate. Production remains out of scope until approved.
