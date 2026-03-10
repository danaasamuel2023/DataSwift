'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';

export default function MarketingLayout({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/quick-buy" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">Buy Data</Link>
              <Link href="/#pricing" className="text-sm font-medium text-text-muted hover:text-text transition-colors">Pricing</Link>
              <Link href="/#how-it-works" className="text-sm font-medium text-text-muted hover:text-text transition-colors">How it Works</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileMenu ? <X className="w-5 h-5 text-text" /> : <Menu className="w-5 h-5 text-text" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-surface border-t border-white/[0.04] px-4 py-4 space-y-3">
            <Link href="/quick-buy" className="block py-2 text-sm font-bold text-primary" onClick={() => setMobileMenu(false)}>Buy Data</Link>
            <Link href="/#pricing" className="block py-2 text-sm font-medium text-text-muted" onClick={() => setMobileMenu(false)}>Pricing</Link>
            <Link href="/#how-it-works" className="block py-2 text-sm font-medium text-text-muted" onClick={() => setMobileMenu(false)}>How it Works</Link>
            <div className="pt-2 flex gap-3">
              <Link href="/sign-in" className="flex-1"><Button variant="outline" fullWidth size="sm">Log in</Button></Link>
              <Link href="/sign-up" className="flex-1"><Button fullWidth size="sm">Get Started</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-white/[0.04] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <p className="text-white font-extrabold text-lg mb-3">Swift<span className="text-primary">Bundle</span></p>
              <p className="text-sm text-text-muted leading-relaxed">
                Cheap data bundles for MTN, Telecel & AirtelTigo. Pay with MoMo.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
              <div className="space-y-2 text-sm text-text-muted">
                <Link href="/sign-up" className="block hover:text-primary transition-colors">Buy Data</Link>
                <Link href="/sign-up" className="block hover:text-primary transition-colors">Agent Store</Link>
                <Link href="/#pricing" className="block hover:text-primary transition-colors">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
              <div className="space-y-2 text-sm text-text-muted">
                <Link href="/#" className="block hover:text-primary transition-colors">About</Link>
                <Link href="/#" className="block hover:text-primary transition-colors">Support</Link>
                <Link href="/#" className="block hover:text-primary transition-colors">Terms</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.04] mt-8 pt-6 text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} SwiftBundle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
