# Phase29 social UX benchmarks (001)

Read 2026-10-19 through public first-party documentation. These are documented interaction patterns, not claims from signed-in product inspection, user testing or current pixel measurements. No private social account or chat data inspected. Design choices below are our inference.

| Product / verifiable source | Documented pattern | Bounded application / exclusion |
|---|---|---|
|Facebook Groups: https://about.fb.com/news/2019/08/groups-privacy-settings/ | Distinguishes group privacy from visibility/discovery | Make private invitation-only policy explicit. CongDongNgonNgu does NOT adopt Facebook visibility controls or public conversion.|
|Messenger: https://www.facebook.com/help/messenger-app/1020117295903156/ | Distinguishes public channels from private chats/community chats | Keep Study Group and direct-message domains explicit; do not treat channels or historical Community Chats announcements as current supported app contracts.|
|X: https://help.x.com/en/using-x/direct-messages | Separate inbox/conversation, private conversation entry, group-DM participant lifecycle and per-conversation controls | Use clear inbox/thread/back/info hierarchy. X group membership rules never confer CongDongNgonNgu authorization; separate group conversations held.|
|Zalo: https://help.zalo.me/huong-dan/chuyen-muc/tro-chuyen-nhom/ | Help navigation exposes group creation, management, leaving and member-list permissions as distinct tasks | Place member/role/invite controls in clear local group navigation; keep owner/moderator permissions visible. No import of Zalo join links/history rules.|
|Instagram: https://about.fb.com/news/2024/03/instagram-dm-updates/ | Documents inbox thread prioritization and individual/group thread access | Make conversations directly reachable with clear participant identity. Pinning/edit/media/partner receipts remain unsupported and excluded.|
|Instagram: https://about.fb.com/news/2025/02/new-instagram-dm-features-stay-connected/ | Distinguishes inbox organization from in-chat content actions | Separate inbox scanning from learning-context interaction. Translation/music/scheduling/QR/group-link behavior excluded.|
|Twitch: https://help.twitch.tv/s/article/chat-basics?language=en_US | Documents chat on desktop/mobile and chat identity/rules | Preserve author/time hierarchy, clear stream state and moderated participation; no imported presence/viewer counts/subscriber privileges.|

Search excerpts/public help pages are sufficient only for the observations stated here. Where an interactive product or help page was not accessible, no visual or behavioral observation is invented. Meta's2022 Community Chat launch announcement is historical, not a current feature recommendation. Do not clone branding/layouts.

Selected direction: labeled high-priority My Groups/Messages navigation; purpose-led private group index; explicit member-role management; mobile single-thread/inbox navigation; truthful transport/read state; canonical learning-context cards. Keep existing Be Vietnam Pro/navy/orange tokens and language-learning purpose. Independent design review must reject unsupported generated features, fabricated metrics and metadata.

Additional X Communities reference: https://help.x.com/en/using-x/communities documents a dedicated Communities tab/sidebar after membership; https://help.x.com/en/using-x/communities-moderator-playbook documents member/moderator administration. Our inference is to promote an authenticated My Groups entry and keep role management local. Do not adopt X's reusable invite/join or public post rules; native one-use/manual private Study Group policy remains authoritative.
