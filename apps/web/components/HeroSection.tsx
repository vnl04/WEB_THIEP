'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="section bg-background">
      <div className="section-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-block">
              <span className="badge-primary">✨ Create Beautiful Invitations</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
              Your Perfect <span className="text-primary">Wedding Invitation</span> Awaits
            </h1>

            <p className="text-lg text-foreground-muted leading-relaxed text-balance max-w-lg">
              Create stunning, personalized wedding invitation cards in minutes. Beautiful templates, easy customization, and professional delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register" className="btn-primary justify-center sm:justify-start">
                Create Your Card
              </Link>
              <Link href="/templates" className="btn-outline justify-center sm:justify-start">
                Browse Templates
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-border flex items-center gap-4">
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-sm text-foreground-muted">
                  <strong>4.9/5</strong> from 2,500+ couples
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Decorative cards stack */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Card 1 - Background */}
              <div className="absolute w-72 h-96 bg-surface border-2 border-border rounded-2xl shadow-lg transform -rotate-6 -translate-x-12 -translate-y-6" />

              {/* Card 2 - Middle */}
              <div className="absolute w-72 h-96 bg-surface border-2 border-primary rounded-2xl shadow-xl" />

              {/* Card 3 - Top */}
              <div className="absolute w-72 h-96 bg-gradient-to-br from-primary-lighter to-secondary border-2 border-primary rounded-2xl shadow-2xl transform rotate-3 translate-x-12 translate-y-6 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-serif text-primary mb-4">The Golden Hour</div>
                  <p className="text-foreground-muted">Join us in celebrating our wedding</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground-muted">Saturday, June 15, 2024</p>
                  <p className="text-sm text-foreground-muted">Grand Hotel, City Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
key = { tpl.id }
className = {`group relative cursor-pointer ${tpl.rotate} hover:rotate-0 hover:-translate-y-3 transition-all duration-500`}
              >
  {/* Card portrait */ }
  < div className = {`relative rounded-2xl bg-gradient-to-b ${tpl.bg} border ${tpl.accent} overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500`}
style = {{ aspectRatio: '3/4' }}
                >
  {/* Card inner content */ }
  < div className = "absolute inset-0 flex flex-col items-center justify-center p-5 text-center" >
    {/* Ornamental top */ }
    < div className = "flex items-center gap-2 mb-4" >
                      <div className="h-px w-8 bg-current opacity-20" />
                      <div className={`text-xs opacity-30 ${tpl.textColor}`}>✦</div>
                      <div className="h-px w-8 bg-current opacity-20" />
                    </div >

                    <p className={`font-sans text-[10px] uppercase tracking-[0.2em] mb-2 opacity-50 ${tpl.textColor}`}>Wedding Invitation</p>
                    <h3 className={`font-serif text-xl leading-snug mb-1 ${tpl.textColor}`}>Ngọc Lan</h3>
                    <p className={`font-sans text-xs opacity-40 ${tpl.textColor} mb-1`}>&amp;</p>
                    <h3 className={`font-serif text-xl leading-snug mb-4 ${tpl.textColor}`}>Minh Khang</h3>

{/* Divider */ }
                    <div className={`h-px w-16 opacity-20 ${i % 2 === 0 ? 'bg-amber-600' : 'bg-rose-500'} mb-4`} />

                    <p className={`font-serif text-xs italic opacity-60 ${tpl.textColor}`}>25.12.2026</p>
                  </div >

  {/* Hover overlay with CTA */ }
  < div className = "absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-2xl" >
    <button className="px-4 py-2 bg-rose-500 text-white text-xs font-sans rounded-full font-medium hover:bg-rose-600 transition-colors shadow-md">
      Dùng mẫu này
    </button>
                  </div >
                </div >

  {/* Label */ }
  < p className = "text-center font-sans text-sm text-gray-600 mt-3 font-medium" > { tpl.name }</p >
    <p className="text-center font-sans text-xs text-gray-400">{tpl.style}</p>
              </div >
            ))}
          </div >

  {/* See all link */ }
  < div className = "text-center mt-10" >
    <Link
      href="/templates"
      className="inline-flex items-center gap-2 text-sm font-sans text-rose-500 hover:text-rose-600 transition-colors no-underline font-medium"
    >
      Xem tất cả mẫu thiệp
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
          </div >
        </div >
      </div >
    </section >
  );
}
