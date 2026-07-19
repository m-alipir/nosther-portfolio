# Media inventory

Metadata was extracted with local `ffprobe`. Sizes use KiB/MiB. All MP4 previews are H.264 High Profile, YUV 4:2:0, with no audio stream.

## Asset-level inventory

| Path | Project / type | Orientation, dimensions, ratio | Size / duration / codec | Pair availability | Visual content | Source/licensing | Potential use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `public/media/automotive/automotive-horizontal-poster.webp` | Horizontal automotive poster | Landscape, 1280×720, 16:9 | 30.2 KiB, WebP | Preview available | Dark BMW close-up with layered/glitch reflection | Third-party footage; source/license missing | Supporting motion/VFX work only; excluded from hero/top three |
| `public/media/automotive/automotive-horizontal-preview.mp4` | Horizontal automotive preview | Landscape, 1280×720, 16:9, 24 fps | 2.68 MiB, 20.208 s, H.264 ~1.11 Mb/s | Poster available | Multiple cinematic car angles, close-ups, glitch/double exposure, colored outline/VFX | Editing/VFX by Ali per repo; footage third-party; license missing | Supporting motion/VFX evidence only |
| `public/media/automotive/automotive-vertical-poster.webp` | Vertical automotive poster | Portrait, 720×1280, 9:16 | 52.6 KiB, WebP | Preview available | Rear three-quarter Porsche frame with particle overlay | Third-party footage; source/license missing | Supporting short-form work only; excluded from hero |
| `public/media/automotive/automotive-vertical-preview.mp4` | Vertical automotive preview | Portrait, 720×1280, 9:16, 59.94 fps | 3.36 MiB, 8.258 s, H.264 ~3.41 Mb/s | Poster available | Parking-garage car sequence, particles, blur/motion transitions, wheel/body details | Editing/VFX by Ali per repo; footage third-party; license missing | Supporting short-form evidence only |
| `public/media/projects/youtube-01-poster.webp` | BeamNG FPS guide poster | Landscape, 1280×720, 16:9 | 91.7 KiB, WebP | Preview available | Settings/performance tutorial imagery | Self-produced N0STHER project; game/UI third-party | Flagship #2; approved hero dominant-wide source |
| `public/media/projects/youtube-01-preview.mp4` | BeamNG FPS guide preview | Landscape, 1280×720, 16:9, 23.976 fps | 1.79 MiB, 12.554 s, H.264 ~1.19 Mb/s | Poster available | Settings menus, instructional text, Vulkan/DX11 comparison, FPS labels, gameplay | Repo credit includes audio; silent preview cannot verify it for public copy | Flagship #2; approved hero dominant-wide source |
| `public/media/projects/youtube-02-poster.webp` | Assetto guide poster | Landscape, 1280×720, 16:9 | 95.7 KiB, WebP | Preview available | Content Manager/mod tutorial and gameplay | Self-produced N0STHER project; game/software UI third-party | Flagship #1; source for future hero portrait crop |
| `public/media/projects/youtube-02-preview.mp4` | Assetto guide preview | Landscape, 1280×720, 16:9, 23.976 fps | 4.58 MiB, 22.773 s, H.264 ~1.69 Mb/s | Poster available | Desktop walkthrough, callouts/captions, UI changes, installation/configuration, gameplay checks | Repo credit includes audio; silent preview cannot verify it for public copy | Flagship #1; source for future hero portrait cutaway |
| `public/media/projects/youtube-03-poster.webp` | AC Rally Part 3 poster | Landscape, 1280×720, 16:9 | 182.1 KiB, WebP | Preview available | Stylized rally gameplay frame | Self-produced N0STHER project; game assets third-party | Supporting project; possible gameplay detail |
| `public/media/projects/youtube-03-preview.mp4` | AC Rally Part 3 preview | Landscape, 1280×720, 16:9, 23.976 fps | 8.35 MiB, 16.433 s, H.264 ~4.26 Mb/s | Poster available | Rally montage, repeated “Özet” framing, multiple terrain shots, stylized transition | Repo credit includes audio; silent preview cannot verify it for public copy | Supporting project; not preferred hero due weight/niche |
| `public/media/projects/youtube-04-poster.webp` | BeamNG cargo gameplay poster | Landscape, 1280×720, 16:9 | 123.2 KiB, WebP | Preview available | Truck/cargo gameplay narrative frame | Self-produced N0STHER project; game assets third-party | Flagship #3; approved hero detail/secondary source |
| `public/media/projects/youtube-04-preview.mp4` | BeamNG cargo gameplay preview | Landscape, 1280×720, 16:9, 23.976 fps | 5.94 MiB, 15.933 s, H.264 ~3.13 Mb/s | Poster available | Truck-loading story, multiple camera views, in-game driving, captioned/comedic beats | Repo credit includes audio; silent preview cannot verify it for public copy | Flagship #3; approved hero detail/secondary source |
| `public/media/notez/notez-cover.png` | NoteZ product screenshot | Landscape, 1182×734, ~1.61:1 | 103.3 KiB, PNG RGBA | No preview | Turkish productivity dashboard with task/status UI | Ali's linked NoteZ project; repository public | Experiments only; not primary hero or flagship |
| `public/media/portrait/Logo.png` | N0STHER identity image | Square, 1254×1254, 1:1 | 1.37 MiB, PNG RGB | No preview | Dark/red circular N monogram logo | Existing brand-owned repository asset | Secondary identity only; not suitable as About portrait or Tidal Glass hero |
| `public/media/portrait/Logo-V2.png` | Approved N0STHER brand portrait | Square, 1024×1024, 1:1 | 0.972 MiB, PNG RGBA; fully opaque sampled alpha | No preview | Blue illustrated N0STHER monogram/brand composition; not photographic | User-approved project asset | Future primary About identity visual; serve responsive derivatives, preserve master |

## Preview totals and performance

- Six previews: approximately 28.7 MiB total.
- Smallest: BeamNG FPS guide, 1.79 MiB.
- Largest: AC Rally Part 3, 8.35 MiB.
- All have web-ready dimensions and H.264 compatibility, but loading more than one hero video eagerly would be wasteful.
- Hero implementation should render all posters, request at most the selected active preview, and preserve the one-video-at-a-time invariant.

## Review artifacts

Each preview has an evenly sampled 12-frame contact sheet in `artifacts/v2-media-audit/`. `hero-candidate-overview.jpg` combines all six sheets. The directory is intentionally ignored and must not be committed.
