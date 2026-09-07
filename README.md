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
2. Xác định phase hiện tại từ `state/PROJECT-STATE.md`.
3. Chỉ chọn task có dependency đã hoàn tất.
4. Với UI mới hoặc redesign đáng kể, bắt buộc dùng Stitch qua MCP trước khi code.
5. Không clone mù EduAI; luôn phân loại `KEEP / ADAPT / REMOVE / BUILD_NEW / DEFER`.
6. Mỗi task phải được implement, verify, commit, push và cập nhật evidence trước khi DONE.
7. Không chạy sang phase kế tiếp nếu completion gate của phase hiện tại chưa đạt, trừ khi dependency graph cho phép song song rõ ràng.
8. Không được dùng chung secrets, database, OAuth credentials, payment credentials hoặc production runtime của EduAI.

## Cách khởi động Codex

```text
Read AGENTS.md and the CongDongNgonNgu-Workspace repository.
Resume the current project state.
Determine the next eligible task from the dependency graph.
Do not redo completed work.
Follow the Stitch MCP UI policy for any substantial UI work.
Implement, verify, commit, push, update Workspace evidence, then continue within the current Phase until the Phase completion gate is satisfied or a genuine blocker occurs.
```
