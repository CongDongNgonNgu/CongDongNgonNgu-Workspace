# Stitch MCP — Phase 03 Language Profile & Onboarding

## Prompt A — Onboarding Body
```text
Design a short, progressive onboarding body for CongDongNgonNgu.vn. Goal: learn enough about a new user to personalize language community and exchange without a bureaucratic questionnaire.

Capture: native/known languages, language(s) to learn, current level A1/A2/B1/B2/C1/C2 or Native where applicable, goals, preferred skills (speaking/listening/reading/writing/grammar/vocabulary), optional interests, timezone and optional availability. Essential fields first; optional information may be skipped and edited later.

Use searchable language selection that works with Vietnamese, English and CJK names; multi-select where needed. Show progress without implying a long process. Desktop may use one calm centered flow; mobile 320–412 must have easy thumb targets, resilient chips/comboboxes and back/continue controls that remain reachable above keyboard/safe area. Avoid separate card around every question.
```

## Prompt B — Language Passport
```text
Design the body of a Language Passport profile for CongDongNgonNgu.vn. It should quickly communicate native languages, learning languages and proficiency, goals/interests and later-compatible slots for Learning XP, Community Reputation and achievements. Do not invent points/badges when data is absent.

Create Own Profile and Public Profile variants with obvious edit/privacy controls only for owner. Support multilingual users, long language names and non-Latin scripts. Make proficiency understandable without relying only on flag icons. Desktop can use compact sections/rail; mobile should read like a clean identity profile, not a dashboard of cards.
```

## Canonical Passport screens

Stitch project: `projects/3718538619973058970`

| Surface | Viewport | Stitch screen | Canonical raster | Runtime raster | Comparison |
| --- | --- | --- | --- | --- | --- |
| Own Passport | 1440 | `5cc9fb0178c74faab11579982bcbc0e6` | `evidence/passport-stitch-own-desktop-1440.png` | `evidence/passport-runtime-own-desktop-1440.png` | `evidence/passport-side-by-side-own-desktop-1440.png` |
| Own Passport | 390 | `1858b4c2fecf43ec88c4e7a0cab5cad3` | `evidence/passport-stitch-own-mobile-390.png` | `evidence/passport-runtime-own-mobile-390.png` | `evidence/passport-side-by-side-own-mobile-390.png` |
| Public Passport | 1440 | `8b0e963342a74a3ba2a7190480a58c60` | `evidence/passport-stitch-public-desktop-1440.png` | `evidence/passport-runtime-public-desktop-1440.png` | `evidence/passport-side-by-side-public-desktop-1440.png` |
| Public Passport | 390 | `e081f1164d7641f08b237c3a21b8dfce` | `evidence/passport-stitch-public-mobile-390.png` | `evidence/passport-runtime-public-mobile-390.png` | `evidence/passport-side-by-side-public-mobile-390.png` |

Implementation intentionally omits unsupported XP, reputation, achievement, streak, rank,
contribution and location values. The public projection contains no owner-only email,
timezone, availability, roles or language visibility fields.
