'use client';

import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />

      {/* Trust Section */}
      <section className="section bg-surface-light">
        <div className="section-wide">
          <div className="text-center space-y-12">
            <div>
              <span className="badge-primary mb-4">Trusted By</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Thousands of Happy Couples
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2.5K+</div>
                <p className="text-foreground-muted">Couples Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">250K+</div>
                <p className="text-foreground-muted">Guests Invited</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50M+</div>
                <p className="text-foreground-muted">₫ Gifts Received</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                <p className="text-foreground-muted">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-background">
        <div className="section-wide">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif text-balance">
              What Our Couples Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Linh & Hương',
                location: 'Hà Nội',
                text: 'WeddingCard made our invitation process so easy and beautiful. Our guests loved the interactive card!',
                rating: 5,
              },
              {
                name: 'Minh & Trang',
                location: 'Hồ Chí Minh',
                text: 'The RSVP tracking and gift management features saved us so much time during planning.',
                rating: 5,
              },
              {
                name: 'Anh & Duyên',
                location: 'Đà Nẵng',
                text: 'Professional templates and easy customization. Our card turned out even better than we imagined!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-foreground-muted mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground-muted">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-surface-light">
        <div className="section-wide">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-serif text-balance">
              Common Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How long does it take to create a card?',
                a: 'Most couples create their card in 5-10 minutes. You can customize templates or start from scratch.',
              },
              {
                q: 'Can I send invitations to multiple guests?',
                a: 'Yes! Depending on your plan, you can send to 50, 200, or unlimited guests.',
              },
              {
                q: 'What payment methods do you support?',
                a: 'We support VNPay, Momo, and bank transfers for gift payments.',
              },
              {
                q: 'Can I track who responded to my invitation?',
                a: 'Absolutely! Our dashboard shows RSVP status in real-time.',
              },
            ].map((item, index) => (
              <div key={index} className="card p-6">
                <details className="group cursor-pointer">
                  <summary className="font-semibold text-foreground flex items-center justify-between">
                    {item.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-foreground-muted mt-4">{item.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
