# 004 collaboration verification checklist

Status: planned verification, 2026-10-13. This file records required cases; it is not evidence of a pass. The frozen [contract](CONTRACT-004.md) and Phase27 [acceptance plan](TEST-PLAN.md) govern acceptance. Use only the owner-approved TEST target and synthetic actors A/B/C.

## Database and service gates

- Parse and apply the exact canonical migration in an owned isolated schema. Verify deterministic legacy sequence/read backfill, positive sequence, both invalid reference-pair directions, unique client keys and shared lease target XOR. Test rollback refusal for active group leases and reference-only rows.
- Run inherited Phase22 group permission, invitation, capacity and transaction races. Run affected Phase26 direct messaging, canonical context and stream lease regressions after shared-module extraction.
- Concurrent identical sends produce one retained text and the same acknowledgement; changed payload with the same key fails. A retry still checks current membership. The twentieth retained text succeeds and the twenty-first fails; hiding does not free capacity.
- Sync cursors reject tampering, actor/group/limit changes and LEFT/rejoin generation changes. Ordering is deterministic. Hidden trailing rows advance the scanned position. Previously rendered hidden rows disappear after reconciliation even without a new text sequence.
- Read acknowledgements accept visible same-group text IDs only and advance monotonically. Own and hidden texts do not add unread counts. New/rejoined members start at the current head; REMOVED members cannot rejoin.
- Two independent repositories share the combined actor cap of ten direct/group streams. Verify expiration, release ownership, concurrent acquisition and current session/account/member/archive revocation. Stream events contain only version hints and keepalive.
- Canonical Library and Community references resolve current eligibility; sharing grants no access. Revoked targets become generic unavailable cards without retained title, body or navigation path.

## Exact deployment browser gates

Record the final backend/frontend main SHAs, required CI, exact TEST deployments and migration ledger before runtime setup. Keep fixture ownership and credentials outside tracked repositories.

1. A creates a private group. C cannot discover or read it. A manually creates an invitation; B explicitly accepts. Member B cannot create owner invitations.
2. A and B open separate browser contexts. A sends multiline and astral Unicode text; B receives ordered catch-up and unread text. B marks an observed text read. A retry after an interrupted acknowledgement does not duplicate the text.
3. Disconnect B, send from A, reconnect B and verify bounded catch-up. A hides a rendered text; B purges it after a hint without losing an unrelated draft. Role changes update current controls from sync.
4. Share one eligible canonical Library resource and one eligible Community post. Revoke an owned synthetic Community target, then recheck the card and opening action. Use isolated SQL proof for Library revocation if no independently owned canonical Library runtime fixture is available; record this distinction explicitly.
5. Remove B, archive the group and revoke a synthetic session in separate cases. Each protected view purges on access loss; stale responses do not repopulate it. C and removed B receive uniform denial for group detail, text, sync, context, member and report routes.
6. Verify keyboard focus, labels, announcements, newline behavior, draft retention on network errors and explicit retry. Check changed group, invitation and navigation surfaces at widths 320/375/390/412/768/1024/1440 in Vietnamese and English with long text and URLs. Report screen-reader testing separately.

After runtime verification, delete only the exact fixture-owned closure and verify residual rows are zero. Record independent findings and remediation, then complete PR/main CI/tree verification and temporary branch cleanup before marking 004 DONE. Continue automatically to 005 and 006.
