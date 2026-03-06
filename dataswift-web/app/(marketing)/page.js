'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import NetworkIcon from '@/components/shared/NetworkIcon';

export default function LandingPage() {
  return (
    <>
      {/* Hero — short, punchy, one clear action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-secondary">
          Cheap data bundles,<br />
          delivered <span className="text-primary">in seconds.</span>
        </h1>
        <p className="text-secondary/50 mt-4 text-base sm:text-lg max-w-md">
          MTN, Telecel & AirtelTigo. Pay with MoMo — no account needed.
        </p>
        <div className="flex gap-3 mt-6">
          <Link href="/quick-buy">
            <Button size="lg">
              Buy data now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" size="lg">Sign up</Button>
          </Link>
        </div>
      </section>

      {/* Pricing — the thing people actually came to see */}
      <section id="pricing" className="bg-white border-y border-secondary/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary mb-8">Prices</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { net: 'YELLO', label: 'MTN', bundles: [{ gb: '1GB', price: '4.15' }, { gb: '2GB', price: '9.00' }, { gb: '5GB', price: '23.00' }, { gb: '10GB', price: '42.00' }] },
              { net: 'TELECEL', label: 'Telecel', bundles: [{ gb: '10GB', price: '38.50' }, { gb: '15GB', price: '55.00' }, { gb: '25GB', price: '92.00' }, { gb: '50GB', price: '178.00' }] },
              { net: 'AT_PREMIUM', label: 'AirtelTigo', bundles: [{ gb: '2GB', price: '8.50' }, { gb: '5GB', price: '20.00' }, { gb: '10GB', price: '39.00' }, { gb: '25GB', price: '96.00' }] }
            ].map((network) => (
              <div key={network.net} className="rounded-xl border border-secondary/[0.08] overflow-hidden">
                <div className="px-4 py-3 border-b border-secondary/[0.06] flex items-center gap-2.5">
                  <NetworkIcon network={network.net} size={28} />
                  <span className="font-bold text-sm text-secondary">{network.label}</span>
                </div>
                <div className="px-4 py-2">
                  {network.bundles.map((b) => (
                    <div key={b.gb} className="flex items-center justify-between py-2 text-sm">
                      <span className="text-secondary/60">{b.gb}</span>
                      <span className="font-bold text-secondary">GH₵{b.price}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 pb-3">
                  <Link href="/quick-buy" className="block text-center text-sm font-semibold text-primary py-2 border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all">
                    Buy {network.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell data — for agents */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="sm:flex sm:items-start sm:justify-between sm:gap-12">
          <div className="sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-extrabold text-secondary">Sell data too</h2>
            <p className="text-secondary/50 mt-2 text-sm leading-relaxed">
              Create a store, set your own prices, share the link on WhatsApp.
              When customers buy, you keep the profit. Withdraw to MoMo anytime.
            </p>
            <Link href="/sign-up" className="inline-block mt-4">
              <Button size="sm">Create a store <ArrowRight className="w-3.5 h-3.5" /></Button>
            </Link>
          </div>
          <div className="mt-6 sm:mt-0 text-sm text-secondary/50 space-y-2">
            <p>- Free to create, no upfront cost</p>
            <p>- You set the selling price</p>
            <p>- Customers pay via MoMo</p>
            <p>- Withdraw profits anytime</p>
          </div>
        </div>
      </section>

      {/* Referral — one line, not a whole section */}
      <section className="border-t border-secondary/[0.06] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-secondary">Refer friends, earn commission</h3>
            <p className="text-secondary/40 text-sm mt-1">You get a cut every time they buy data.</p>
          </div>
          <Link href="/sign-up" className="mt-3 sm:mt-0 inline-block">
            <Button variant="outline" size="sm">Sign up to get your code</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
