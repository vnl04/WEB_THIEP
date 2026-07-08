'use client'

export default function Testimonials() {
  const testimonials = [
    {
      avatar: '👰',
      name: 'Ngọc Lan',
      city: 'Hà Nội',
      stars: 5,
      quote: 'WeddingCard giúp chúng tôi tiết kiệm thời gian và chi phí cho thiệp cưới. Các mẫu đều rất sang trọng và dễ tuỳ chỉnh!',
    },
    {
      avatar: '🤵',
      name: 'Minh Khang',
      city: 'TP. Hồ Chí Minh',
      stars: 5,
      quote: 'Thực sự ấn tượng với chất lượng dịch vụ. Khách mời của chúng tôi rất thích thiệp điện tử, và bảng RSVP rất tiện lợi.',
    },
    {
      avatar: '💐',
      name: 'Thảo Nhi',
      city: 'Đà Nẵng',
      stars: 5,
      quote: 'Dịch vụ khách hàng rất tốt. Tất cả các tính năng đều hoạt động mượt mà, và các mẫu thiệp luôn được cập nhật.',
    },
  ]

  return (
    <section className="w-full py-14 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-serif text-center text-dark mb-12">
          Những yêu thích từ các cặp đôi
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="card-hover p-7 rounded-2xl bg-gradient-to-br from-rose/5 to-pink/5 border border-rose/10 shadow-sm hover:shadow-md"
            >
              {/* Quote mark */}
              <div className="text-5xl text-rose/40 mb-3">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.stars)].map((_, j) => (
                  <span key={j} className="text-amber-400 text-lg">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose to-pink flex items-center justify-center text-2xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-serif font-bold text-dark">{testimonial.name}</p>
                  <p className="text-gray-600 text-xs">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
