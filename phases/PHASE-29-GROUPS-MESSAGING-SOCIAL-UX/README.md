# Phase 29 — Groups & Messaging Social UX

**Status:** IN_PROGRESS - LNG-29-001 DONE; LNG-29-002 navigation/discovery VERIFYING; owner-authorized chain001-006, stop after Phase29

## Objective

Make existing Study Groups and messaging first-class, discoverable product surfaces with modern social interaction patterns while preserving private-group authorization and the product's language-learning context.

## Direction

Benchmark interaction patterns from mature social/messaging products such as Facebook Groups/Messenger, X Communities/DM, Zalo, Instagram messaging and Twitch community/chat, but do not clone visual identity or unsupported behavior.

CongDongNgonNgu-specific value must remain central: learning language, proficiency, goals, topics, study partners and shareable learning context.

## Core outcomes
- Clear navigation/entry points for Groups and Messages.
- Coherent create-group/group-home/member/invite states.
- Conversation inbox and 1:1/group conversation UX.
- Create group conversation and member management where authorized.
- Language-learning context cards/actions inside communication.
- Strong mobile/responsive behavior.

## Hard boundary
Existing Phase22 private groups remain private. Public discovery/join semantics require an explicit later contract and may not be inferred from visual redesign.

## Exit verdict
`GO_SOCIAL_COMMUNICATION_UX` / `REMEDIATE_AND_RETEST` / `REJECT`

## Current execution checkpoint

001 publication and terminal relay are complete: Workspace PR170, merged main21751c3736acce96be323d46e3e1dbeebb8c6bf4, PR/main quality CI SUCCESS and temporary branch cleanup verified. See [verified lifecycle](LIFECYCLE-001.md) and [audit evidence](EVIDENCE-001.md). Accepted continuation starts002 under the existing001-006 order; Phase29 verdict NOT_REACHED and003-006 unstarted.

Current publication checkpoint: 002 VERIFYING: product implementation, affected automated gates, Frontend publication and bounded exact-main native acceptance complete; Workspace publication/terminal relay pending;003-006 unstarted.
