# Non-Functional Requirements (Yêu cầu phi chức năng)

## 1. Bảo mật
- Mật khẩu: hash bằng bcrypt/argon2, không lưu plaintext
- JWT access token hết hạn ngắn (15-30 phút) + refresh token riêng, lưu HttpOnly cookie
- Rate-limit các endpoint public dễ bị spam/bot:
  - `POST /cards/{id}/wishes`: tối đa 5 request/phút/IP
  - `POST /guests/{guestId}/rsvp`: tối đa 3 request/phút/IP
  - `POST /auth/login`: khoá tạm sau 5 lần sai trong 15 phút
- Chống CSRF cho các form submit từ trang khách mời (không cần đăng nhập)
- Validate & sanitize toàn bộ input (đặc biệt lời chúc — chống XSS khi hiển thị lại HTML)
- Webhook thanh toán: bắt buộc verify chữ ký (signature) từ cổng thanh toán trước khi xử lý
- Upload media: giới hạn định dạng file (jpg/png/webp/mp4/mp3), giới hạn dung lượng (ảnh ≤10MB, video ≤200MB), quét virus/malware cơ bản

## 2. Tuân thủ pháp lý (Việt Nam)
- Tuân thủ **Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân**: có Chính sách bảo mật rõ ràng, xin phép trước khi dùng dữ liệu khách mời (tên/SĐT) cho mục đích khác ngoài gửi thiệp
- Cho phép khách mời/chủ thiệp yêu cầu xoá dữ liệu cá nhân (quyền được quên)
- Điều khoản dịch vụ quy định rõ chính sách hoàn tiền, quyền sử dụng nội dung người dùng cho marketing (opt-out được)
- Nếu tích hợp thanh toán, tuân thủ quy định của Ngân hàng Nhà nước về trung gian thanh toán (dùng cổng đã được cấp phép: VNPay/Momo/ZaloPay, không tự xử lý thẻ)

## 3. Hiệu năng
- Trang xem thiệp (khách mời) phải tải xong nội dung chính trong **dưới 2 giây** trên mạng 3G/4G trung bình — vì đa số khách mở trên di động, mạng yếu tại đám cưới
- Ảnh/video tự động nén & tạo nhiều kích thước (responsive images - srcset), phục vụ qua CDN
- Cache trang thiệp đã publish (ISR/CDN cache), chỉ invalidate cache khi chủ thiệp cập nhật nội dung
- Giới hạn lượt xem theo gói cần được kiểm tra ở tầng cache/Redis (không query DB mỗi lượt xem) để tránh nghẽn khi thiệp viral

## 4. Khả năng mở rộng (Scalability)
- Backend thiết kế dạng service tách rời (như trong kiến trúc G) để dễ scale riêng từng phần (VD: Media Service cần nhiều tài nguyên hơn khi nén video)
- Message Queue xử lý các tác vụ nặng/không cần phản hồi ngay (gửi email, nén ảnh, nhắc lịch) để không chặn luồng chính

## 5. Độ tin cậy & Backup
- Backup database tự động hàng ngày, lưu trữ tối thiểu 30 ngày
- Media gốc lưu ở Object Storage có redundancy (S3 multi-AZ hoặc tương đương)
- Có cơ chế rollback khi deploy lỗi (blue-green deployment hoặc tương đương)
- Uptime mục tiêu: 99.5% trở lên (đặc biệt quan trọng vào cuối tuần — mùa cưới cao điểm)

## 6. Khả năng truy cập & tương thích (Accessibility & Compatibility)
- Responsive đầy đủ: mobile (ưu tiên số 1), tablet, desktop
- Tương thích trình duyệt: Chrome, Safari (iOS), Samsung Internet — vì phần lớn khách mời Việt Nam dùng các trình duyệt này trên điện thoại
- Hỗ trợ chia sẻ trực tiếp qua Zalo/Messenger (test kỹ Open Graph preview trên 2 nền tảng này vì phổ biến nhất tại VN)

## 7. Giám sát & Logging
- Log tất cả giao dịch thanh toán, yêu cầu rút tiền (audit trail đầy đủ, không được sửa/xoá log)
- Theo dõi lỗi realtime (Sentry hoặc tương đương)
- Cảnh báo tự động khi: tỉ lệ lỗi thanh toán tăng bất thường, server quá tải, job queue bị tắc nghẽn
