# Phase 20 Policy Matrix — Planning Baseline

This matrix is a draft contract to freeze after `START_PHASE_20`; it is not an implemented permission system.

| Capability | Anonymous | Nonmember | Member | Moderator | Owner | Platform role |
|---|---:|---:|---:|---:|---:|---:|
| Discover private group content | DENY | DENY | ALLOW scoped | ALLOW scoped | ALLOW scoped | DENY unless explicit moderation duty |
| Read member-only text | DENY | DENY | ALLOW | ALLOW | ALLOW | DENY unless explicit reviewed moderation path |
| Create member text | DENY | DENY | ALLOW | ALLOW | ALLOW | DENY by default |
| Invite member | DENY | DENY | TBD by policy freeze | TBD | ALLOW | DENY by default |
| Remove member | DENY | DENY | DENY | scoped TBD | ALLOW | only explicit moderation/admin contract |
| Moderate/report resolution | DENY | DENY | report only | scoped ALLOW | scoped ALLOW | explicit reviewed platform moderation only |
| Transfer ownership | DENY | DENY | DENY | DENY | ALLOW with invariant checks | DENY |

`TBD` cells must be resolved before LNG-20-002 may start. Every allow is group-scoped; no role grants cross-group authority implicitly. Existing author-private content is outside this group matrix and remains author-only.
