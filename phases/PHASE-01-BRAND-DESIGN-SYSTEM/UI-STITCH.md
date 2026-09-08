# Stitch MCP — Phase 01 Global Shell

Use Stitch through MCP before coding each surface. Do **not** ask for the whole product in one prompt. Preserve accepted brand identity but reject any result too similar to EduAI, Talkpal or generic AI dashboards.

## Prompt A — Desktop Header
```text
Design the desktop header for CongDongNgonNgu.vn — Global Language Community, a human-centered cross-border language learning and sharing platform. Brand mood: open, multicultural, friendly, modern, trustworthy; avoid LMS/admin-dashboard appearance. Use the current logo palette direction: navy, orange, green, cyan with calm neutral surfaces. Do not overuse gradients, bold text or rounded containers.

Information architecture: compact brand/logo at left; primary discovery navigation for Khám phá, Ngôn ngữ, Cộng đồng, Trao đổi, Phòng nói, Thư viện, AI; contextual search; then Membership, Notifications and user avatar/account. Provide logged-out variant with Login/Register without overcrowding. Some future routes may be unavailable, so design should allow graceful omission/gating rather than dead links.

Desktop targets 1024/1440. Header should feel light and social, not enterprise. Define active/hover/focus/menu/open states, keyboard navigation, dropdown boundaries and responsive collapse priorities. Do not place every item inside a pill/card. Return clear layout hierarchy and component states, not application code.
```

## Prompt B — Mobile Header & Bottom Navigation
```text
Design the mobile global navigation for CongDongNgonNgu.vn at 320/375/390/412 px. Mobile is first-class, not a compressed desktop. Compact top header should preserve brand identity, search access, notifications and account/menu without crowding. Bottom navigation baseline: Trang chủ, Cộng đồng, Luyện tập, AI, Cá nhân, with safe-area handling and room for badges/active state.

Avoid floating controls that obstruct scrolling. Touch targets >= practical mobile accessibility guidance, visible focus for keyboard, screen-reader labels and clear selected state not dependent on color alone. Provide drawer/menu composition for secondary destinations such as Ngôn ngữ, Trao đổi, Phòng nói, Thư viện, Membership and Help. Return portrait layout and interaction states.
```

## Prompt C — Footer
```text
Design a responsive footer for CongDongNgonNgu.vn. It should communicate the mission of global language learning and contribution without becoming a dense SEO link dump. Include brand/mission, Discover Languages, Community/Resources, Membership/Help, legal/privacy/terms/contact and social areas only as real routes become available. Use open spacing and subtle dividers rather than many cards.

Desktop should scan in columns; mobile may use accessible collapsible groups if helpful. Preserve readable Vietnamese typography and restrained brand accents. Include focus/hover and long-label behavior.
```

## Prompt D — Core Page Shell
```text
Design the reusable content shell for public and authenticated CongDongNgonNgu pages. Define max widths, optional contextual left/right rails, primary content column, sticky behavior and mobile collapse patterns. The design must support community feeds, knowledge pages and AI workspaces without making everything a dashboard card. Show representative loading, empty and error states. Optimize for 320–1440 px and WCAG 2.2 AA intent.
```

## Review checklist
Reject/refine if: visual hierarchy resembles EduAI; excessive pill/card usage; all headings bold/oversized; desktop three-column layout simply stacks endlessly on mobile; nav becomes unreadable; future routes appear as broken actions; contrast/focus insufficient.

## Final Homepage Design Source of Truth — LNG-01-014

FINAL HOMEPAGE DESIGN SOURCE OF TRUTH
Desktop: fb7f5dbb2459493d970c7da39d44a73a
Mobile: eb2aa177b91541b19877a428f23ffc8c
Core/App Shell: ARCHITECTURE REFERENCE ONLY

These revised screens are the canonical Home body references after owner
feedback. The Home narrative is global and language-agnostic: Language
Exchange is a future concept for any language pair, and the world section
celebrates the value of every language instead of centering a single
Vietnamese-English pairing. Vietnamese remains a first-class language in
the product vision and the initial language catalog.

The previous LNG-01-014 screens 848b421b4b664e6f91a84cbe3caf8cb0 and
8c33c51d5ca5449e802c357bf0057313 are superseded/reference only. Preserve
them for history; do not use them as the implementation target.

Required revised copy:

- Exchange kicker: Khi cộng đồng sẵn sàng
- Exchange heading: Gặp nhau qua ngôn ngữ.
- Exchange roles: Người học ngôn ngữ mới; Người chia sẻ kinh nghiệm
- World kicker: MỞ RA THẾ GIỚI QUA NGÔN NGỮ
- World heading: Ngôn ngữ của bạn thuộc về thế giới.
- World topics: Âm thanh & phát âm; Cách nói đời thường; Văn hóa & bối
  cảnh; Câu chuyện từ cộng đồng

Keep the canonical Header, Footer, Lucide icon family, bundled Be Vietnam
Pro, restrained navy/orange/green/cyan tokens, open editorial spacing,
truthful future gating, and no gradients, fake stats, pricing, dashboards,
or dead links.
