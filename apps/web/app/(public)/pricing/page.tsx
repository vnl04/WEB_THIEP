import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 0,
      currency: 'Free',
      description: 'Perfect for intimate weddings',
      highlighted: false,
      features: [
        'Basic card editor',
        'Up to 50 guests',
        'RSVP tracking',
        'Basic wishes',
        'QR gift code',
        'Email invitations',
      ],
      cta: 'Start for Free',
    },
    {
      name: 'Professional',
      price: 299000,
      currency: 'VND',
      description: 'Best for most weddings',
      highlighted: true,
      features: [
        'Advanced editor',
        'Unlimited guests',
        'SMS reminders',
        'Gift analytics dashboard',
        'Multiple templates',
        'Custom styling',
        'Priority support',
      ],
      cta: 'Get Professional',
    },
    {
      name: 'Premium',
      price: 599000,
      currency: 'VND',
      description: 'Complete wedding solution',
      highlighted: false,
      features: [
        'All Professional features',
        'Custom domain',
        'Advanced analytics',
        'Video messages',
        'Guest photo gallery',
        'Venue directions & maps',
        'Live support',
        'Custom branding',
      ],
      cta: 'Go Premium',
    },
  ];

  return (
    <main className="min-h-screen bg-background section">
      <div className="section-wide">
        <div className="text-center mb-16">
          <span className="badge-primary mb-4">Pricing</span>
          <h1 className="text-5xl font-serif font-bold mb-4 text-foreground text-balance">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include our powerful wedding card editor and guest management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`card overflow-hidden transition-all ${
                plan.highlighted 
                  ? 'ring-2 ring-primary shadow-xl md:scale-105' 
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="bg-primary text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-foreground-muted text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price === 0 ? 'Miễn phí' : plan.price.toLocaleString()}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-foreground-muted ml-2">{plan.currency}/lifetime</span>
                  )}
                </div>

                <Link 
                  href="/register" 
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-all mb-8 ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-light card p-12 rounded-2xl text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { title: 'Card Editor', desc: 'Drag-and-drop editor with 20+ templates' },
              { title: 'Guest Management', desc: 'Manage invites, RSVPs, and attendance' },
              { title: 'Gift Tracking', desc: 'Track gifts and payments with QR codes' },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-foreground-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Ready to create your perfect wedding card?
          </h2>
          <Link href="/templates" className="btn-primary inline-block">
            Explore Templates
          </Link>
        </div>
      </div>
    </main>
  );
}
