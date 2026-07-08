'use client'

export default function Pricing() {
  const plans = [
    {
      name: 'Miễn Phí',
      price: '0',
      currency: '₫',
      description: 'Tạo thiệp đầu tiên',
      features: [
        'Hàng trăm mẫu thiệp',
        'Tuỳ chỉnh nội dung',
        'Chia sẻ trực tuyến',
        'Quản lý khách mời cơ bản',
        'Hỗ trợ email',
      ],
      cta: 'Bắt đầu ngay',
      highlighted: false,
    },
    {
      name: 'Chuyên nghiệp',
      price: '199',
      currency: '₫',
      period: '/tháng',
      description: 'Cho cặp đôi muốn thêm tính năng',
      badge: 'Phổ biến',
      features: [
        'Tất cả ở gói Miễn Phí',
        'Quản lý khách mời nâng cao',
        'Nhận quà tặng (Registry)',
        'Dashboard thống kê chi tiết',
        'Hỗ trợ ưu tiên 24/7',
        'Gửi lời chúc từ khách mời',
      ],
      cta: 'Nâng cấp ngay',
      highlighted: true,
    },
    {
      name: 'Cao cấp',
      price: '499',
      currency: '₫',
      period: '/tháng',
      description: 'Trải nghiệm tối ưu',
      features: [
        'Tất cả ở gói Chuyên nghiệp',
        'Chỉnh sửa và thiết kế tùy chỉnh',
        'Tích hợp thanh toán',
        'Video và nhạc nền riêng',
        'Export dữ liệu khách mời',
        'Tên miền riêng',
      ],
      cta: 'Chọn Cao cấp',
      highlighted: false,
    },
  ]

  return (
    <section className="w-full py-14 px-4 bg-gradient-to-b from-white to-gray-light">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-serif text-center text-dark mb-4">
          Bảng giá đơn giản
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Chọn gói phù hợp với bạn. Không cần thẻ tín dụng để bắt đầu.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl transition-all duration-300 shadow-sm ${
                plan.highlighted
                  ? 'md:scale-105 shadow-lg border-2 border-rose bg-gradient-to-br from-white to-rose/5'
                  : 'border border-gray-200 bg-white hover:shadow-md'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex bg-gradient-to-r from-rose to-pink text-white px-4 py-1 rounded-full text-xs font-semibold">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Plan Name */}
                <h3 className="font-serif text-2xl font-bold text-dark mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-5">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-gray-600 text-sm">{plan.currency}</span>
                    {plan.period && <span className="text-gray-600 text-sm">{plan.period}</span>}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-full font-semibold mb-7 transition-all text-sm ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'border border-rose text-rose hover:bg-rose/5'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="text-rose font-bold text-lg leading-none mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-sm leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
