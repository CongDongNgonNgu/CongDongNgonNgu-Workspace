# Frontend Profile Inline Edit UX

Date: 2026-09-18

Status: `DONE`

## Scope

The authenticated `/profile` page now replaces the read-only passport body
with the editor in the same primary content position. The profile identity
header remains mounted, the edit trigger changes from `Chỉnh sửa hồ sơ` to a
visually active disabled `Đang chỉnh sửa` state, and the editor exposes the
visible `Bạn đang chỉnh sửa hồ sơ` cue plus the current profile name.

Opening edit mode scrolls to the editor and focuses its heading. `Đóng` and
`Hủy` restore the read-only view and return focus to the edit trigger. A
successful Save updates the returned profile, exits edit mode, announces
`Đã lưu thay đổi`, scrolls near the profile header, and restores trigger focus.
Existing validation, API payloads, and profile privacy behavior remain
unchanged. The existing authenticated header avatar source remains
`AuthProvider.user.displayName`; `Tan Trieu` renders `TT` consistently.

## Verification

- Frontend tests: 35 files / 161 tests passed.
- Passport regression tests cover immediate edit visibility, active trigger
  state, read-only body replacement, identity cue, heading focus, Cancel
  return, Save feedback, profile update payload, and trigger focus.
- Header regression tests continue to cover authenticated `Tan Trieu` desktop
  and mobile avatars rendering `TT` and real-name accessibility labels.
- Typecheck, lint, build, and `npm audit --audit-level=high` passed; audit
  reported 0 vulnerabilities.
- Frontend `main` and `origin/main`:
  `d190c9b4f51fc4a7ae19e3830ade8f230256dedf`.
- GitHub Actions quality run
  `35299454868` completed successfully for that exact SHA.
- Vercel production deployment `841oju1aDebwyQMwCqu1dEDLoSZs` is Ready for
  `d190c9b4f51fc4a7ae19e3830ade8f230256dedf`. The authenticated production
  profile at `https://cong-dong-ngon-ngu-sigma.vercel.app/profile` showed
  `Tan Trieu` / `TT`, the inline editor, identity context, active edit state,
  focused editor heading, and Cancel focus restoration.
- Desktop production smoke passed. Mobile layout remains covered by the
  responsive single-column editor rules and full build/test verification; no
  production profile data was saved or mutated during smoke testing.

## Branch hygiene

The temporary `fix/profile-edit-mode` and `fix/profile-edit-context` branches
were merged into Frontend `main` and are ready for local/remote deletion after
the final remote SHA verification.
