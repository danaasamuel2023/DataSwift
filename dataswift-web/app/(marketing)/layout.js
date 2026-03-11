'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';

export default function MarketingLayout({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#pricing" className="text-sm text-text-muted hover:text-white transition-colors">Pricing</Link>
              <Link href="/#how-it-works" className="text-sm text-text-muted hover:text-white transition-colors">How it Works</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/quick-buy">
                <Button size="sm">Buy Data</Button>
              </Link>
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5"
            >
              {mobileMenu ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-card border-t border-white/[0.06] px-4 py-4 space-y-2">
            <Link href="/#pricing" className="block py-2.5 text-sm text-text-muted" onClick={() => setMobileMenu(false)}>Pricing</Link>
            <Link href="/#how-it-works" className="block py-2.5 text-sm text-text-muted" onClick={() => setMobileMenu(false)}>How it Works</Link>
            <div className="pt-3 flex gap-3 border-t border-white/[0.06]">
              <Link href="/sign-in" className="flex-1"><Button variant="outline" fullWidth size="sm">Log in</Button></Link>
              <Link href="/quick-buy" className="flex-1"><Button fullWidth size="sm">Buy Data</Button></Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <div className="flex items-center gap-1.5 text-xs text-accent">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-medium">Secured by Paystack</span>
            </div>
            <span className="text-xs text-text-muted">&copy; {new Date().getFullYear()} DataSwift. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
