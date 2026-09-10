# CongDongNgonNgu Workspace

Workspace điều phối phát triển cho **CongDongNgonNgu.vn — Global Language Community**.

Mục tiêu sản phẩm: xây dựng một nền tảng cộng đồng học và chia sẻ ngôn ngữ xuyên biên giới, kết hợp con người, nội dung mở và AI. Dự án tái sử dụng có chọn lọc nền tảng kỹ thuật đã được chứng minh của EduAI nhưng phải tách domain, dữ liệu, thương hiệu và thiết kế giao diện hoàn toàn độc lập.

## Repositories

- Frontend: `CongDongNgonNgu/CongDongNgonNgu-Front-End-Web`
- Backend: `CongDongNgonNgu/CongDongNgonNgu-Back-End`
- Workspace: `CongDongNgonNgu/CongDongNgonNgu-Workspace`
- Technical reference only: `EduAI-Flatform/EduAI-Front-End-Web`
- Technical reference only: `EduAI-Flatform/EduAI-Back-End`

## Nguyên tắc vận hành

1. Đọc `AGENTS.md` trước khi làm bất kỳ task nào.
2. Đọc `docs/engineering/CODEX-WORKING-RULES.md`; mọi phase/task đều kế thừa preflight này dù task không lặp lại nội dung.
3. Xác định phase hiện tại từ `state/PROJECT-STATE.md` và dependency từ `state/DEPENDENCY-GRAPH.md`.
4. Đọc `AGENTS.md` của repository đích trước khi sửa code repository đó.
5. Với Frontend, bắt buộc đọc `docs/engineering/FRONTEND-ARCHITECTURE.md`; architecture conformance là acceptance gate chứ không chỉ là cleanup tùy chọn.
6. Với UI mới hoặc redesign đáng kể, bắt buộc dùng Stitch qua MCP trước khi code.
7. Không clone mù EduAI; luôn phân loại `KEEP / ADAPT / REMOVE / BUILD_NEW / DEFER`.
8. Mỗi task phải được implement, verify, architecture-review, commit, push, verify remote/CI và cập nhật evidence trước khi DONE.
9. Không chạy sang phase kế tiếp nếu completion gate của phase hiện tại chưa đạt, trừ khi dependency graph hoặc decision đã chấp nhận cho phép song song/ngoại lệ rõ ràng.
10. Không được dùng chung secrets, database, OAuth credentials, payment credentials hoặc production runtime của EduAI.

## Engineering governance

- Codex execution baseline: `docs/engineering/CODEX-WORKING-RULES.md`
- Frontend architecture baseline: `docs/engineering/FRONTEND-ARCHITECTURE.md`
- New phase task template: `templates/PHASE-TASK-TEMPLATE.md`
- Durable architecture/product decisions: `state/DECISIONS.md`
- Current machine-readable project flags: `state/PROJECT-STATE.md`

Không dựa vào việc Codex “nhớ” một cuộc hội thoại trước. Mỗi coding session phải tái dựng context từ các file trên và source thực tế.

## Cách khởi động Codex

```text
Read AGENTS.md and the CongDongNgonNgu-Workspace repository.
Read state/PROJECT-STATE.md, state/DEPENDENCY-GRAPH.md, and docs/engineering/CODEX-WORKING-RULES.md.
Resume the current project state and determine the next eligible task without redoing completed work.
Read the current Phase README/TASKS/ACCEPTANCE/TEST-PLAN/UI-STITCH files as applicable.
Before editing a target repository, read that repository's AGENTS.md and inspect the real source/tests/config/git state.
For frontend work, read docs/engineering/FRONTEND-ARCHITECTURE.md and treat architecture conformance as part of acceptance.
Follow the Stitch MCP UI policy for any substantial new UI or redesign.
Implement the smallest maintainable change, verify all applicable gates, review the diff, commit, push, verify remote SHA and CI, update Workspace evidence, then continue within the current Phase until its completion gate is satisfied or a genuine blocker occurs.
```
