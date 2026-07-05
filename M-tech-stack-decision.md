# Tech Stack Decision (Chốt công nghệ cụ thể)

> Mục tiêu: loại bỏ mọi lựa chọn "tuỳ chọn A/B" để AI code hoặc dev không phải tự đoán.

## Frontend
| Hạng mục | Lựa chọn chốt |
|---|---|
| Framework | Next.js 14 (App Router) |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS |
| State management | Zustand (nhẹ, đủ dùng cho Canvas Editor) |
| Form handling | React Hook Form + Zod validation |
| Kéo-thả canvas | dnd-kit |
| Upload file | react-dropzone + presigned URL trực tiếp lên Cloudinary |

## Backend
| Hạng mục | Lựa chọn chốt |
|---|---|
| Framework | NestJS (Node.js + TypeScript) |
| ORM | Prisma |
| Validation | class-validator (tích hợp sẵn NestJS) |
| Auth | Passport.js (JWT strategy + Google OAuth strategy) |
| Queue | BullMQ (chạy trên Redis) |
| API docs | Swagger (tự sinh từ NestJS decorators) |

## Database & Storage
| Hạng mục | Lựa chọn chốt |
|---|---|
| Database chính | PostgreSQL 16 (dùng Supabase cho giai đoạn MVP — có sẵn Auth, Storage, dễ scale sau) |
| Cache | Redis (Upstash cho serverless, hoặc Redis Cloud) |
| Lưu trữ media | Cloudinary (tự động resize/nén ảnh, có CDN sẵn — ưu tiên hơn tự quản lý S3 ở giai đoạn đầu) |
| Search (giai đoạn 2+) | PostgreSQL full-text search trước, nâng lên Meilisearch nếu cần |

## Thanh toán (Việt Nam)
| Hạng mục | Lựa chọn chốt |
|---|---|
| Cổng thanh toán MVP | VNPay (phổ biến, hỗ trợ đa dạng ngân hàng nội địa) |
| Giai đoạn 2 thêm | Momo, ZaloPay |

## Email/SMS
| Hạng mục | Lựa chọn chốt |
|---|---|
| Email | Resend (dễ tích hợp với Next.js, giá tốt cho startup) |
| SMS (giai đoạn 2) | eSMS.vn hoặc Speed SMS (nhà cung cấp SMS nội địa VN) |

## Hạ tầng & Triển khai
| Hạng mục | Lựa chọn chốt |
|---|---|
| Frontend hosting | Vercel |
| Backend hosting | Railway (giai đoạn MVP) → chuyển sang AWS ECS/EC2 khi scale |
| CDN | Cloudflare (đặt trước domain chính, cache static assets) |
| CI/CD | GitHub Actions |
| Monitoring lỗi | Sentry |
| Domain/DNS | Cloudflare DNS |

## Công cụ nội bộ
| Hạng mục | Lựa chọn chốt |
|---|---|
| Quản lý code | GitHub (private repo), quy ước nhánh: `main` (production), `develop` (staging), `feature/*` |
| Quản lý task | Linear hoặc Trello |
| Thiết kế UI trước khi code | Figma |

---

## Lý do chọn Supabase + Cloudinary + Railway cho MVP
Mục tiêu MVP là **ra sản phẩm nhanh, chi phí thấp**, không cần tự vận hành hạ tầng phức tạp ngay từ đầu:
- Supabase: có sẵn PostgreSQL + Auth + Realtime, giảm thời gian setup backend auth
- Cloudinary: tự động xử lý resize/nén ảnh — quan trọng vì hiệu năng tải trang thiệp là yêu cầu bắt buộc (xem mục K)
- Railway: deploy backend NestJS nhanh, không cần tự cấu hình server

Khi lượng truy cập lớn hơn (giai đoạn 3+), có thể tách dần sang tự quản lý AWS/GCP để tối ưu chi phí.
