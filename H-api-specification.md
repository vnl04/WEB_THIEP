# API Specification — Wedding Card Platform

Base URL: `https://api.yourapp.com/v1`
Auth: Bearer JWT trong header `Authorization: Bearer <token>`, trừ các endpoint đánh dấu **Public**.

---

## 1. Auth & Users

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/auth/register` | Đăng ký email/mật khẩu | Public |
| POST | `/auth/login` | Đăng nhập | Public |
| POST | `/auth/oauth/google` | Đăng nhập/đăng ký qua Google | Public |
| POST | `/auth/oauth/facebook` | Đăng nhập/đăng ký qua Facebook | Public |
| POST | `/auth/verify-otp` | Xác thực OTP sau đăng ký | Public |
| POST | `/auth/forgot-password` | Gửi link/OTP đặt lại mật khẩu | Public |
| POST | `/auth/reset-password` | Đặt lại mật khẩu mới | Public |
| POST | `/auth/refresh-token` | Làm mới access token | User |
| GET | `/users/me` | Lấy thông tin tài khoản hiện tại | User |
| PATCH | `/users/me` | Cập nhật hồ sơ (tên, avatar, SĐT) | User |
| POST | `/users/me/bank-account` | Thêm/cập nhật thông tin ngân hàng (KYC) | User |

---

## 2. Templates (Kho mẫu thiệp)

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/templates` | Danh sách mẫu, hỗ trợ query: `?category=&tier=&search=&sort=popular\|newest&page=` | Public |
| GET | `/templates/{id}` | Chi tiết 1 mẫu (dùng cho preview) | Public |
| POST | `/templates` | Tạo mẫu mới (designer/admin upload) | Admin |
| PATCH | `/templates/{id}` | Cập nhật mẫu | Admin |
| POST | `/templates/{id}/approve` | Duyệt mẫu công khai | Admin |
| POST | `/templates/{id}/reject` | Từ chối mẫu kèm lý do | Admin |
| DELETE | `/templates/{id}` | Gỡ mẫu khỏi kho | Admin |

---

## 3. Cards (Thiệp)

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/cards` | Tạo thiệp mới từ 1 template | User |
| GET | `/cards` | Danh sách thiệp của tôi | User |
| GET | `/cards/{id}` | Chi tiết thiệp (dùng cho Canvas Editor) | User/Editor |
| PATCH | `/cards/{id}` | Cập nhật nội dung thiệp (autosave từ canvas) | User/Editor |
| DELETE | `/cards/{id}` | Xoá thiệp | User |
| POST | `/cards/{id}/publish` | Xuất bản thiệp, sinh link + QR | User |
| POST | `/cards/{id}/unpublish` | Gỡ xuất bản tạm thời | User |
| GET | `/cards/slug/{slug}` | **Lấy thiệp theo slug để hiển thị cho khách** | Public |
| PATCH | `/cards/{id}/slug` | Đổi slug tuỳ chỉnh | User |
| GET | `/cards/{id}/og-tags` | Lấy thẻ Open Graph đã sinh | Public |
| POST | `/cards/{id}/editors` | Mời người đồng chỉnh sửa (gửi email) | Owner |
| POST | `/cards/{id}/editors/{inviteId}/accept` | Chấp nhận lời mời đồng chỉnh sửa | User |
| DELETE | `/cards/{id}/editors/{userId}` | Gỡ quyền đồng chỉnh sửa | Owner |
| GET | `/cards/{id}/stats` | Thống kê lượt xem/lượt thích/RSVP | Owner |
| POST | `/cards/{id}/analytics-integration` | Gắn Google Analytics ID / FB Pixel ID | Owner |
| GET | `/cards/{id}/export` | Xuất/sao lưu toàn bộ dữ liệu (ZIP) | Owner |

---

## 4. Media Assets

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/cards/{id}/media` | Upload ảnh/video/nhạc (multipart hoặc presigned URL) | Owner/Editor |
| POST | `/cards/{id}/media/youtube` | Nhúng video YouTube (chỉ cần URL) | Owner/Editor |
| GET | `/cards/{id}/media` | Danh sách media theo thiệp | Owner/Editor/Public (nếu published) |
| PATCH | `/cards/{id}/media/{mediaId}` | Đổi vị trí, section, thứ tự | Owner/Editor |
| DELETE | `/cards/{id}/media/{mediaId}` | Xoá media | Owner/Editor |

---

## 5. Guests & RSVP

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/cards/{id}/guests` | Thêm 1 khách mời | Owner |
| POST | `/cards/{id}/guests/import` | Import danh sách khách từ file CSV | Owner |
| GET | `/cards/{id}/guests` | Danh sách khách + trạng thái gửi/xem/RSVP | Owner |
| PATCH | `/guests/{guestId}` | Sửa thông tin khách | Owner |
| DELETE | `/guests/{guestId}` | Xoá khách | Owner |
| GET | `/guests/token/{inviteToken}` | **Lấy thiệp cá nhân hoá theo token riêng của khách** | Public |
| POST | `/guests/{guestId}/track-view` | Ghi nhận khách đã mở thiệp | Public |
| POST | `/guests/{guestId}/rsvp` | Khách gửi xác nhận tham dự | Public |
| GET | `/cards/{id}/rsvps` | Tổng hợp danh sách RSVP | Owner |
| POST | `/guests/{guestId}/send-reminder` | Gửi nhắc RSVP thủ công | Owner |
| POST | `/cron/rsvp-reminders` | (internal) Job tự động quét & gửi nhắc RSVP | System |

---

## 6. Wishes (Lời chúc)

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/cards/{id}/wishes` | Khách gửi lời chúc (qua bộ lọc từ khoá tự động) | Public |
| GET | `/cards/{id}/wishes` | Danh sách lời chúc (query `?status=approved` cho public view) | Public/Owner |
| PATCH | `/wishes/{wishId}/approve` | Duyệt lời chúc bị giữ | Owner |
| PATCH | `/wishes/{wishId}/hide` | Ẩn lời chúc | Owner |
| PATCH | `/wishes/{wishId}/pin` | Ghim lời chúc | Owner |
| DELETE | `/wishes/{wishId}` | Xoá lời chúc | Owner |
| POST | `/wishes/{wishId}/report` | Báo cáo lời chúc vi phạm | Public |

