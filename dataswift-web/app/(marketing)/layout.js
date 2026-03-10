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
              <Link href="/#agents" className="text-sm text-text-muted hover:text-white transition-colors">For Agents</Link>
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
            <Link href="/#agents" className="block py-2.5 text-sm text-text-muted" onClick={() => setMobileMenu(false)}>For Agents</Link>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="text-sm text-text-muted leading-relaxed mt-3">
                Ghana&apos;s trusted platform for instant data bundles. MTN, Telecel & AirtelTigo.
              </p>
              <div className="flex items-center gap-1.5 mt-4 text-xs text-accent">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-medium">Secured by Paystack</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
              <div className="space-y-2.5 text-sm text-text-muted">
                <Link href="/quick-buy" className="block hover:text-white transition-colors">Buy Data</Link>
                <Link href="/sign-up" className="block hover:text-white transition-colors">Agent Store</Link>
                <Link href="/#pricing" className="block hover:text-white transition-colors">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
              <div className="space-y-2.5 text-sm text-text-muted">
                <Link href="/#how-it-works" className="block hover:text-white transition-colors">How it Works</Link>
                <Link href="/#" className="block hover:text-white transition-colors">Contact Us</Link>
                <Link href="/#" className="block hover:text-white transition-colors">FAQs</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
              <div className="space-y-2.5 text-sm text-text-muted">
                <Link href="/#" className="block hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/#" className="block hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/#" className="block hover:text-white transition-colors">Refund Policy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
            <span>&copy; {new Date().getFullYear()} SwiftBundle. All rights reserved.</span>
            <span>DataSwift &middot; Payments by Paystack</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
