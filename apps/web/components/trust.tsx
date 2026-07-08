'use client'

export default function Trust() {
  return (
    <section className="w-full py-10 px-4 bg-dark text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            Đã được công nhận
          </h2>
          <p className="text-base text-gray-300">
            Tin tưởng bởi các chuyên gia trong ngành cưới hỏi
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: 'Xuất hiện trên',
              items: ['Báo Sài Gòn Tiếp Thị', 'VTV3 Đời Sống', 'Tạp chí Wedding'],
              icon: '📰'
            },
            {
              title: 'Giải thưởng',
              items: ['Top 10 nền tảng cưới', 'Best Tech Startup 2024', 'Innovation Award'],
              icon: '🏆'
            },
            {
              title: 'Chứng minh',
              items: ['ISO 27001 Security', 'GDPR Compliant', 'PCI DSS Certified'],
              icon: '🔒'
            }
          ].map((group, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
              style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${i * 0.15}s forwards` }}
            >
              <div className="text-3xl mb-2">{group.icon}</div>
              <h3 className="text-lg font-serif font-bold mb-3">{group.title}</h3>
              <ul className="space-y-1">
                {group.items.map((item, j) => (
                  <li key={j} className="text-gray-300 text-xs flex items-center gap-2">
                    <span className="text-rose">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partnership logos */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-center text-gray-400 text-xs mb-4">Đối tác kinh doanh</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
            {[
              'Google',
              'Meta',
              'Stripe',
              'Twilio',
              'AWS',
              'Vercel'
            ].map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <span className="font-serif font-bold text-gray-400 text-xs">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
