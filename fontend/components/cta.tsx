'use client'

import Link from 'next/link'
import { ROUTES, SECTIONS } from '@/lib/routes'

export default function CTA() {
  return (
    <section className="relative w-full py-14 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose to-pink"></div>

      <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/30 mb-6">
          <span className="text-white text-sm">✨ Hoàn toàn miễn phí để bắt đầu</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
          Tạo thiệp cưới đẹp ngay
          <br />
          <span className="italic font-light">hôm nay nhé?</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-6">
          <Link
            href={ROUTES.register}
            className="px-8 py-3 rounded-full font-semibold text-rose bg-white hover:shadow-lg hover:scale-105 transition-all"
          >
            Bắt đầu miễn phí ngay →
          </Link>
          <Link
            href={SECTIONS.templates}
            className="px-8 py-3 rounded-full font-semibold text-white border-2 border-white hover:bg-white/10 transition-all"
          >
            Xem mẫu thiệp
          </Link>
        </div>

        <div className="text-white/80 text-sm space-y-1">
          <p>Không cần thẻ tín dụng · Tạo thiệp đầu tiên miễn phí · Huỷ bất cứ lúc nào</p>
        </div>
      </div>
    </section>
  )
}
