'use client'

export default function Stats() {
  const stats = [
    {
      number: '50,000+',
      label: 'Cặp đôi đã kết hôn',
      icon: '💑'
    },
    {
      number: '500,000+',
      label: 'Thiệp được gửi',
      icon: '📬'
    },
    {
      number: '98%',
      label: 'Khách mời phản hồi',
      icon: '✓'
    },
    {
      number: '4.9/5',
      label: 'Đánh giá từ người dùng',
      icon: '⭐'
    }
  ]

  return (
    <section className="relative w-full py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Stats Row - Horizontal Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center fade-in-delay-${i % 3} p-5 rounded-lg bg-gradient-to-br from-rose/8 to-pink/8 border border-rose/15 hover:shadow-md transition-all`}
              style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="font-serif text-4xl font-bold text-gradient">
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Additional Stats Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Mẫu thiệp', value: '200+' },
            { label: 'Quốc gia', value: '45+' },
            { label: 'Setup', value: '< 5 phút' },
            { label: 'Support', value: '24/7 Việt' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-rose-50 border border-gray-200 text-center hover:shadow-md transition-all">
              <div className="text-xs text-gray-600 mb-1 font-medium">{item.label}</div>
              <div className="font-serif text-2xl font-bold text-gradient">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
