'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-light border-t border-border">
      <div className="section-wide">
        {/* Main Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl mb-4">
              <span className="text-primary">♥</span>
              <span>WeddingCard</span>
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              Create beautiful, personalized wedding invitation cards for your special day.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-foreground-muted hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-foreground-muted hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#features" className="text-foreground-muted hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-foreground-muted hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-foreground-muted hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="text-foreground-muted hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground-muted hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#careers" className="text-foreground-muted hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-foreground-muted hover:text-primary transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-foreground-muted hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-foreground-muted hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#security" className="text-foreground-muted hover:text-primary transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground-muted text-sm">
            © {currentYear} WeddingCard. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com"
              className="text-foreground-muted hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4V9.5c0-.821.821-1.5 1.5-1.5H16V3h-2.5C11 3 9 5 9 7.5V8z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-foreground-muted hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 5.5-5.5 8.5v.5z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              className="text-foreground-muted hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1112.63 8A4 4 0 0116 11.37z" fill="currentColor" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-rose/50"
              />
              <button className="bg-gradient-to-r from-rose to-pink text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                →
              </button>
            </div >
          </div >
        </div >

  {/* Bottom Bar */ }
  < div className = "border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" >
    <p className="text-gray-500 text-sm">
      © 2025 WeddingCard. Tất cả quyền được bảo lưu.
    </p>

{/* Status */ }
<div className="flex items-center gap-2 text-sm">
  <span className="w-2 h-2 rounded-full bg-green-500"></span>
  <span className="text-gray-400">Tất cả hệ thống hoạt động bình thường</span>
</div>
        </div >
      </div >
    </footer >
  )
}
