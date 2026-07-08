'use client'

export default function Gallery() {
  const invitations = [
    {
      title: 'Cổ điển sang trọng',
      couple: 'Thanh Hương & Minh Tuấn',
      color: 'from-amber-100 to-orange-50',
      date: '15 tháng 6',
      theme: 'Vàng kim'
    },
    {
      title: 'Hiện đại tối giản',
      couple: 'Linh Chi & Anh Tuấn',
      color: 'from-slate-100 to-gray-100',
      date: '22 tháng 7',
      theme: 'Xám trắng'
    },
    {
      title: 'Lãng mạn hồng',
      couple: 'Thảo Nhi & Đức Anh',
      color: 'from-pink/20 to-rose/10',
      date: '08 tháng 8',
      theme: 'Hồng nhạt'
    },
    {
      title: 'Vintage quý phái',
      couple: 'Hương Giang & Văn Nam',
      color: 'from-purple-100 to-pink-50',
      date: '14 tháng 9',
      theme: 'Tím vàng'
    },
    {
      title: 'Tối giản trang nhã',
      couple: 'Yến Nhi & Trung Kiên',
      color: 'from-green-50 to-emerald-50',
      date: '21 tháng 10',
      theme: 'Xanh lá'
    },
    {
      title: 'Dịu dàng và yên bình',
      couple: 'Ngân Hà & Khánh Hoàng',
      color: 'from-blue-50 to-cyan-50',
      date: '28 tháng 11',
      theme: 'Xanh biển'
    }
  ]

  return (
    <section className="w-full py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Hàng trăm mẫu thiệp đẹp
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Từ cổ điển đến hiện đại, mỗi thiệp được thiết kế bởi các nhà thiết kế chuyên nghiệp
          </p>
          <button className="btn-primary">
            Xem toàn bộ bộ sưu tập
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {invitations.map((inv, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${i * 0.08}s forwards` }}
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-96">
                {/* Invitation Preview */}
                <div className={`w-full h-full bg-gradient-to-br ${inv.color} flex flex-col justify-between p-8 border border-white/50`}>
                  {/* Top */}
                  <div>
                    <div className="text-center mb-4">
                      <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Lời mời dự cưới</p>
                      <div className="text-2xl text-gold/50 mb-3">✦</div>
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="text-center">
                    <p className="font-serif text-lg font-bold text-dark mb-2">{inv.couple.split(' ')[0]}</p>
                    <p className="text-sm text-gray-600 mb-2">&</p>
                    <p className="font-serif text-lg font-bold text-dark">{inv.couple.split(' ').slice(1).join(' ')}</p>
                  </div>

                  {/* Bottom */}
                  <div className="text-center">
                    <p className="font-serif text-gold text-sm font-semibold">{inv.date}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-serif text-xl mb-2">{inv.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{inv.theme}</p>
                  <button className="bg-white text-rose font-medium px-6 py-2 rounded-full hover:bg-gray-100 transition-all">
                    Dùng mẫu này →
                  </button>
                </div>
              </div>

              {/* Info below */}
              <div className="mt-4">
                <h3 className="font-serif text-lg font-bold text-dark">{inv.title}</h3>
                <p className="text-sm text-gray-600">{inv.couple}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
