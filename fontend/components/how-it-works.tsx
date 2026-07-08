'use client'

export default function HowItWorks() {
  const steps = [
    { icon: '🎨', title: 'Chọn mẫu thiệp', desc: 'Từ hàng trăm mẫu thiệp đẹp' },
    { icon: '✏️', title: 'Tuỳ chỉnh nội dung', desc: 'Thêm tên, ngày, lời nhắn riêng' },
    { icon: '🚀', title: 'Chia sẻ & quản lý', desc: 'Gửi cho khách mời ngay' },
  ]

  return (
    <section className="relative w-full py-12 px-4 bg-gradient-to-b from-white via-rose/5 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="text-center mb-4">
          <span className="text-rose font-semibold text-sm">Cách hoạt động</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">
          <span className="text-dark">Chỉ </span>
          <span className="text-gradient italic">3 bước đơn giản</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose/30 to-transparent"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Numbered Badge */}
              <div className="flex justify-center mb-8">
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-rose to-pink flex items-center justify-center text-white text-4xl font-serif font-bold shadow-lg">
                  {i + 1}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="text-5xl mb-5">{step.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
