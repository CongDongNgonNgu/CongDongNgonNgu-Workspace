# LNG-27-002 bounded acceptance

Status: DONE on 2026-10-13. Product integration, bounded native acceptance, exact fixture cleanup and WorkspacePR160/mainCI/remote-local branch cleanup passed. See final lifecycle in REVIEW-002.md. Phase27 verdict remains NOT_REACHED.

Backend main: 41781d9869cbb378c746ee0f3c63559b03284358. Frontend primary implementation: d89b1cb5947bb500369d3c8386c9b5453ddbedef; validation remediation: a742802a8e722f84cbb8871766bea777647af1fd; final mobile remediation: 80e138a3f8f8564fbb1fa7ffd21296daebe509c7 (main CI and exact provider Ready verified).

## Verified behavior

- Three fresh synthetic ordinary MEMBER accounts logged in through the native deployed UI in separate contexts. No real private-user data was used.
- A created a QUESTION; B answered with optional explanation; A voted and accepted. The original question appeared once, the answer workflow came first, and general discussion remained collapsed. A comment and B one-level reply persisted. No reply control existed under a structured response.
- A created a correction request; B submitted a changed proposal and explanation; A accepted. The comparison retained the canonical original and displayed changes.
- Three-row editors grew to 240px and scrolled internally. VI/EN switches preserved answer/proposal and explanation drafts; explanation disclosure retained its text. Offline failure retained the draft; retry after network restoration succeeded and cleared it.
- Replacement acceptance required the native confirmation dialog. Accept, replace, unaccept and reaccept left one active selection. Native keyboard Space/Enter operated discussion disclosure and preserved visible focus.
- Required field validation linked its error with aria-describedby and aria-invalid, and changed language with the locale. Server errors stayed global. Measured contrast samples were 12.07/12.75 for headings/labels/editor and 5.11 for the small hint. Focus outline was 3px.
- QUESTION/CORRECTION detail/editor and both request forms were measured at 320,375,390,412,768,1024,1440 in VI/EN. Open discussion controls and feed were also bounded. See matrix artifacts. These measurements do not infer untested states.
- Desktop report dialog had labeled fields, initial focus on Close, Escape dismissal and focus return to post options. Mobile menu and long-topic failures were reproduced, repaired and checked on the final deployed revision at all seven widths in both locales. C opened the mobile report dialog, submitted an explicitly synthetic SPAM report, and the post remained visible.

## Security proof

Four real competing-transaction SQL cases reject response hiding, author disabling, parent hiding and language disabling between precheck and acceptance. New isolated SQL14 cases and inherited connection/notification SQL75 cases passed, with disposable schema cleanup.

Deployed denials: own-response helpful403; unrelated requester acceptance403; cross-post acceptance404; structured response UUID as comment parent404; reply depth2 returns400. Own-post HELPFUL returned201, preserving its separate policy. A private transition removed B's stale question notification link, reduced unread2 to1 and denied its post API404; restoring PUBLIC succeeded.

## Review and integration

Independent backend and frontend reviews approved. Frontend review first reproduced locale-switch draft loss, duplicate React sibling keys, raw type metadata and empty-state spacing; all were repaired and independently rerun. Further field-association and mobile/long-topic issues were addressed through reviewed PR39/40. PR51 backend and frontend PR38/39/40 are merged with required main CI and remote/local branch cleanup verified. PR40 aggregate reviewed tree equals merged main; its individual commits are not claimed patch-equivalent after squash. Main CI38351036676/job115143255035 passed. Native logged-in Vercel dashboard showed deployment3VxJBvWciT1jp9Qyo5We9pYT7q6M Ready with full source80e138a3f8f8564fbb1fa7ffd21296daebe509c7. Backend Render dep-db6pc4nf3r2c73c07r60 Live and health200 were verified for41781d9869cbb378c746ee0f3c63559b03284358. Workspace final lifecycle subsequently completed throughPR160; see REVIEW-002.md.

## Limits

Automated axe was unavailable; screen reader NOT_RUN. Bounded manual accessibility is not full WCAG certification. The unrelated reviewer browser could not attach its own DevTools profile, so its guest runtime result is NOT_RUN; coordinator native proof is separate. Synthetic acceptance does not prove real-user value or production readiness. Phase28/29 remain unstarted.

Fixture run dac7b3fe-03da-481b-9fcd-e4a6ad74c514 was cleaned on the positively identified approved TEST. See evidence-002-cleanup.json: exact owned-row dependency closure deleted, all collected primary keys and notification references checked, users checked again after commit, residualRows=0. Earlier cleanup attempts rolled back on catalog name[] decoding and RESTRICT SQLSTATE23001; reviewed helper corrections preserved ownership and bounded fail-closed guards. Credentials are absent from evidence artifacts.


Independent final evidence review accepted the affected Community/Q&A technical EN target: question/correction detail, editors and request forms in VI/EN, plus scoped feed/discussion proof. COMMUNITY_QA_EN_TARGET_UI=ACCEPTED_BOUNDED supersedes only the corresponding Phase25 target hold. It does not establish whole-site translation quality, screen-reader coverage, full WCAG conformance, real-user value or production readiness. Matrix records retain their actual revisions and coverage; later CSS-only fixes preserve earlier source acceptance.
