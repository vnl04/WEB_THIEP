export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        'Basic card editor',
        '5 guests',
        'RSVP tracking',
        'Simple wishes',
        'QR gift code',
      ],
    },
    {
      name: 'Premium',
      price: 299000,
      features: [
        'Advanced editor',
        'Unlimited guests',
        'SMS reminders',
        'Gift analytics',
        'Custom domain',
        'Email support',
      ],
    },
  ];

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-center text-gray-600 mb-16">Choose the plan that works for you</p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className="card p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.price.toLocaleString()}
                </span>
                {plan.price > 0 && <span className="text-gray-600 ml-2">VND/lifetime</span>}
              </div>
              <button className="btn-primary w-full mb-8">Get Started</button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
