# Phase26.002 connection management references

Existing native Stitch project: [CongDongNgonNgu global shell](https://stitch.withgoogle.com/projects/3718538619973058970), design system assets/16442026920550574436. Be Vietnam Pro; existing navy/orange/neutral tokens and shared UI primitives remain authoritative.

Generated and visually inspected before implementation:

- Desktop body1440: projects/3718538619973058970/screens/3f2c9d8b9caf4b88819a63ec770eff68.
- Mobile body390: projects/3718538619973058970/screens/f9beed1b29fa4c9e820e689893da3d54.

The earlier desktop1a91495559634ed3a11a0d4d3b19cd57 included unsupported timestamps/languages/notes/counts and QA panels. Its edit response did not persist; that screenshot was rejected and replaced with the clean desktop above.

Implementation composes the established shell and adds only the bounded body: title/intro, three list selectors, initials, full wrapping displayName, current relationship state, profile link and supported request/cleanup actions. No fabricated counts or messaging shortcuts. Incoming actions form two equal columns on mobile; links/buttons target44px and focus uses native tokens. Connected removal requires shared Dialog confirmation. Loading/empty/empty-with-next-cursor/error/disabled/auth loss and VI/EN copy are explicit.

Verification evidence is in EVIDENCE.md. Generated references and local synthetic browser AX are not genuine TEST runtime acceptance. Required responsive/focus matrix remains NOT_RUN until the browser connection recovers and exact-main deployments are proved.
