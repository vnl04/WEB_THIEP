'use client'

export default function Features() {
  const features = [
    { icon: '🎨', title: 'Hàng trăm mẫu đẹp', desc: 'Những thiệp cưới được thiết kế bởi các nhà thiết kế chuyên nghiệp' },
    { icon: '👥', title: 'Quản lý khách mời', desc: 'Tạo danh sách khách mời, theo dõi RSVP dễ dàng' },
    { icon: '📊', title: 'Dashboard trực quan', desc: 'Theo dõi thống kê lượt xem, RSVP theo thời gian thực' },
  ]

  const stats = [
    { label: 'Cặp đôi', value: '2,500+' },
    { label: 'Đánh giá', value: '4.9⭐' },
    { label: 'Khách mời', value: '250K+' },
    { label: 'Uptime', value: '99.9%' },
  ]

  const cardColors = [
    'from-rose/10 to-pink/5',
    'from-pink/10 to-rose/5',
    'from-amber/10 to-yellow/5',
  ]

  const bgColors = [
    'bg-rose/20',
    'bg-pink/20',
    'bg-amber/20',
  ]

  return (
    <section id="tinh-nang" className="w-full py-14 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="text-center mb-4">
          <span className="text-rose font-semibold text-sm">Tính năng</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">
          <span className="text-dark">Mọi thứ bạn cần cho </span>
          <span className="text-gradient">ngày trọng đại</span>
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`card-hover p-7 rounded-2xl border border-white/50 bg-gradient-to-br ${cardColors[i]} shadow-sm hover:shadow-md`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${bgColors[i]} mb-5 text-3xl`}>
                {feature.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl bg-gradient-to-br from-rose/10 to-pink/10 border border-rose/20 text-center`}>
              <div className="font-bold text-2xl text-rose mb-2">{stat.value}</div>
              <div className="text-gray-700 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
