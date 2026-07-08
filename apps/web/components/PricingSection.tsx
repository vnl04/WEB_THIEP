'use client';

import Link from 'next/link';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '199.000',
      description: 'Perfect for intimate gatherings',
      features: [
        '1 card design',
        'Up to 50 guests',
        'Basic templates',
        'Email invitations',
        'RSVP tracking',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '399.000',
      description: 'Most popular choice',
      features: [
        '3 card designs',
        'Up to 200 guests',
        'All templates',
        'Email + SMS invites',
        'RSVP tracking',
        'Gift management',
        'QR code sharing',
        'Analytics dashboard',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Premium',
      price: '699.000',
      description: 'For grand celebrations',
      features: [
        'Unlimited designs',
        'Unlimited guests',
        'All templates + custom',
        'All communication channels',
        'Advanced RSVP',
        'Gift + wish management',
        'QR code + video share',
        'Priority support',
        'Custom domain',
      ],
      cta: 'Get Started',
      popular: false,
    },
  ];

  return (
    <section className="section bg-background" id="pricing">
      <div className="section-wide">
        <div className="text-center mb-16">
          <span className="badge-primary mb-4">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-balance">
            Choose the perfect plan for your wedding. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card p-8 flex flex-col ${plan.popular ? 'ring-2 ring-primary scale-105 md:scale-100' : ''} transition-all duration-300`}
            >
              {plan.popular && (
                <div className="mb-4">
                  <span className="badge-primary">Most Popular</span>
                </div>
              )}

              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-foreground-muted text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                <span className="text-foreground-muted ml-2">₫</span>
              </div>

              <Link
                href="/register"
                className={plan.popular ? 'btn-primary justify-center mb-8' : 'btn-outline justify-center mb-8'}
              >
                {plan.cta}
              </Link>

              <div className="divider mb-6" />

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-foreground-muted text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Hint */}
        <div className="text-center mt-12">
          <p className="text-foreground-muted">
            Questions about pricing?{' '}
            <a href="#contact" className="text-primary font-semibold hover:text-primary-dark">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
