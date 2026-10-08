# Auth copy source inventory — Phase 24

Source captured before implementation. 11 files, 249 occurrences (including four locale-neutral marker kinds), 204 unique translated source strings. G and ✓ are decorative/provider marks; /5 is folded into the parameterized step label. No human English or legal-certified review performed.

Routes, disabled legal destinations, consent intent and session semantics are preserved. Reset minimum hint corrected to 12 to match existing ResetPasswordPage validation. Recovery lifetime corrected to 60 minutes from Backend src/auth/auth.service.ts:18 and153; verification lifetime24h matches17 and245.

| Source | Exact source copy | Catalog key |
| --- | --- | --- |
| AuthBody.tsx:41 | Không gian học tập tôn trọng & an toàn | auth.a.respectful.and.safe.learning.space |
| AuthBody.tsx:42 | Mọi đóng góp ngôn ngữ đều vì mục đích chung, bảo tồn sự đa dạng văn hóa và phát triển tri thức mở. | auth.every.language.contribution.serves.our.shared.purpose |
| AuthBody.tsx:43 | Một tài khoản, nhiều cuộc gặp | auth.one.account.many.connections |
| AuthBody.tsx:44 | Giữ lịch sử học tập và những kết nối ngôn ngữ của bạn trong một không gian riêng tư. | auth.keep.your.learning.history.and.language.connections |
| AuthBody.tsx:81 | Cam kết cộng đồng | auth.community.commitment |
| PasswordField.tsx:34 | Ẩn | auth.hide |
| PasswordField.tsx:34 | Hiện | auth.show |
| ProviderButtons.tsx:12 | Hoặc tiếp tục bằng | auth.or.continue.with |
| ProviderButtons.tsx:24 | G | locale-neutral |
| ProviderButtons.tsx:25 | Tiếp tục với Google | auth.continue.with.google |
| ProviderButtons.tsx:26 | Chưa khả dụng | auth.unavailable |
| RecoveryStatusRail.tsx:4 | 1. Yêu cầu | auth.1.request |
| RecoveryStatusRail.tsx:5 | 2. Đã gửi | auth.2.sent |
| RecoveryStatusRail.tsx:6 | 3. Đặt lại mật khẩu | auth.3.reset.password |
| RecoveryStatusRail.tsx:7 | 4. Liên kết hết hạn | auth.4.expired.link |
| RecoveryStatusRail.tsx:8 | 5. Hoàn tất | auth.5.complete |
| RecoveryStatusRail.tsx:17 | Trạng thái khôi phục mật khẩu | auth.password.recovery.status |
| RecoveryStatusRail.tsx:19 | Trạng thái mô phỏng | auth.preview.status |
| RecoveryStatusRail.tsx:20 | Bước | auth.recovery.step |
| RecoveryStatusRail.tsx:20 | /5 | auth.recovery.step |
| auth-errors.ts:4 | Email hoặc mật khẩu không đúng. | auth.incorrect.email.or.password |
| auth-errors.ts:5 | Hãy xác minh email trước khi đăng nhập. | auth.verify.your.email.before.signing.in |
| auth-errors.ts:6 | Tài khoản đang bị tạm khóa. Vui lòng liên hệ hỗ trợ. | auth.your.account.is.temporarily.disabled.please.contact |
| auth-errors.ts:7 | Bạn thử lại sau ít phút. | auth.please.try.again.in.a.few.minutes |
| auth-errors.ts:8 | Phiên biểu mẫu đã hết hạn. Hãy tải lại trang và thử lại. | auth.this.form.session.has.expired.reload.the |
| auth-errors.ts:9 | Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại. | auth.your.signin.session.has.expired.please.sign |
| auth-errors.ts:10 | Phương thức này hiện chưa khả dụng. | auth.this.method.is.currently.unavailable |
| auth-errors.ts:11 | Phương thức này tạm thời chưa khả dụng. | auth.this.method.is.temporarily.unavailable |
| auth-errors.ts:12 | Không thể hoàn tất đăng nhập với nhà cung cấp. | auth.could.not.complete.signin.with.this.provider |
| auth-errors.ts:13 | Email này đã có tài khoản. Hãy đăng nhập rồi liên kết phương thức mới. | auth.this.email.already.has.an.account.sign |
| auth-errors.ts:14 | Liên kết xác minh không hợp lệ hoặc đã hết hạn. | auth.the.verification.link.is.invalid.or.expired |
| auth-errors.ts:15 | Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. | auth.the.password.reset.link.is.invalid.or |
| auth-errors.ts:21 | Hệ thống đang bận. Bạn thử lại sau nhé. | auth.the.system.is.busy.please.try.again |
| auth-errors.ts:24 | Có lỗi xảy ra. Bạn thử lại sau nhé. | auth.something.went.wrong.please.try.again.later |
| pages/AuthCallbackPage.tsx:14 | Đăng nhập không hoàn tất | auth.signin.incomplete |
| pages/AuthCallbackPage.tsx:15 | Chưa thể hoàn tất. | auth.could.not.complete.signin |
| pages/AuthCallbackPage.tsx:16 | Bạn có thể quay lại và thử đăng nhập bằng email hoặc một phương thức khác. | auth.return.and.try.signing.in.with.email |
| pages/AuthCallbackPage.tsx:17 | Phương thức đăng nhập này chưa hoàn tất. Vui lòng quay lại đăng nhập để tiếp tục. | auth.this.signin.method.did.not.complete.please |
| pages/AuthCallbackPage.tsx:20 | Nhà cung cấp chưa sẵn sàng | auth.provider.not.ready |
| pages/AuthCallbackPage.tsx:21 | Phương thức chưa khả dụng | auth.method.unavailable |
| pages/AuthCallbackPage.tsx:22 | Đăng nhập bằng nhà cung cấp này hiện chưa sẵn sàng. Tài khoản và dữ liệu của bạn vẫn được bảo vệ. | auth.signin.with.this.provider.is.not.ready |
| pages/AuthCallbackPage.tsx:23 | Vui lòng chọn đăng nhập bằng email và mật khẩu hoặc thử lại sau. | auth.please.sign.in.with.email.and.password |
| pages/AuthCallbackPage.tsx:26 | Session timeout re-auth | auth.sign.in.again |
| pages/AuthCallbackPage.tsx:27 | Phiên làm việc đã hết hạn | auth.your.session.has.expired |
| pages/AuthCallbackPage.tsx:28 | Vì lý do an toàn cho dữ liệu học tập và bảo mật tài khoản, phiên làm việc của bạn đã tự động kết thúc sau một khoảng thời gian không tương tác. | auth.to.protect.your.learning.data.and.account |
| pages/AuthCallbackPage.tsx:29 | Bài làm và văn bản đang dịch được giữ nguyên. Hãy đăng nhập lại để tiếp tục. | auth.your.work.and.text.being.translated.are |
| pages/AuthCallbackPage.tsx:32 | Session timeout re-auth | auth.sign.in.again |
| pages/AuthCallbackPage.tsx:33 | Phiên làm việc đã hết hạn | auth.your.session.has.expired |
| pages/AuthCallbackPage.tsx:34 | Vì lý do an toàn cho dữ liệu học tập và bảo mật tài khoản, phiên làm việc của bạn đã tự động kết thúc sau một khoảng thời gian không tương tác. | auth.to.protect.your.learning.data.and.account |
| pages/AuthCallbackPage.tsx:35 | Bài làm và văn bản đang dịch được giữ nguyên. Hãy đăng nhập lại để tiếp tục. | auth.your.work.and.text.being.translated.are |
| pages/AuthCallbackPage.tsx:38 | OAuth collision recovery | auth.account.linking.recovery |
| pages/AuthCallbackPage.tsx:39 | Không thể liên kết tài khoản | auth.could.not.link.accounts |
| pages/AuthCallbackPage.tsx:40 | Để bảo vệ quyền riêng tư, chúng tôi không thể hoàn tất liên kết tự động giữa hai phương thức đăng nhập. | auth.to.protect.your.privacy.we.could.not |
| pages/AuthCallbackPage.tsx:41 | Hãy đăng nhập bằng email và mật khẩu đã thiết lập trước đó, sau đó thử liên kết lại từ trang tài khoản. | auth.sign.in.with.your.existing.email.and |
| pages/AuthCallbackPage.tsx:44 | OAuth collision recovery | auth.account.linking.recovery |
| pages/AuthCallbackPage.tsx:45 | Không thể liên kết tài khoản | auth.could.not.link.accounts |
| pages/AuthCallbackPage.tsx:46 | Để bảo vệ quyền riêng tư, chúng tôi không thể hoàn tất liên kết tự động giữa hai phương thức đăng nhập. | auth.to.protect.your.privacy.we.could.not |
| pages/AuthCallbackPage.tsx:47 | Hãy đăng nhập bằng email và mật khẩu đã thiết lập trước đó, sau đó thử liên kết lại từ trang tài khoản. | auth.sign.in.with.your.existing.email.and |
| pages/AuthCallbackPage.tsx:50 | Account linking recovery | auth.account.linking.recovery.2 |
| pages/AuthCallbackPage.tsx:51 | Không thể liên kết tài khoản | auth.could.not.link.accounts |
| pages/AuthCallbackPage.tsx:52 | Để bảo vệ quyền riêng tư, chúng tôi không thể hoàn tất liên kết tự động giữa hai phương thức đăng nhập. | auth.to.protect.your.privacy.we.could.not |
| pages/AuthCallbackPage.tsx:53 | Hãy đăng nhập bằng email và mật khẩu đã thiết lập trước đó, sau đó thử liên kết lại từ trang tài khoản. | auth.sign.in.with.your.existing.email.and |
| pages/AuthCallbackPage.tsx:81 | Đăng nhập / 06 | auth.sign.in.06 |
| pages/AuthCallbackPage.tsx:82 | Đang mở không gian của bạn. | auth.opening.your.space |
| pages/AuthCallbackPage.tsx:83 | Chúng tôi đang kiểm tra phiên đăng nhập an toàn. | auth.we.are.checking.your.secure.signin.session |
| pages/AuthCallbackPage.tsx:84 | Không gian học tập an toàn | auth.a.safe.learning.space |
| pages/AuthCallbackPage.tsx:85 | Lấy lại quyền kiểm soát tài khoản | auth.regain.control.of.your.account |
| pages/AuthCallbackPage.tsx:85 | Đang mở không gian của bạn | auth.opening.your.space.2 |
| pages/AuthCallbackPage.tsx:86 | Mỗi bước xác thực đều được xử lý minh bạch để bảo vệ dữ liệu học tập và những đóng góp ngôn ngữ của cộng đồng. | auth.every.authentication.step.is.handled.transparently.to |
| pages/AuthCallbackPage.tsx:88 | Bảo vệ dữ liệu cá nhân | auth.protect.personal.data |
| pages/AuthCallbackPage.tsx:88 | Không tiết lộ thông tin nhạy cảm trong thông báo lỗi. | auth.sensitive.information.is.kept.out.of.error |
| pages/AuthCallbackPage.tsx:89 | Tiếp tục an toàn | auth.continue.safely |
| pages/AuthCallbackPage.tsx:89 | Bạn luôn có thể quay lại đăng nhập bằng một phương thức khác. | auth.you.can.always.return.and.sign.in |
| pages/AuthCallbackPage.tsx:90 | Cần hỗ trợ? | auth.need.help |
| pages/AuthCallbackPage.tsx:90 | Đội ngũ cộng đồng sẵn sàng hướng dẫn bạn khôi phục quyền truy cập. | auth.the.community.team.can.guide.you.through |
| pages/AuthCallbackPage.tsx:92 | Quay lại đăng nhập → | auth.back.to.sign.in |
| pages/AuthCallbackPage.tsx:93 | An toàn phiên đăng nhập | auth.secure.signin.sessions |
| pages/AuthCallbackPage.tsx:94 | Chúng tôi không hiển thị chi tiết nhạy cảm trong thông báo xác thực để bảo vệ quyền riêng tư của bạn. | auth.we.keep.sensitive.details.out.of.authentication |
| pages/AuthCallbackPage.tsx:102 | Quay lại đăng nhập → | auth.back.to.sign.in |
| pages/AuthCallbackPage.tsx:105 | Đang xác nhận… | auth.confirming |
| pages/ForgotPasswordPage.tsx:25 | Vui lòng nhập email hợp lệ. | auth.please.enter.a.valid.email.address |
| pages/ForgotPasswordPage.tsx:42 | Bảo mật tài khoản | auth.account.security |
| pages/ForgotPasswordPage.tsx:43 | Khôi phục mật khẩu | auth.password.recovery |
| pages/ForgotPasswordPage.tsx:44 | Nhập địa chỉ email liên kết với tài khoản của bạn để nhận liên kết khôi phục. | auth.enter.the.email.address.linked.to.your |
| pages/ForgotPasswordPage.tsx:45 | Bảo mật tài khoản | auth.account.security |
| pages/ForgotPasswordPage.tsx:46 | Bảo vệ tài khoản và hành trình học tập của bạn | auth.protect.your.account.and.learning.journey |
| pages/ForgotPasswordPage.tsx:47 | Hệ thống khôi phục tài khoản được thiết kế theo chuẩn bảo mật đa tầng, bảo vệ hồ sơ học tập và dữ liệu trao đổi ngôn ngữ của bạn một cách tuyệt đối. | auth.account.recovery.uses.multiple.layers.of.security |
| pages/ForgotPasswordPage.tsx:49 | Bảo mật không tiết lộ danh tính | auth.recovery.without.disclosing.identity |
| pages/ForgotPasswordPage.tsx:49 | Chúng tôi luôn giữ email và thông tin học tập của bạn riêng tư. | auth.we.keep.your.email.and.learning.information |
| pages/ForgotPasswordPage.tsx:50 | Liên kết giới hạn thời gian | auth.timelimited.links |
| pages/ForgotPasswordPage.tsx:50 | Liên kết khôi phục chỉ có hiệu lực trong thời gian ngắn và chỉ dùng một lần. | auth.recovery.links.expire.shortly.and.can.only |
| pages/ForgotPasswordPage.tsx:51 | Hỗ trợ thân thiện | auth.friendly.support |
| pages/ForgotPasswordPage.tsx:51 | Nếu không nhận được thư, hãy kiểm tra hộp thư rác hoặc liên hệ đội ngũ cộng đồng. | auth.if.you.do.not.receive.the.email |
| pages/ForgotPasswordPage.tsx:53 | Nhớ mật khẩu? | auth.remember.your.password |
| pages/ForgotPasswordPage.tsx:53 | Quay lại đăng nhập → | auth.back.to.sign.in |
| pages/ForgotPasswordPage.tsx:55 | Bảo vệ quyền riêng tư | auth.protect.your.privacy |
| pages/ForgotPasswordPage.tsx:56 | CongDongNgonNgu.vn không bao giờ yêu cầu bạn cung cấp mật khẩu qua điện thoại, tin nhắn SMS hoặc biểu mẫu ngoài hệ thống. | auth.congdongngonnguvn.never.asks.for.your.password.by |
| pages/ForgotPasswordPage.tsx:61 | ✓ | locale-neutral |
| pages/ForgotPasswordPage.tsx:62 | Kiểm tra hòm thư của bạn | auth.check.your.inbox |
| pages/ForgotPasswordPage.tsx:63 | Nếu địa chỉ email tồn tại trên hệ thống, một liên kết khôi phục an toàn đã được gửi đến hộp thư của bạn. | auth.if.this.email.address.exists.in.the |
| pages/ForgotPasswordPage.tsx:65 | Chưa thấy email? | auth.no.email.yet |
| pages/ForgotPasswordPage.tsx:66 | Vui lòng kiểm tra thư mục Spam/Quảng cáo hoặc hòm thư lọc tự động trước khi gửi lại. | auth.please.check.spam.promotions.and.automated.filters |
| pages/ForgotPasswordPage.tsx:68 | Gửi lại liên kết ngay | auth.resend.link.now |
| pages/ForgotPasswordPage.tsx:69 | Quay lại đăng nhập | auth.back.to.sign.in.2 |
| pages/ForgotPasswordPage.tsx:75 | Địa chỉ email liên kết | auth.linked.email.address |
| pages/ForgotPasswordPage.tsx:82 | Chúng tôi sẽ gửi một liên kết bảo mật có thời hạn 30 phút đến hòm thư này. | auth.we.will.send.a.secure.link.valid |
| pages/ForgotPasswordPage.tsx:86 | Gửi liên kết khôi phục → | auth.send.recovery.link |
| pages/ForgotPasswordPage.tsx:87 | Tôi nhớ mật khẩu rồi | auth.i.remember.my.password |
| pages/LoginPage.tsx:35 | Vui lòng nhập email hợp lệ. | auth.please.enter.a.valid.email.address |
| pages/LoginPage.tsx:40 | Vui lòng nhập mật khẩu. | auth.please.enter.your.password |
| pages/LoginPage.tsx:59 | Chào mừng trở lại | auth.welcome.back |
| pages/LoginPage.tsx:60 | Đăng nhập | auth.sign.in |
| pages/LoginPage.tsx:61 | Nhập thông tin tài khoản của bạn để truy cập không gian học tập. | auth.enter.your.account.details.to.access.your |
| pages/LoginPage.tsx:62 | Chào mừng trở lại | auth.welcome.back |
| pages/LoginPage.tsx:63 | Tiếp tục hành trình kết nối ngôn ngữ | auth.continue.your.journey.of.language.connections |
| pages/LoginPage.tsx:64 | Đăng nhập để tham gia trao đổi kiến thức, luyện tập giao tiếp thực tế và đóng góp vào thư viện ngôn ngữ mở cùng các thành viên khắp nơi trên thế giới. | auth.sign.in.to.exchange.knowledge.practise.real |
| pages/LoginPage.tsx:66 | Học tập cùng con người thực | auth.learn.with.real.people |
| pages/LoginPage.tsx:66 | Không gian an toàn để đặt câu hỏi, nhận sửa lỗi tỉ mỉ từ người bản xứ và người học giàu kinh nghiệm. | auth.a.safe.space.to.ask.questions.and |
| pages/LoginPage.tsx:67 | Tài nguyên mở, vì cộng đồng | auth.open.resources.for.the.community |
| pages/LoginPage.tsx:67 | Mọi đóng góp về từ vựng, ngữ cảnh và câu thoại đều được lưu trữ minh bạch để hỗ trợ người đi sau. | auth.vocabulary.contexts.and.dialogue.contributions.are.stored |
| pages/LoginPage.tsx:68 | Tôn trọng và đồng cảm | auth.respect.and.empathy |
| pages/LoginPage.tsx:68 | Mỗi ngôn ngữ là một nhịp điệu riêng, kết nối dựa trên sự tò mò và thấu hiểu văn hóa. | auth.every.language.has.its.own.rhythm.connections |
| pages/LoginPage.tsx:70 | Chưa có tài khoản? | auth.no.account.yet |
| pages/LoginPage.tsx:70 | Tham gia hoàn toàn miễn phí. Tạo tài khoản mới → | auth.join.for.free.create.a.new.account |
| pages/LoginPage.tsx:75 | Địa chỉ email | auth.email.address |
| pages/LoginPage.tsx:82 | Email đã đăng ký tại CongDongNgonNgu.vn | auth.your.registered.email.at.congdongngonnguvn |
| pages/LoginPage.tsx:87 | Mật khẩu | auth.password |
| pages/LoginPage.tsx:95 | Quên mật khẩu? | auth.forgot.password |
| pages/LoginPage.tsx:99 | Ghi nhớ đăng nhập trên thiết bị này | auth.remember.signin.on.this.device |
| pages/LoginPage.tsx:102 | Đăng nhập vào tài khoản → | auth.sign.in.to.your.account |
| pages/LoginPage.tsx:106 | Bạn là thành viên mới? | auth.new.member |
| pages/LoginPage.tsx:107 | Đăng ký tài khoản miễn phí | auth.create.a.free.account |
| pages/LoginPage.tsx:109 | Bằng việc đăng nhập, bạn đồng ý với | auth.by.signing.in.you.agree.to.the |
| pages/LoginPage.tsx:109 | Quy tắc cộng đồng | auth.community.guidelines |
| pages/LoginPage.tsx:109 | và | auth.and |
| pages/LoginPage.tsx:109 | Chính sách bảo mật | auth.privacy.policy |
| pages/LoginPage.tsx:109 | của CongDongNgonNgu.vn. | auth.of.congdongngonnguvn |
| pages/RegisterPage.tsx:34 | Tên hiển thị cần có ít nhất 2 ký tự. | auth.your.display.name.must.contain.at.least |
| pages/RegisterPage.tsx:39 | Vui lòng nhập email hợp lệ. | auth.please.enter.a.valid.email.address |
| pages/RegisterPage.tsx:44 | Mật khẩu cần có ít nhất 8 ký tự. | auth.your.password.must.contain.at.least.8 |
| pages/RegisterPage.tsx:49 | Hai mật khẩu chưa khớp. | auth.the.passwords.do.not.match |
| pages/RegisterPage.tsx:54 | Vui lòng đọc và đồng ý với Quy tắc cộng đồng và Chính sách bảo mật trước khi tiếp tục. | auth.please.read.and.agree.to.the.community |
| pages/RegisterPage.tsx:72 | Tham gia cùng chúng tôi | auth.join.us |
| pages/RegisterPage.tsx:73 | Đăng ký tài khoản | auth.create.an.account |
| pages/RegisterPage.tsx:74 | Gia nhập cộng đồng người học và chia sẻ ngôn ngữ mở hoàn toàn miễn phí. | auth.join.our.open.community.of.language.learners |
| pages/RegisterPage.tsx:75 | Tham gia cùng chúng tôi | auth.join.us |
| pages/RegisterPage.tsx:76 | Cùng nhau học hỏi, lưu giữ và lan tỏa ngôn ngữ | auth.learn.preserve.and.share.languages.together |
| pages/RegisterPage.tsx:77 | Tạo tài khoản miễn phí để tham gia trao đổi kiến thức, luyện tập giao tiếp thực tế và chung tay xây dựng thư viện ngôn ngữ mở cùng cộng đồng người học khắp thế giới. | auth.create.a.free.account.to.exchange.knowledge |
| pages/RegisterPage.tsx:79 | Học tập nhân văn & thực chất | auth.meaningful.learning.with.people |
| pages/RegisterPage.tsx:79 | Không gian cởi mở kết nối người học và người chia sẻ kinh nghiệm ngôn ngữ từ nhiều nền văn hóa. | auth.an.open.space.connecting.learners.and.experienced |
| pages/RegisterPage.tsx:80 | Đóng góp tri thức chung | auth.contribute.shared.knowledge |
| pages/RegisterPage.tsx:80 | Mọi từ vựng, ngữ cảnh ví dụ và ghi chú sửa lỗi đều được xây dựng minh bạch vì lợi ích cộng đồng. | auth.vocabulary.examples.and.correction.notes.are.developed |
| pages/RegisterPage.tsx:81 | Tôn trọng & bình đẳng | auth.respect.and.equality |
| pages/RegisterPage.tsx:81 | Cam kết bảo vệ một môi trường giao tiếp an toàn, thấu hiểu và tôn trọng sự đa dạng ngôn ngữ. | auth.we.are.committed.to.a.safe.understanding |
| pages/RegisterPage.tsx:83 | Đã có tài khoản? | auth.already.have.an.account |
| pages/RegisterPage.tsx:83 | Đăng nhập ngay → | auth.sign.in.now |
| pages/RegisterPage.tsx:84 | Tôn trọng & bảo mật quyền riêng tư | auth.respect.and.privacy |
| pages/RegisterPage.tsx:85 | Chúng tôi không bao giờ bán dữ liệu hay gửi thư rác. Mọi đóng góp tri thức ngôn ngữ của bạn đều vì mục đích chung của cộng đồng. | auth.we.never.sell.your.data.or.send |
| pages/RegisterPage.tsx:92 | Lưu ý xác thực hòm thư | auth.email.verification.notice |
| pages/RegisterPage.tsx:93 | Sau khi hoàn tất, hệ thống sẽ gửi liên kết xác nhận kích hoạt tài khoản về hộp thư của bạn. | auth.after.you.register.we.will.send.an |
| pages/RegisterPage.tsx:96 | Tên hiển thị công khai | auth.public.display.name |
| pages/RegisterPage.tsx:96 | Ví dụ: Minh Tuấn hoặc Lan Anh | auth.for.example.minh.tuan.or.lan.anh |
| pages/RegisterPage.tsx:96 | Tên này sẽ xuất hiện khi bạn thảo luận, đặt câu hỏi và đóng góp vào thư viện. | auth.this.name.appears.when.you.discuss.ask |
| pages/RegisterPage.tsx:97 | Địa chỉ email | auth.email.address |
| pages/RegisterPage.tsx:97 | Dùng để đăng nhập, bảo mật tài khoản và nhận xác nhận kích hoạt. | auth.used.to.sign.in.protect.your.account |
| pages/RegisterPage.tsx:99 | Mật khẩu | auth.password |
| pages/RegisterPage.tsx:103 | Tối thiểu 8 ký tự an toàn | auth.at.least.8.characters |
| pages/RegisterPage.tsx:104 | Quy chuẩn mật khẩu dễ nhớ &amp; an toàn: | auth.memorable.and.secure.password.guidelines |
| pages/RegisterPage.tsx:104 | Tối thiểu 8 ký tự bất kỳ. | auth.at.least.8.characters.2 |
| pages/RegisterPage.tsx:104 | Nên kết hợp chữ cái và số để bảo vệ quyền riêng tư tốt hơn. | auth.consider.combining.letters.and.numbers.to.better |
| pages/RegisterPage.tsx:107 | Xác nhận mật khẩu | auth.confirm.password |
| pages/RegisterPage.tsx:107 | Nhập lại chính xác mật khẩu trên | auth.reenter.the.password.above |
| pages/RegisterPage.tsx:110 | Tôi đã đọc và đồng ý với | auth.i.have.read.and.agree.to.the |
| pages/RegisterPage.tsx:110 | Quy tắc cộng đồng | auth.community.guidelines |
| pages/RegisterPage.tsx:110 | và | auth.and |
| pages/RegisterPage.tsx:110 | Chính sách bảo mật | auth.privacy.policy |
| pages/RegisterPage.tsx:110 | của CongDongNgonNgu.vn. | auth.of.congdongngonnguvn |
| pages/RegisterPage.tsx:113 | Tạo tài khoản thành viên → | auth.create.member.account |
| pages/RegisterPage.tsx:117 | Đã là thành viên? | auth.already.a.member |
| pages/RegisterPage.tsx:118 | Đăng nhập ngay | auth.sign.in.now.2 |
| pages/ResetPasswordPage.tsx:20 | Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. | auth.the.password.reset.link.is.invalid.or |
| pages/ResetPasswordPage.tsx:29 | Mật khẩu cần có ít nhất 12 ký tự. | auth.your.password.must.contain.at.least.12 |
| pages/ResetPasswordPage.tsx:34 | Hai mật khẩu chưa khớp. | auth.the.passwords.do.not.match |
| pages/ResetPasswordPage.tsx:51 | Hoàn tất khôi phục | auth.recovery.complete |
| pages/ResetPasswordPage.tsx:51 | Tạo mật khẩu mới | auth.create.a.new.password |
| pages/ResetPasswordPage.tsx:51 | Liên kết khôi phục | auth.recovery.link |
| pages/ResetPasswordPage.tsx:52 | Đặt lại mật khẩu thành công! | auth.password.reset.successful |
| pages/ResetPasswordPage.tsx:52 | Tạo mật khẩu mới | auth.create.a.new.password |
| pages/ResetPasswordPage.tsx:52 | Liên kết đã hết hạn hoặc không hợp lệ | auth.the.link.is.expired.or.invalid |
| pages/ResetPasswordPage.tsx:53 | Mật khẩu mới của bạn đã được lưu an toàn. Bạn có thể đăng nhập ngay bây giờ. | auth.your.new.password.has.been.saved.securely |
| pages/ResetPasswordPage.tsx:53 | Mật khẩu mới của bạn cần đáp ứng các tiêu chuẩn bảo mật để bảo vệ tài khoản trao đổi ngôn ngữ. | auth.your.new.password.must.meet.security.requirements |
| pages/ResetPasswordPage.tsx:53 | Vì lý do an ninh, liên kết khôi phục chỉ có giá trị sử dụng một lần trong vòng 15 phút. | auth.for.security.a.recovery.link.can.only |
| pages/ResetPasswordPage.tsx:54 | Bảo mật tài khoản | auth.account.security |
| pages/ResetPasswordPage.tsx:55 | Bảo vệ những điều bạn đã học | auth.protect.what.you.have.learned |
| pages/ResetPasswordPage.tsx:56 | Mọi bước khôi phục đều được thiết kế để bảo vệ hồ sơ học tập và dữ liệu trao đổi ngôn ngữ của bạn. | auth.every.recovery.step.is.designed.to.protect |
| pages/ResetPasswordPage.tsx:58 | Liên kết dùng một lần | auth.singleuse.link |
| pages/ResetPasswordPage.tsx:58 | Liên kết khôi phục có thời hạn và không thể dùng lại sau khi hoàn tất. | auth.recovery.links.expire.and.cannot.be.reused |
| pages/ResetPasswordPage.tsx:59 | Mật khẩu mạnh, dễ nhớ | auth.strong.memorable.password |
| pages/ResetPasswordPage.tsx:59 | Chọn một cụm từ riêng tư, dài và khó đoán với người khác. | auth.choose.a.long.private.phrase.that.is |
| pages/ResetPasswordPage.tsx:60 | Luôn có hỗ trợ | auth.support.is.always.available |
| pages/ResetPasswordPage.tsx:60 | Bạn có thể quay lại đăng nhập hoặc gửi yêu cầu khôi phục mới bất cứ lúc nào. | auth.you.can.return.to.sign.in.or |
| pages/ResetPasswordPage.tsx:62 | Đã nhớ mật khẩu? | auth.remembered.your.password |
| pages/ResetPasswordPage.tsx:62 | Quay lại đăng nhập → | auth.back.to.sign.in |
| pages/ResetPasswordPage.tsx:64 | Bảo vệ quyền riêng tư | auth.protect.your.privacy |
| pages/ResetPasswordPage.tsx:65 | CongDongNgonNgu.vn không bao giờ yêu cầu bạn cung cấp mật khẩu qua điện thoại, tin nhắn SMS hoặc biểu mẫu ngoài hệ thống. | auth.congdongngonnguvn.never.asks.for.your.password.by |
| pages/ResetPasswordPage.tsx:70 | ✓ | locale-neutral |
| pages/ResetPasswordPage.tsx:71 | Mật khẩu đã được cập nhật thành công. | auth.your.password.was.updated.successfully |
| pages/ResetPasswordPage.tsx:72 | Tất cả phiên đăng nhập trên thiết bị lạ đã được đăng xuất tự động. | auth.sessions.on.unfamiliar.devices.have.been.signed |
| pages/ResetPasswordPage.tsx:73 | Đăng nhập bằng mật khẩu mới | auth.sign.in.with.your.new.password |
| pages/ResetPasswordPage.tsx:78 | Liên kết đã hết hạn hoặc không hợp lệ | auth.the.link.is.expired.or.invalid |
| pages/ResetPasswordPage.tsx:79 | Vui lòng gửi lại yêu cầu khôi phục mới để tiếp tục. | auth.please.send.a.new.recovery.request.to |
| pages/ResetPasswordPage.tsx:81 | Yêu cầu liên kết mới → | auth.request.a.new.link |
| pages/ResetPasswordPage.tsx:82 | Quay lại đăng nhập | auth.back.to.sign.in.2 |
| pages/ResetPasswordPage.tsx:88 | Mật khẩu mới | auth.new.password |
| pages/ResetPasswordPage.tsx:92 | Nhập mật khẩu mới | auth.enter.a.new.password |
| pages/ResetPasswordPage.tsx:93 | Tiêu chuẩn mật khẩu dễ nhớ &amp; an toàn: | auth.memorable.and.secure.password.standards |
| pages/ResetPasswordPage.tsx:93 | Tối thiểu 8 ký tự bất kỳ. | auth.at.least.8.characters.2 |
| pages/ResetPasswordPage.tsx:93 | Nên kết hợp chữ cái và số để bảo vệ quyền riêng tư tốt hơn. | auth.consider.combining.letters.and.numbers.to.better |
| pages/ResetPasswordPage.tsx:96 | Xác nhận mật khẩu mới | auth.confirm.new.password |
| pages/ResetPasswordPage.tsx:96 | Nhập lại mật khẩu mới | auth.reenter.the.new.password |
| pages/ResetPasswordPage.tsx:97 | Lưu mật khẩu mới và tiếp tục → | auth.save.new.password.and.continue |
| pages/ResetPasswordPage.tsx:98 | Quay lại đăng nhập | auth.back.to.sign.in.2 |
| pages/VerifyEmailPage.tsx:35 | Email đã được xác minh. Bạn có thể đăng nhập ngay bây giờ. | auth.your.email.has.been.verified.you.can |
| pages/VerifyEmailPage.tsx:47 | Vui lòng nhập email hợp lệ. | auth.please.enter.a.valid.email.address |
| pages/VerifyEmailPage.tsx:54 | Nếu tài khoản phù hợp, email xác minh mới sẽ được gửi tới bạn. | auth.if.the.account.is.eligible.a.new |
| pages/VerifyEmailPage.tsx:64 | Email verification flow | auth.email.verification |
| pages/VerifyEmailPage.tsx:65 | Email đã được xác minh | auth.email.verified |
| pages/VerifyEmailPage.tsx:65 | Xác thực địa chỉ email để tiếp tục | auth.verify.your.email.address.to.continue |
| pages/VerifyEmailPage.tsx:66 | Một liên kết xác nhận bảo mật đã được gửi tới hòm thư của bạn. Vui lòng kiểm tra hộp thư đến và thư mục Spam nếu cần để kích hoạt toàn bộ tính năng trao đổi ngôn ngữ. | auth.a.secure.confirmation.link.has.been.sent |
| pages/VerifyEmailPage.tsx:67 | Bảo vệ tài khoản | auth.protect.your.account |
| pages/VerifyEmailPage.tsx:68 | Tin cậy bắt đầu từ điều rõ ràng | auth.trust.begins.with.clarity |
| pages/VerifyEmailPage.tsx:69 | Xác minh email giúp bảo vệ tài khoản và mở khóa những cuộc gặp gỡ đầu tiên trong cộng đồng. | auth.email.verification.protects.your.account.and.opens |
| pages/VerifyEmailPage.tsx:71 | Liên kết chỉ dùng một lần | auth.singleuse.verification.link |
| pages/VerifyEmailPage.tsx:71 | Liên kết xác minh có thời hạn để bảo vệ dữ liệu trao đổi của bạn. | auth.verification.links.expire.to.protect.your.exchange |
| pages/VerifyEmailPage.tsx:72 | Minh bạch và an toàn | auth.transparent.and.safe |
| pages/VerifyEmailPage.tsx:72 | Email hiển thị trong giao diện luôn được che chắn khi cần thiết. | auth.email.addresses.are.masked.in.the.interface |
| pages/VerifyEmailPage.tsx:73 | Luôn có hỗ trợ | auth.support.is.always.available |
| pages/VerifyEmailPage.tsx:73 | Bạn có thể gửi lại email hoặc quay lại đăng nhập bất cứ lúc nào. | auth.you.can.resend.the.email.or.return |
| pages/VerifyEmailPage.tsx:75 | Đã xác minh? | auth.already.verified |
| pages/VerifyEmailPage.tsx:75 | Đi tới đăng nhập → | auth.go.to.sign.in |
| pages/VerifyEmailPage.tsx:76 | Bảo vệ quyền riêng tư | auth.protect.your.privacy |
| pages/VerifyEmailPage.tsx:77 | Liên kết xác thực chỉ có hiệu lực trong 24 giờ và chỉ được sử dụng một lần. | auth.the.verification.link.is.valid.for.24 |
| pages/VerifyEmailPage.tsx:80 | Đang kiểm tra liên kết xác minh… | auth.checking.verification.link |
| pages/VerifyEmailPage.tsx:83 | Địa chỉ nhận liên kết | auth.link.recipient.address |
| pages/VerifyEmailPage.tsx:91 | Đi tới đăng nhập | auth.go.to.sign.in.2 |
| pages/VerifyEmailPage.tsx:95 | Địa chỉ email nhận liên kết | auth.email.address.for.the.link |
| pages/VerifyEmailPage.tsx:102 | Liên kết xác minh có hiệu lực trong 24 giờ và chỉ dùng một lần. | auth.verification.links.are.valid.for.24.hours |
| pages/VerifyEmailPage.tsx:105 | Gửi lại email xác minh → | auth.resend.verification.email |
| pages/VerifyEmailPage.tsx:106 | Quay lại đăng nhập | auth.back.to.sign.in.2 |
