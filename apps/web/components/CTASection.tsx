'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-primary via-primary-light to-primary-lighter">
      <div className="section-wide">
        <div className="text-center space-y-8 py-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-balance">
            Ready to Create Your Perfect Invitation?
          </h2>

          <p className="text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Join thousands of couples who have created beautiful wedding invitations with WeddingCard.
            Start for free today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-surface-light transition-colors duration-300 active:scale-95"
            >
              Create Your Card Now
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark/30 text-white font-semibold rounded-lg hover:bg-primary-dark/50 transition-colors duration-300 active:scale-95 border border-white/30"
            >
              View Templates
            </Link>
          </div>

          <p className="text-sm text-white/70">
            No credit card required. Create your first card for free.
          </p>
        </div>
      </div>
    </section>
  );
}
