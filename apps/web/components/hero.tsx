'use client'

export default function Hero() {
  return (
    <section className="relative w-full min-h-fit pt-20 pb-8 px-4 overflow-hidden bg-gradient-to-b from-rose/10 via-pink/5 to-white">
      {/* Cinematic background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink/30 to-transparent rounded-full floating-blob blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-rose/20 to-transparent rounded-full floating-blob blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full floating-blob blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose/20 to-pink/20 px-4 py-2 rounded-full border border-rose/30 shadow-sm">
            <span className="text-sm font-medium">✨ Nền tảng thiệp điện tử #1 Việt Nam</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-3" style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards' }}>
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-1">
            <span className="text-dark">Tạo thiệp cưới đẹp</span>
          </h1>
          <h1 className="text-5xl md:text-6xl font-serif italic text-gradient leading-tight">
            chỉ trong vài phút ✦
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-7 leading-relaxed fade-in-delay-1" style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out 0.1s forwards' }}>
          Hàng trăm mẫu thiệp sang trọng, dễ dàng tuỳ chỉnh. Quản lý khách mời, RSVP và nhận quà tặng.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7 fade-in" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s forwards', opacity: 0 }}>
          <button className="btn-primary text-lg hover:shadow-xl transform hover:-translate-y-1">
            Tạo thiệp miễn phí →
          </button>
          <button className="btn-secondary hover:shadow-lg">
            🎨 Xem mẫu thiệp
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs"
                style={{
                  background: ['#FDE2E4', '#FCE4EC', '#F3E5F5', '#E1BEE7'][i - 1],
                }}
              >
                {'👰🤵❤️💐'[i - 1]}
              </div>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="font-bold text-dark text-xs">4.9 ⭐ | 2,500+ cặp đôi tin dùng</div>
          </div>
        </div>

        {/* Card Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {[
            { bg: 'from-amber-100 to-orange-50', name: 'Ngọc Lan & Minh Khang', date: '15.06.2025' },
            { bg: 'from-rose/20 to-pink/10', name: 'Anh Tuấn & Linh Chi', date: '22.07.2025' },
            { bg: 'from-slate-100 to-gray-50', name: 'Đức Anh & Thảo Nhi', date: '08.08.2025' },
            { bg: 'from-yellow-100 to-amber-50', name: 'Văn Nam & Hương Giang', date: '14.09.2025' },
          ].map((card, i) => (
            <div
              key={i}
              className="card-hover group relative"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
            >
              <div
                className={`aspect-[3/4] rounded-lg shadow-md p-3 flex flex-col justify-between bg-gradient-to-br ${card.bg} border border-white/50 overflow-hidden text-xs`}
              >
                {/* Ornamental divider */}
                <div className="absolute top-1/3 left-0 right-0 flex justify-center">
                  <div className="text-xl text-gold/50">✦ ✦ ✦</div>
                </div>

                <div className="relative z-10">
                  <div className="text-center space-y-0.5">
                    <p className="font-serif text-xs font-bold text-dark">{card.name.split(' ')[0]}</p>
                    <p className="text-2xs text-gray-600">&</p>
                    <p className="font-serif text-xs font-bold text-dark">{card.name.split(' ')[1]}</p>
                  </div>
                </div>

                <div className="text-center z-10">
                  <p className="font-serif text-sm font-bold text-gold">{card.date}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <button className="btn-primary">Dùng mẫu này</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
