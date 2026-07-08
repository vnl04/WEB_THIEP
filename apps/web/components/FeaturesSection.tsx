'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: '🎨',
      title: 'Beautiful Templates',
      description: 'Choose from 20+ professionally designed templates that match your wedding style.',
    },
    {
      icon: '✏️',
      title: 'Easy Customization',
      description: 'Drag-and-drop editor to customize colors, fonts, and content in minutes.',
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Your cards look perfect on all devices - desktop, tablet, and mobile.',
    },
    {
      icon: '💝',
      title: 'Gift Management',
      description: 'Built-in gift tracking with VNPay and Momo payment integration.',
    },
    {
      icon: '✍️',
      title: 'Guest Wishes',
      description: 'Collect heartfelt messages and wishes from your guests.',
    },
    {
      icon: '📊',
      title: 'RSVP Tracking',
      description: 'Real-time guest responses and attendance management dashboard.',
    },
    {
      icon: '🎁',
      title: 'QR Code Share',
      description: 'Generate QR codes for easy sharing and guest engagement.',
    },
    {
      icon: '📧',
      title: 'Email Invites',
      description: 'Send professional invitations directly to your guest list.',
    },
  ];

  const stats = [
    { value: '2,500+', label: 'Cặp đôi đã dùng', icon: '💑' },
    { value: '250K+', label: 'Khách mời đã nhận thiệp', icon: '✉️' },
    { value: '50M+', label: 'Quà tặng qua nền tảng', icon: '🎁' },
    { value: '4.9⭐', label: 'Đánh giá trung bình', icon: '💛' },
  ];

  return (
    <section className="section bg-surface-light" id="features">
      <div className="section-wide">
        <div className="text-center mb-16">
          <span className="badge-primary mb-4">Features</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">
            Everything You Need
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-balance">
            All the tools to create, customize, and share your perfect wedding invitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 hover:border-primary-light cursor-pointer group transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-gradient-to-b from-rose-50 to-white border border-rose-50 hover:border-rose-100 transition-colors">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-serif text-2xl md:text-3xl font-semibold text-rose-500 mb-1">{stat.value}</div>
              <p className="font-sans text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
