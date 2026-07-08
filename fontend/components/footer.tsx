'use client'

import Link from 'next/link'
import { ROUTES, SECTIONS } from '@/lib/routes'

export default function Footer() {
  const links = {
    product: [
      { label: 'Mẫu thiệp', href: SECTIONS.templates },
      { label: 'Bảng giá', href: SECTIONS.pricing },
      { label: 'Tính năng', href: SECTIONS.features },
      { label: 'Blog', href: ROUTES.home },
    ],
    company: [
      { label: 'Về WeddingCard', href: ROUTES.home },
      { label: 'Đội ngũ', href: ROUTES.home },
      { label: 'Tuyển dụng', href: ROUTES.home },
      { label: 'Liên hệ', href: ROUTES.home },
    ],
    support: [
      { label: 'Trung tâm trợ giúp', href: ROUTES.home },
      { label: 'Hướng dẫn', href: ROUTES.home },
      { label: 'Điều khoản dịch vụ', href: ROUTES.home },
      { label: 'Chính sách bảo mật', href: ROUTES.home },
    ],
  }

  return (
    <footer className="w-full bg-gradient-to-b from-dark to-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href={ROUTES.home} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose to-pink flex items-center justify-center">
                <span className="text-white text-sm font-bold">♥</span>
              </div>
              <span className="font-serif text-xl font-bold">WeddingCard</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Nền tảng tạo thiệp cưới điện tử sang trọng cho các cặp đôi Việt Nam.
            </p>

            <div className="flex gap-3">
              {[
                { icon: 'f', label: 'Facebook', href: 'https://facebook.com' },
                { icon: '📷', label: 'Instagram', href: 'https://instagram.com' },
                { icon: '🎵', label: 'TikTok', href: 'https://tiktok.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-rose hover:to-pink transition-all"
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              {links.product.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-rose transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-4">Công ty</h4>
            <ul className="space-y-2">
              {links.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-rose transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {links.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-rose transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose/10 to-pink/10 border border-rose/20 rounded-xl p-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-serif text-lg font-bold mb-2">Nhận tin tức & mẹo cưới</h4>
            <p className="text-gray-300 text-sm mb-4">Những lời khuyên từ các chuyên gia và tin tức mới nhất.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Cảm ơn bạn! Chúng tôi sẽ gửi tin tức đến email của bạn.')
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Email của bạn"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-rose/50"
              />
              <button type="submit" className="bg-gradient-to-r from-rose to-pink text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 WeddingCard. Tất cả quyền được bảo lưu.
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-gray-400">Tất cả hệ thống hoạt động bình thường</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
