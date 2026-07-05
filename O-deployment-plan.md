# Deployment Plan

## 1. Môi trường
| Môi trường | Mục đích | URL mẫu |
|---|---|---|
| Local | Dev máy cá nhân, dùng Docker Compose cho DB/Redis | localhost |
| Staging | Test trước khi release, dữ liệu giả | staging.tenweb.vn |
| Production | Hệ thống thật, khách hàng dùng | tenweb.vn |

## 2. Quy trình CI/CD
```
Push code lên nhánh feature/*
        ↓
GitHub Actions: chạy lint + test tự động
        ↓
Merge vào develop → tự động deploy lên Staging
        ↓
QA kiểm tra trên Staging
        ↓
Merge develop vào main → tự động deploy lên Production
        ↓
Chạy migration database (Prisma migrate deploy)
        ↓
Health check tự động - nếu lỗi, rollback về bản trước
```

## 3. Biến môi trường cần chuẩn bị (.env)

### Backend (apps/api)
```
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
VNPAY_TMN_CODE=
VNPAY_HASH_SECRET=
VNPAY_RETURN_URL=
RESEND_API_KEY=
SENTRY_DSN=
```

### Frontend (apps/web, apps/admin)
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## 4. Domain & DNS
- Domain chính: `tenweb.vn` → trỏ về Vercel (frontend `web`)
- Subdomain `api.tenweb.vn` → trỏ về Railway (backend `api`)
- Subdomain `admin.tenweb.vn` → trỏ về Vercel (app `admin`), giới hạn truy cập qua IP hoặc thêm xác thực lớp ngoài (Basic Auth) vì đây là khu vực nhạy cảm
- Cloudflare đứng trước tất cả để cache + chống DDoS cơ bản

## 5. Checklist trước khi go-live
- [ ] SSL/HTTPS hoạt động trên tất cả domain/subdomain
- [ ] Test thanh toán thật với số tiền nhỏ (sandbox → production key)
- [ ] Test gửi email thật (không rơi vào spam)
- [ ] Test luồng đầy đủ trên điện thoại thật (không chỉ DevTools responsive)
- [ ] Backup database đã chạy thử và khôi phục thử thành công 1 lần
- [ ] Đã có Chính sách bảo mật, Điều khoản dịch vụ publish trên web
- [ ] Đăng ký với cổng thanh toán xong (VNPay merchant account đã duyệt)
- [ ] Monitoring (Sentry) đã nhận được test error thành công
- [ ] Rate-limit đã test bằng cách gửi request dồn dập thử

## 6. Kế hoạch mở rộng hạ tầng khi traffic tăng
| Ngưỡng | Hành động |
|---|---|
| >10,000 thiệp active | Tách Redis cache riêng theo tenant, xem xét đọc/ghi tách (read replica cho PostgreSQL) |
| >100,000 lượt xem/ngày | Chuyển Railway → AWS ECS/EC2 để kiểm soát chi phí & scale ngang |
| Nhiều video/ảnh dung lượng lớn | Đánh giá chuyển từ Cloudinary sang tự quản lý S3 + CloudFront để giảm chi phí |
| Mùa cao điểm (Thu-Đông, mùa cưới VN) | Scale trước worker xử lý queue (email/nén ảnh) để tránh nghẽn khi lượng thiệp tạo mới tăng đột biến |
