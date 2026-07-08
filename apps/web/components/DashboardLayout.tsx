'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  navItems: NavItem[];
  headerAction?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  title,
  description,
  navItems,
  headerAction,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-surface border-r border-border h-screen flex flex-col transition-all duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl">
            <span className="text-primary">♥</span>
            <span>WeddingCard</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-primary-lighter text-primary font-semibold'
                  : 'text-foreground-muted hover:bg-surface-light hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-4">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-surface-light transition-colors">
            <span className="text-lg">⚙️</span>
            <span className="text-sm">Settings</span>
          </Link>
          <button className="w-full px-4 py-2 text-sm text-foreground-muted hover:text-foreground transition-colors text-left">
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-overlay z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-surface-light rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-sm text-foreground-muted">{description}</p>
              )}
            </div>
          </div>

          {headerAction && <div>{headerAction}</div>}
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
