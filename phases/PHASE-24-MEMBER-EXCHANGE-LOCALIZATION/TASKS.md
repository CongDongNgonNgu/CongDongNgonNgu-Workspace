# Phase 24 Tasks

Owner authorized Phase24; copy contract locally frozen, integration pending. Downstream tasks follow this contract; completed `LNG-19-006` foundation is reused rather than reimplemented.

## LNG-24-001 — Freeze copy inventory, terminology and review ownership
**Status:** VERIFYING
**Depends on:** explicit Phase 24 authorization  
**Target repo(s):** Workspace / Frontend  

Inventory auth, onboarding/profile-language and exchange UI copy; define vi/en terminology, consent/legal ownership, safe error mapping and human English review disposition.

## LNG-24-002 — Localize authentication and onboarding/profile journey
**Status:** PLANNED  
**Depends on:** LNG-24-001  
**Target repo(s):** Frontend  

Move bounded existing member-entry strings into domain catalogs and verify locale persistence/fallback without changing auth/session/API semantics.

## LNG-24-003 — Localize language-exchange browse/detail journey
**Status:** PLANNED  
**Depends on:** LNG-24-001; stable existing exchange routes/contracts  
**Target repo(s):** Frontend  

Localize bounded exchange discovery/detail states while preserving learning-language meaning and existing matching/navigation contracts.

## LNG-24-004 — Accessibility, responsive and regression closeout
**Status:** PLANNED  
**Depends on:** LNG-24-002 and LNG-24-003  
**Target repo(s):** Frontend / Workspace  

Verify catalog completeness, safe errors, keyboard/a11y, long-copy stress, locale reload/switching, seven-width responsive runtime and relevant auth/navigation/exchange regression gates. Record human-copy-review state exactly as observed.
