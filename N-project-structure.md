# Project Folder Structure

Cấu trúc monorepo, tách frontend/backend rõ ràng nhưng dùng chung 1 repo để dễ đồng bộ type/schema.

```
wedding-card-platform/
├── apps/
│   ├── web/                          # Next.js frontend (khách + chủ thiệp)
│   │   ├── app/
│   │   │   ├── (public)/
│   │   │   │   ├── page.tsx                  # Trang chủ
│   │   │   │   ├── templates/page.tsx        # Kho mẫu
│   │   │   │   ├── pricing/page.tsx          # Bảng giá
│   │   │   │   └── [slug]/page.tsx           # Trang xem thiệp (khách mời)
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── editor/[cardId]/page.tsx  # Canvas Editor
│   │   │   │   ├── guests/page.tsx
│   │   │   │   ├── wishes/page.tsx
│   │   │   │   └── gifts/page.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── blocks/                       # Các block thiệp: Cover, Gallery, RSVP...
│   │   │   │   ├── CoverBlock.tsx
│   │   │   │   ├── CountdownBlock.tsx
│   │   │   │   ├── GalleryBlock.tsx
│   │   │   │   ├── RsvpFormBlock.tsx
│   │   │   │   ├── WishesBlock.tsx
│   │   │   │   └── GiftBlock.tsx
│   │   │   ├── editor/                       # UI riêng cho Canvas Editor
│   │   │   │   ├── CanvasPreview.tsx
│   │   │   │   ├── BlockToolbar.tsx
│   │   │   │   └── ControlPanel.tsx
│   │   │   └── ui/                           # Component dùng chung (button, input...)
│   │   ├── lib/
│   │   │   ├── api-client.ts                 # Gọi API backend
│   │   │   └── hooks/
│   │   └── public/
│   │
│   ├── admin/                         # Next.js Admin Panel (tách app riêng)
│   │   └── app/
│   │       ├── templates/page.tsx           # Duyệt mẫu
│   │       ├── moderation/page.tsx          # Kiểm duyệt nội dung
│   │       ├── users/page.tsx
│   │       └── revenue/page.tsx
│   │
│   └── api/                           # NestJS backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── templates/
│       │   │   ├── cards/
│       │   │   ├── media/
│       │   │   ├── guests/
│       │   │   ├── wishes/
│       │   │   ├── gifts/
│       │   │   ├── withdrawals/
│       │   │   ├── payments/
│       │   │   ├── subscriptions/
│       │   │   ├── affiliate/
│       │   │   ├── notifications/
│       │   │   ├── support/
│       │   │   └── admin/
│       │   ├── queue/
│       │   │   ├── jobs/
│       │   │   │   ├── send-reminder.job.ts
│       │   │   │   ├── check-card-lifecycle.job.ts
│       │   │   │   └── compress-media.job.ts
│       │   │   └── queue.module.ts
│       │   ├── common/                       # Guards, interceptors, decorators dùng chung
│       │   ├── config/
│       │   └── main.ts
│       └── prisma/
│           ├── schema.prisma                 # Toàn bộ ERD ở file F chuyển thành schema này
│           └── migrations/
│
├── packages/                          # Code dùng chung giữa web/admin/api
│   ├── types/                                # TypeScript types/interfaces chung (Card, Guest, Wish...)
│   ├── template-schema/                      # Định nghĩa cấu trúc JSON block cho mẫu thiệp
│   └── config/                               # eslint, tsconfig chung
│
├── docs/                              # Toàn bộ tài liệu A-O đã tạo, để AI/dev tham chiếu
│   ├── flows/                                # File A-E, I (.mermaid)
│   ├── database/                             # File F (erd.mermaid)
│   ├── architecture/                         # File G
│   ├── api/                                  # File H
│   └── planning/                             # File J, K, L, M, N, O
│
├── .github/
│   └── workflows/
│       ├── deploy-web.yml
│       ├── deploy-api.yml
│       └── ci-test.yml
│
├── docker-compose.yml                 # Chạy PostgreSQL + Redis local khi dev
├── .env.example
├── turbo.json                         # Cấu hình Turborepo (build/dev toàn monorepo)
└── package.json
```

## Ghi chú
- Dùng **Turborepo** để quản lý monorepo (build cache, chạy song song `web`, `admin`, `api`)
- Thư mục `packages/template-schema` rất quan trọng — đây là nơi định nghĩa chuẩn JSON block (mô tả ở tài liệu Template Builder), dùng chung cho cả `web` (render thiệp) và `admin`/Template Builder (thiết kế mẫu)
- `docs/` nên được commit vào repo để bất kỳ AI coding agent nào (Claude Code, Cursor...) đọc được ngay khi mở dự án
