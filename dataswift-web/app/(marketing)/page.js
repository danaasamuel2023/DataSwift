'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Clock, Smartphone, Store, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import NetworkIcon from '@/components/shared/NetworkIcon';

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Instant data delivery
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Buy cheap data
              <br />
              <span className="gradient-text">in seconds.</span>
            </h1>
            <p className="text-text-muted mt-5 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              MTN, Telecel & AirtelTigo bundles at the lowest prices.
              Pay with MoMo — no account needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link href="/quick-buy">
                <Button size="lg">
                  Buy data now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg">Create account</Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
            {[
              { value: '10K+', label: 'Orders delivered' },
              { value: '< 30s', label: 'Average delivery' },
              { value: '24/7', label: 'Available' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-white/[0.04] bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How it works</h2>
            <p className="text-text-muted mt-2 text-sm">Three simple steps to get your data</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', icon: Smartphone, title: 'Choose your bundle', desc: 'Select your network and preferred data package.' },
              { step: '02', icon: Shield, title: 'Pay with MoMo', desc: 'Secure payment via Mobile Money or wallet balance.' },
              { step: '03', icon: Zap, title: 'Instant delivery', desc: 'Data is delivered to your phone within seconds.' },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary/60">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Best prices in Ghana</h2>
            <p className="text-text-muted mt-2 text-sm">No hidden fees. What you see is what you pay.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { net: 'YELLO', label: 'MTN', color: 'mtn', bundles: [{ gb: '1GB', price: '4.15' }, { gb: '2GB', price: '9.00' }, { gb: '5GB', price: '23.00' }, { gb: '10GB', price: '42.00' }] },
              { net: 'TELECEL', label: 'Telecel', color: 'telecel', bundles: [{ gb: '10GB', price: '38.50' }, { gb: '15GB', price: '55.00' }, { gb: '25GB', price: '92.00' }, { gb: '50GB', price: '178.00' }] },
              { net: 'AT_PREMIUM', label: 'AirtelTigo', color: 'at', bundles: [{ gb: '2GB', price: '8.50' }, { gb: '5GB', price: '20.00' }, { gb: '10GB', price: '39.00' }, { gb: '25GB', price: '96.00' }] }
            ].map((network) => (
              <div key={network.net} className="glass-card rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300">
                <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-3">
                  <NetworkIcon network={network.net} size={32} />
                  <span className="font-bold text-white">{network.label}</span>
                </div>
                <div className="px-5 py-3">
                  {network.bundles.map((b) => (
                    <div key={b.gb} className="flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-0">
                      <span className="text-text-muted text-sm">{b.gb}</span>
                      <span className="font-bold text-white">GH₵{b.price}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-4">
                  <Link href="/quick-buy" className="block text-center text-sm font-semibold text-primary py-2.5 border border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
                    Buy {network.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Data / Agent section */}
      <section className="border-y border-white/[0.04] bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
                <Store className="w-3.5 h-3.5" />
                For agents
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sell data & earn profit</h2>
              <p className="text-text-muted mt-3 text-sm leading-relaxed">
                Create your own data store, set your prices, and share the link on WhatsApp.
                Customers pay via MoMo, you keep the profit. Withdraw to your MoMo anytime.
              </p>
              <Link href="/sign-up" className="inline-block mt-6">
                <Button size="md">
                  Create a store <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, title: 'Free to start', desc: 'No upfront cost' },
                { icon: Shield, title: 'Your prices', desc: 'Full pricing control' },
                { icon: Smartphone, title: 'MoMo payments', desc: 'Customers pay direct' },
                { icon: Clock, title: 'Instant withdraw', desc: 'Get paid anytime' },
              ].map((f) => (
                <div key={f.title} className="glass-card rounded-xl p-4">
                  <f.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="font-semibold text-white text-sm">{f.title}</p>
                  <p className="text-text-muted text-xs mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Referral CTA */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="gradient-border rounded-2xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Users className="w-3.5 h-3.5" />
              Referral Program
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Refer friends, earn commission</h3>
            <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
              Share your referral code and earn a commission every time your friends buy data.
            </p>
            <Link href="/sign-up" className="mt-6 inline-block">
              <Button size="md">
                Get your referral code <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
