'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Tôi có thể tạo thiệp cưới miễn phí không?',
      a: 'Có! Gói Miễn Phí của chúng tôi cho phép bạn tạo thiệp điện tử đầu tiên hoàn toàn miễn phí. Bạn có thể tuỳ chỉnh nội dung, chia sẻ trực tuyến và quản lý khách mời cơ bản.',
    },
    {
      q: 'Khách mời của tôi có thể nhìn thấy thiệp trên thiết bị nào?',
      a: 'Thiệp của bạn hoạt động trên tất cả các thiết bị - desktop, tablet, và điện thoại di động. Mọi trình duyệt hiện đại đều được hỗ trợ, bao gồm Chrome, Firefox, Safari và Edge.',
    },
    {
      q: 'Tôi có thể sửa thiệp sau khi đã gửi cho khách mời không?',
      a: 'Tất nhiên! Bạn có thể chỉnh sửa thiệp bất kỳ lúc nào, và những thay đổi sẽ được cập nhật ngay trên các liên kết đã gửi. Khách mời luôn nhìn thấy phiên bản mới nhất.',
    },
    {
      q: 'Dữ liệu khách mời của tôi có an toàn không?',
      a: 'Có. Chúng tôi sử dụng mã hóa cấp độ ngân hàng để bảo vệ tất cả dữ liệu của bạn. Dữ liệu khách mời chỉ được bạn xem được, không bao giờ được chia sẻ với bất kỳ ai.',
    },
  ]

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-light-gray">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-serif text-center text-dark mb-10">
          Những câu hỏi thường gặp
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-light/50 transition-colors"
              >
                <h3 className="font-serif font-bold text-dark text-lg">{faq.q}</h3>
                <span
                  className={`text-rose text-2xl transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 py-4 text-gray-700 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
