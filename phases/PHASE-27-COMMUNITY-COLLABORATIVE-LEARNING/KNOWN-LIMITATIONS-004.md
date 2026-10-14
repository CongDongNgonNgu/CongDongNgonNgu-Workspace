# Bounded collaboration limitations

004 acceptance remains in progress. These observations do not represent passing tests.

## Inherited shared-cookie multi-tab refresh

On exact TEST revisions backend `bcca2f0e1cbc2d08198c0ca01e2021db7311d438` and frontend `d97eb14ca41c360b70e64a9ebcf28507337aac86`, opening an additional Library tab in synthetic A's same browser context caused the two tabs to alternate session refreshes. Group sync/stream requests received 401; request136 returned `AUTH_SESSION_EXPIRED`. Refresh requests returned 201, and the group UI eventually purged protected state. A separately authenticated controller session still returned group detail 200, confirming membership remained intact. No refresh-reuse401 was observed; family revocation is a source-based possible race, not an observed result here.

Existing `AuthApi` refresh deduplication is per instance/tab. Existing backend refresh rotation revokes the previous SID immediately. Independent source investigation reproduced old-session invalidation in memory. No auth implementation or revocation policy was changed by 004.

Fresh reviewer `phase27_group_review_fresh` classified this as a separate inherited limitation under the selected acceptance contract: required A/B/C journeys use separate browser contexts, and canonical cards recheck then navigate in the same tab. Extra same-cookie-tab testing is not counted as a pass. General multi-tab support is not claimed. A follow-up should coordinate refresh across same-origin tabs without persisting access tokens or weakening revocation.

If this failure reproduces with one tab per actor or the required same-tab canonical opening flow, it blocks 004 acceptance and must be remediated within this phase. Deliberate session-loss purge and late-response exclusion remain mandatory tests.

## Verification scope

Library source/license revocation has actual isolated SQL coverage. Native Library sharing/opening uses an already public synthetic Phase18 UAT resource; it does not mutate or delete that earlier fixture. Native revocation will use an exactly owned synthetic Community post. Screen-reader testing remains NOT_RUN unless separately executed.
