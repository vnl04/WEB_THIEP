'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md shadow-md">
      <div className="section-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Premium */}
          <Link href="/" className="flex items-center gap-3 font-serif font-bold text-2xl hover:text-primary transition-colors">
            <span className="text-2xl">💍</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">WeddingCard</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/templates" className="px-4 py-2 text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300">
              Templates
            </Link>
            <Link href="/pricing" className="px-4 py-2 text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300">
              Pricing
            </Link>
            <Link href="/features" className="px-4 py-2 text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300">
              Features
            </Link>
            <a href="#contact" className="px-4 py-2 text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300">
              Contact
            </a>
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="btn-ghost">
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link href="/templates" className="px-4 py-2 rounded-lg hover:bg-surface-light transition-colors">
                Templates
              </Link>
              <Link href="/pricing" className="px-4 py-2 rounded-lg hover:bg-surface-light transition-colors">
                Pricing
              </Link>
              <Link href="/features" className="px-4 py-2 rounded-lg hover:bg-surface-light transition-colors">
                Features
              </Link>
              <a href="#contact" className="px-4 py-2 rounded-lg hover:bg-surface-light transition-colors">
                Contact
              </a>
              <div className="pt-2 border-t border-border mt-2 flex flex-col gap-2">
                <Link href="/login" className="px-4 py-2 text-center rounded-lg hover:bg-surface-light">
                  Login
                </Link>
                <Link href="/register" className="btn-primary justify-center">
                  Get Started
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
