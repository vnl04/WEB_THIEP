# Wireframe Spec — Các màn hình chính

Mô tả bố cục dạng cấu trúc (text-based layout) để AI code/dev dựng UI đúng ý mà không cần ảnh mockup.

---

## 1. Trang chủ (Public)
```
[Header: Logo | Mẫu thiệp | Bảng giá | Đăng nhập/Đăng ký]
[Hero: Tiêu đề chính + CTA "Tạo thiệp ngay" + ảnh minh hoạ]
[Section: Lưới mẫu thiệp nổi bật - 6-8 mẫu, mỗi ô có ảnh + tên + badge Free/Premium]
[Section: Các bước sử dụng - 3 bước đơn giản có icon]
[Section: Thiệp khách hàng đã tạo - showcase carousel]
[Section: Bảng giá tóm tắt - 2-3 cột Free/Basic/Premium]
[Footer: Liên kết chính sách, mạng xã hội]
```

## 2. Trang kho mẫu (/templates)
```
[Header giống trang chủ]
[Thanh lọc trái/trên: Danh mục | Tier Free-Basic-Premium | Ô tìm kiếm | Sắp xếp]
[Lưới mẫu - responsive grid 4 cột desktop / 2 cột mobile]
  - Mỗi thẻ mẫu: ảnh thumbnail, tên, tier badge, nút "Xem trước" + "Dùng mẫu này"
[Phân trang hoặc infinite scroll]
```

## 3. Canvas Editor (/editor/{cardId}) — màn hình quan trọng nhất
```
[Thanh trên cùng: Logo | Tên thiệp (sửa được) | Nút Xem trước Mobile/Desktop | Nút Xuất bản]
[Layout 2 cột]
  Cột trái (30%) - Panel điều khiển:
    - Tab: Nội dung | Thiết kế | Khách mời | Mừng cưới | Cài đặt
    - Tab Nội dung: form nhập tên, ngày giờ, câu chuyện, upload ảnh/video
    - Tab Thiết kế: chọn màu, font, nhạc nền, hiệu ứng
    - Tab Khách mời: bảng danh sách khách + nút import CSV
    - Tab Mừng cưới: cấu hình QR/tài khoản nhận
  Cột phải (70%) - Canvas Preview:
    - Hiển thị thiệp WYSIWYG theo khung điện thoại (mặc định)
    - Click trực tiếp vào từng phần tử để sửa tại chỗ (floating toolbar hiện ra)
    - Kéo-thả để đổi thứ tự block (icon "≡" bên cạnh mỗi block khi hover)
[Thanh dưới cùng (mobile only): nút Lưu nháp | Xem trước | Xuất bản]
```

## 4. Trang xem thiệp — khách mời (/{slug} hoặc /{slug}?guest={token})
```
[Không có header/footer chuẩn - full-screen trải nghiệm thiệp]
Block Cover: ảnh nền, tên cô dâu chú rể, ngày cưới, nút cuộn xuống
Block Đếm ngược
Block Thông tin cô dâu chú rể
Block Câu chuyện tình yêu (timeline)
Block Album ảnh/video (gallery, lightbox khi click)
Block Thông tin sự kiện + bản đồ nhúng
Block Form RSVP: chọn Tham dự/Không + số người
Block Hộp lời chúc: danh sách lời chúc + form gửi lời chúc mới
Block Mừng cưới: QR code + nút sao chép số tài khoản
[Nhạc nền tự phát - nút bật/tắt góc màn hình]
```

## 5. Dashboard chủ thiệp (/dashboard)
```
[Sidebar trái: Tổng quan | Thiệp của tôi | Khách mời | Lời chúc | Mừng cưới | Gói dịch vụ | Cài đặt]
[Khu vực chính - tuỳ trang chọn]
  Tổng quan: các thẻ số liệu (lượt xem, RSVP, lời chúc, tổng quà) + biểu đồ đơn giản
  Thiệp của tôi: danh sách thiệp dạng card, nút Sửa/Xem/Xoá
  Khách mời: bảng có cột Tên | SĐT | Trạng thái gửi | Đã xem | RSVP, nút Import CSV, nút Gửi nhắc
  Lời chúc: danh sách dạng feed, nút Duyệt/Ẩn/Ghim từng lời chúc
  Mừng cưới: tổng số dư, lịch sử giao dịch, nút Yêu cầu rút tiền
```

## 6. Trang Admin (/admin)
```
[Sidebar: Duyệt mẫu | Kiểm duyệt nội dung | Người dùng | Đơn hàng | Rút tiền | Báo cáo | Doanh thu]
[Mỗi mục là 1 bảng dữ liệu chuẩn: filter, search, pagination, action buttons Duyệt/Từ chối/Khoá]
```

## 7. Trang bảng giá (/pricing)
```
[3 cột: Free | Basic | Premium]
  Mỗi cột: giá, danh sách tính năng có tick/x, nút "Chọn gói này"
[Bảng so sánh chi tiết bên dưới - dạng bảng đầy đủ tất cả tính năng]
```

---

## Ghi chú thiết kế chung
- Ưu tiên thiết kế **mobile-first** cho trang xem thiệp (khách mời hầu hết mở trên điện thoại)
- Canvas Editor có thể dùng desktop-first vì chủ thiệp thường soạn trên máy tính, nhưng vẫn phải responsive để dùng được trên điện thoại
- Màu sắc/font chủ đạo nên trung tính ở phần khung quản trị (Dashboard/Admin), để không "đụng" với theme màu của từng mẫu thiệp
