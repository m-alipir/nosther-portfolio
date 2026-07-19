# Media and content requirements

## Audited repository media

| Use | Asset pair | Approved treatment |
| --- | --- | --- |
| BeamNG settings guide | `youtube-01-poster.webp` + preview | Flagship 2; approved hero dominant-wide source. |
| Assetto setup guide | `youtube-02-poster.webp` + preview | Flagship 1; source for a future hero portrait crop/cutaway from the same project. |
| AC Rally episode | `youtube-03-poster.webp` + preview | Supporting self-produced entertainment work. |
| BeamNG cargo episode | `youtube-04-poster.webp` + preview | Flagship 3; approved hero detail/secondary source. |
| Automotive edits | Horizontal and vertical poster/preview pairs | Supporting motion/VFX evidence only; third-party footage; excluded from hero and top three. |
| NoteZ | `notez-cover.png` | Real secondary Experiments screenshot. |
| About identity | `portrait/Logo-V2.png` | Approved future primary N0STHER identity portrait / brand portrait; illustrated mark, not a photograph. |
| Older identity | `portrait/Logo.png` | Secondary identity mark only; do not use as the main About visual. |

All six previews are H.264 video-only with matching posters; none contains audio. Detailed metadata is in [13-media-inventory.md](13-media-inventory.md).

## Phase 1 content policy

- Use professional localized display titles; preserve original Turkish YouTube titles as source metadata when a dedicated schema field is introduced.
- Keep public contribution claims to full video production, recording, screen/game capture, editing, tutorial/instructional structure, captions/callouts, comparison graphics, and visibly supported motion graphics/VFX.
- Omit sound design, audio cleanup, mixing, restoration, and music-sync claims pending source/full-export review.
- Disclose automotive work exactly as approved in both languages and never imply source-footage ownership.
- Use the typed array order as the current editorial order; add explicit `sourceTitle`, `editorialClass`/`featuredRank`, `disclosure`, evidence, and hero-surface fields when the relevant component is rebuilt rather than overloading existing fields.

## Static hero requirements for Phase 3

Candidate Set 3 is approved as the planning default:

- BeamNG settings/performance wide frame
- a portrait crop/cutaway derived from the Assetto guide source project
- BeamNG cargo or strongest available secondary detail frame

Phase 3 must select real frames, record crop provenance, create optimized poster/fallback assets, and use real sequence metadata. The Assetto portrait is a crop from the same project, not a separate vertical production. Only one surface may become playback-eligible at a time, with poster-led touch/reduced-motion states. Automotive media is excluded. A broader non-gaming sample is optional and does not block implementation.

## Selected Work requirements

- Preserve the approved top-three order independently of incidental layout logic once the schema is expanded.
- Keep project-specific TR/EN copy, role, year, tools, platform, format, and destination truthful.
- Map every visible capability to observable or repository-verifiable evidence.
- Use outcomes only when verified; publication on N0STHER is the only current public outcome claim.
- Retain automotive edits under supporting work with the approved disclosure and unresolved source/license note.

## Phase 4 Selected Work result

- Explicit typed `featuredRank` values fix Assetto, BeamNG Performance, and BeamNG Cargo at 1–3 independently of CSS or incidental card layout.
- `editorialClass`, original `sourceTitle`, localized contribution lists, exact `disclosure`, and localized `posterAlt` fields map visible proof without adding presentation measurements to content.
- AC Rally and the two automotive edits sit after the flagship trio in a smaller supporting evidence rail. Automotive contribution remains editing/VFX only.
- All posters are lazy below the hero. Existing pointer/focus preview assignment, one-active coordinator, touch/reduced-motion policy, cleanup, and error return are preserved.
- Source mapping and exact disclosure placement are recorded in [25-selected-work-source-map.md](25-selected-work-source-map.md).

## About, Experiments, and Contact

- Build an identity-led About around approved `Logo-V2.png` without claiming photography; allow a future real image without a complete restructure.
- Treat `Logo-V2.png` as the primary N0STHER identity portrait / brand portrait and describe it as an illustrated brand asset, not a photograph of Ali.
- Keep `Logo.png` secondary and never use it as the main About visual. Never substitute AI/stock editor photography.
- Keep NoteZ secondary to portfolio evidence.
- Keep `https://nosther.site` and `contact@nosther.site` as approved source values.
- DNS/MX and email delivery do not block Phase 2/3, but must pass before final Preview acceptance or launch.

## Phase 3 readiness

Phase 1 decisions are complete and static Phase 3 is not blocked by missing broader work, audio proof, automotive licensing, photography, or DNS. Exact hero frame/crop selection is part of the static Phase 3 task. Final Preview acceptance remains blocked until the domain is connected, MX is configured, and email send/receive is verified.
