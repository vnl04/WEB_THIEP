'use client'

import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import Trust from '@/components/trust'
import HowItWorks from '@/components/how-it-works'
import Gallery from '@/components/gallery'
import Features from '@/components/features'
import Testimonials from '@/components/testimonials'
import Pricing from '@/components/pricing'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Trust />
      <HowItWorks />
      <Gallery />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
