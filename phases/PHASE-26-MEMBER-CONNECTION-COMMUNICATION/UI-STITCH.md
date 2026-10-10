# Phase26 native interface references

## Current003 implementation and local browser QA — 2026-10-10

Native implementation e5b33d50fd06de4d4b745b0d815ebc3299f9ddb9 follows the clean
desktop/mobile references below, using existing tokens and shared primitives.
Actual Chrome local component QA passed both locales at320/375/390/412/768/1024/
1440px, with long names and long unbroken plain message text. Visual inspection
refined mobile header wrapping. Keyboard focus, growing capped composer, single
send, preserved older-message scroll and jump/latest following were exercised.
Fixture files were removed; full frontend565 tests/build/type/performance passed.
See EVIDENCE.md for observed failures, corrections and evidence limitations.
003 subsequently completed integration/exact-main TEST HTTP/SSE acceptance and
terminal relay (PR153/main CI/cleanup PASS). Genuine deployed multi-account browser
acceptance remains pending for006.004 share dialog/card design preflight is pending;
no004 UI implementation is claimed.
The preflight section below records the state before this implementation.

## Phase26.003 direct text messaging preflight — 2026-10-10

Generated in the same native project/design system and downloaded for actual
visual inspection before UI implementation:

- Clean desktop: projects/3718538619973058970/screens/d95a2b6fbfed40e687dbf70b9008f024.
- Mobile390: projects/3718538619973058970/screens/d5077b4c8bfa473e8095077baeed59da.

Desktop uses a flat list/thread split; mobile shows a single conversation with
list backlink. Initials, wrapping names, plain chronological text, profile link,
inline reconnect feedback and a two-to-three-line composer follow native tokens.
Runtime unread counts may use only the authorized decimal-string API field;
the clean reference omits count badges. Keep the actual existing shell when
composing these body references. Sample names/messages/times are design examples,
not seeded product content or runtime evidence.

The initial desktop553925fbb02344269d551d008225309f was rejected for unsupported
encryption/security claims and total counts. Edit returned DOM operations but
downloaded files retained the old claims; the fresh clean desktop above replaces
it. No end-to-end encryption claim, presence, typing, read receipt, attachment,
call, AI/translation or contextual-resource UI is authorized by003. Contextual
sharing remains a later subphase. No messaging UI has been implemented or browser
accepted at this checkpoint; responsive/keyboard/runtime gates remain pending.

## Phase26.002 connection management references

Existing native Stitch project: [CongDongNgonNgu global shell](https://stitch.withgoogle.com/projects/3718538619973058970), design system assets/16442026920550574436. Be Vietnam Pro; existing navy/orange/neutral tokens and shared UI primitives remain authoritative.

Generated and visually inspected before implementation:

- Desktop body1440: projects/3718538619973058970/screens/3f2c9d8b9caf4b88819a63ec770eff68.
- Mobile body390: projects/3718538619973058970/screens/f9beed1b29fa4c9e820e689893da3d54.

The earlier desktop1a91495559634ed3a11a0d4d3b19cd57 included unsupported timestamps/languages/notes/counts and QA panels. Its edit response did not persist; that screenshot was rejected and replaced with the clean desktop above.

Implementation composes the established shell and adds only the bounded body: title/intro, three list selectors, initials, full wrapping displayName, current relationship state, profile link and supported request/cleanup actions. No fabricated counts or messaging shortcuts. Incoming actions form two equal columns on mobile; links/buttons target44px and focus uses native tokens. Connected removal requires shared Dialog confirmation. Loading/empty/empty-with-next-cursor/error/disabled/auth loss and VI/EN copy are explicit.

Verification evidence is in EVIDENCE.md. Chrome local synthetic checks now cover320/375/390/412/768/1024/1440 without horizontal overflow,44px action targets, VI/EN long names, loading/error/empty/guest/empty-scan states and successful scan continuation. Native Dialog at320 traps Tab/Shift+Tab, closes on Escape and restores trigger focus. Text contrast minimum4.56:1; inspected desktop/mobile/dialog screenshots and no console errors/warnings. Disposable fixture files were deleted and never committed. Generated references, DOM/accessibility semantics and local synthetic checks do not establish genuine exact-main TEST acceptance or actual screen-reader testing; those remain pending.