---

## 7. Gifts & Withdrawals (Mừng cưới)

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/cards/{id}/gift-info` | Lấy thông tin QR/tài khoản nhận mừng cưới | Public |
| POST | `/cards/{id}/gifts` | Khách gửi quà (QR/quà ảo), tạo giao dịch | Public |
| GET | `/cards/{id}/gifts` | Danh sách quà đã nhận | Owner |
| POST | `/gifts/{giftId}/webhook` | (internal) Webhook cổng thanh toán xác nhận giao dịch quà | System |
| POST | `/withdrawals` | Tạo yêu cầu rút tiền | User |
| GET | `/withdrawals` | Lịch sử rút tiền của tôi | User |
| GET | `/admin/withdrawals` | Danh sách yêu cầu rút tiền chờ duyệt | Admin |
| POST | `/admin/withdrawals/{id}/approve` | Duyệt rút tiền | Admin |
| POST | `/admin/withdrawals/{id}/reject` | Từ chối rút tiền | Admin |

---

## 8. Plans, Subscriptions & Payments

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/plans` | Danh sách gói Free/Basic/Premium | Public |
| POST | `/subscriptions` | Tạo đơn nâng cấp gói cho 1 thiệp | User |
| GET | `/subscriptions/{id}` | Chi tiết đơn/gói đang dùng | User |
| POST | `/payments/checkout` | Tạo phiên thanh toán (trả về URL cổng thanh toán) | User |
| POST | `/payments/webhook/{provider}` | (internal) Webhook VNPay/Momo/ZaloPay/Stripe | System |
| GET | `/payments/{id}` | Trạng thái giao dịch | User |
| POST | `/full-service-orders` | Tạo yêu cầu dịch vụ thiệp trọn gói | Public/User |
| GET | `/full-service-orders/{id}` | Theo dõi trạng thái đơn trọn gói | User |
| PATCH | `/admin/full-service-orders/{id}/quote` | Admin gửi báo giá | Admin |
| PATCH | `/admin/full-service-orders/{id}/status` | Cập nhật trạng thái (đang làm/đã giao) | Admin |

---

## 9. Affiliate

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/affiliate/my-code` | Lấy/tạo mã giới thiệu của tôi | User |
| GET | `/affiliate/referrals` | Danh sách người đã giới thiệu thành công | User |
| GET | `/affiliate/rewards` | Lịch sử hoa hồng nhận được | User |
| POST | `/affiliate/apply-code` | Áp dụng mã giảm giá khi thanh toán | User |

---

## 10. Notifications

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/notifications` | Danh sách thông báo của tôi | User |
| PATCH | `/notifications/{id}/read` | Đánh dấu đã đọc | User |
| POST | `/notifications/mark-all-read` | Đánh dấu tất cả đã đọc | User |

---

## 11. Support

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/support/tickets` | Tạo yêu cầu hỗ trợ | User/Public |
| GET | `/support/tickets` | Danh sách ticket của tôi | User |
| GET | `/support/tickets/{id}/messages` | Xem hội thoại | User |
| POST | `/support/tickets/{id}/messages` | Gửi tin nhắn trong ticket | User |
| GET | `/admin/support/tickets` | Danh sách ticket cần xử lý | Admin |
| PATCH | `/admin/support/tickets/{id}` | Cập nhật trạng thái/gán người xử lý | Admin |

---

## 12. Admin & Moderation

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/admin/users` | Danh sách người dùng | Admin |
| PATCH | `/admin/users/{id}/lock` | Khoá tài khoản vi phạm | Admin |
| PATCH | `/admin/users/{id}/unlock` | Mở khoá tài khoản | Admin |
| GET | `/admin/reports` | Danh sách báo cáo vi phạm (lời chúc/media) | Admin |
| PATCH | `/admin/reports/{id}/resolve` | Xử lý báo cáo | Admin |
| GET | `/admin/revenue` | Báo cáo doanh thu theo gói/thời gian/nguồn | Admin |
| GET | `/admin/dashboard-summary` | Số liệu tổng quan hệ thống | Admin |

---

## Quy ước chung
- Tất cả response trả JSON dạng `{ "success": true, "data": {...} }` hoặc `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Phân trang dùng query `?page=1&limit=20`, response kèm `meta: { total, page, limit }`
- Các endpoint upload media dùng **presigned URL** (xin URL từ `/media/presign` trước, sau đó PUT trực tiếp lên S3/Cloudinary) để giảm tải cho backend
- Webhook từ bên thứ 3 (cổng thanh toán) cần xác thực chữ ký (signature) trước khi xử lý
- Rate-limit riêng cho các endpoint public dễ bị spam: `/cards/{id}/wishes`, `/guests/{guestId}/rsvp`, `/cards/{id}/gifts`
