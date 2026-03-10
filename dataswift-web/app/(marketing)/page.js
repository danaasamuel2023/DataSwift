'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Clock, CheckCircle, Store, Users, Smartphone, CreditCard, TrendingUp, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import NetworkIcon from '@/components/shared/NetworkIcon';

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Shield className="w-3 h-3" />
              Trusted by 10,000+ Ghanaians
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
              Affordable data bundles, delivered instantly
            </h1>

            <p className="text-text-muted mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Buy MTN, Telecel & AirtelTigo data at the best prices in Ghana. Pay with Mobile Money — no account required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link href="/quick-buy">
                <Button size="lg">
                  Buy Data Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg">Create Free Account</Button>
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Instant delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Shield className="w-4 h-4 text-accent" />
                <span>Paystack secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CreditCard className="w-4 h-4 text-accent" />
                <span>MoMo & Wallet</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Clock className="w-4 h-4 text-accent" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Networks banner */}
      <section className="border-y border-white/[0.06] bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-center gap-3">
              <NetworkIcon network="YELLO" size={44} />
              <span className="text-sm font-semibold text-white hidden sm:block">MTN Ghana</span>
            </div>
            <div className="flex items-center gap-3">
              <NetworkIcon network="TELECEL" size={44} />
              <span className="text-sm font-semibold text-white hidden sm:block">Telecel</span>
            </div>
            <div className="flex items-center gap-3">
              <NetworkIcon network="AT_PREMIUM" size={44} />
              <span className="text-sm font-semibold text-white hidden sm:block">AirtelTigo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent, affordable prices</h2>
            <p className="text-text-muted mt-3 text-sm max-w-md mx-auto">No hidden fees. No markups. What you see is what you pay.</p>
          </div>

          <div className="space-y-12">
            {[
              { net: 'YELLO', label: 'MTN', bundles: [
                { gb: '1', price: '4.15', validity: 'No Expiry' },
                { gb: '2', price: '9.00', validity: '30 Days' },
                { gb: '5', price: '23.00', validity: '30 Days' },
                { gb: '10', price: '42.00', validity: '30 Days' },
              ]},
              { net: 'TELECEL', label: 'Telecel', bundles: [
                { gb: '10', price: '38.50', validity: '30 Days' },
                { gb: '15', price: '55.00', validity: '30 Days' },
                { gb: '25', price: '92.00', validity: '30 Days' },
                { gb: '50', price: '178.00', validity: '30 Days' },
              ]},
              { net: 'AT_PREMIUM', label: 'AirtelTigo', bundles: [
                { gb: '2', price: '8.50', validity: '30 Days' },
                { gb: '5', price: '20.00', validity: '30 Days' },
                { gb: '10', price: '39.00', validity: '30 Days' },
                { gb: '25', price: '96.00', validity: '30 Days' },
              ]},
            ].map((network) => (
              <div key={network.net}>
                <div className="flex items-center gap-3 mb-5">
                  <NetworkIcon network={network.net} size={36} />
                  <h3 className="font-bold text-white text-lg">{network.label} Bundles</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {network.bundles.map((b) => (
                    <Link href="/quick-buy" key={b.gb} className="group">
                      <div className="bg-card border border-white/[0.06] rounded-2xl p-5 hover:border-primary/30 transition-all duration-200">
                        {/* Data size */}
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-3xl font-extrabold text-white">{b.gb}</span>
                          <span className="text-sm font-semibold text-text-muted">GB</span>
                        </div>

                        {/* Info rows */}
                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-muted">Price</span>
                            <span className="text-sm font-bold text-white">GH₵{b.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-muted">Validity</span>
                            <span className="text-xs font-medium text-accent">{b.validity}</span>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="text-center text-sm font-semibold text-primary py-2.5 bg-primary/[0.08] rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-200">
                          Buy Now
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-card/50 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">How it Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Data in 3 simple steps</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: '1', icon: Smartphone, title: 'Select your bundle', desc: 'Choose your network and pick a data package that fits your needs.' },
              { num: '2', icon: CreditCard, title: 'Pay securely', desc: 'Pay with Mobile Money or your SwiftBundle wallet. All payments secured by Paystack.' },
              { num: '3', icon: Zap, title: 'Receive instantly', desc: 'Your data bundle is delivered to the recipient phone number within seconds.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {step.num}</div>
                <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/quick-buy">
              <Button size="lg">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Agent / Reseller section */}
      <section id="agents">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">For Agents</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Start your own data business</h2>
              <p className="text-text-muted mt-4 leading-relaxed">
                Create a branded data store, set your own prices, and share with your customers on WhatsApp.
                When they buy, you earn the profit. No capital needed — just sign up and start selling.
              </p>

              <div className="space-y-4 mt-8">
                {[
                  { icon: Store, text: 'Free branded store with your own link' },
                  { icon: TrendingUp, text: 'Set your own selling prices and margins' },
                  { icon: CreditCard, text: 'Customers pay directly via MoMo' },
                  { icon: Zap, text: 'Withdraw earnings to your MoMo anytime' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-text-muted">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/sign-up" className="inline-block mt-8">
                <Button size="lg">
                  Create Your Store <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Stats card */}
            <div className="bg-card border border-white/[0.06] rounded-2xl p-8">
              <h3 className="font-bold text-white text-lg mb-6">Why agents choose SwiftBundle</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '0%', label: 'Startup cost', icon: Shield },
                  { value: '< 30s', label: 'Delivery time', icon: Clock },
                  { value: '24/7', label: 'Availability', icon: Zap },
                  { value: 'Instant', label: 'Withdrawals', icon: CreditCard },
                ].map((stat) => (
                  <div key={stat.label}>
                    <stat.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Social proof */}
      <section className="bg-card/50 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What our users say</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Kwame A.', location: 'Accra', text: 'Been using SwiftBundle for months now. The data comes through instantly and the prices are the best I\'ve found anywhere.', rating: 5 },
              { name: 'Abena M.', location: 'Kumasi', text: 'I run a small data store with SwiftBundle. My customers are happy with the fast delivery and I make good profit.', rating: 5 },
              { name: 'Yaw K.', location: 'Tamale', text: 'Very reliable service. I buy data for my family every week and the MoMo payment is so convenient. No wahala.', rating: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-card border border-white/[0.06] rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-5">&ldquo;{review.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-text-muted">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="bg-card border border-white/[0.06] rounded-2xl p-8 sm:p-12 sm:flex sm:items-center sm:justify-between gap-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Referral Program</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Earn money when friends buy data</h3>
              <p className="text-text-muted text-sm mt-2 leading-relaxed">
                Share your unique referral code. Every time someone signs up and buys data using your code, you earn a commission deposited straight to your wallet.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex-shrink-0">
              <Link href="/sign-up">
                <Button size="lg">
                  Get Your Code <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to get started?</h2>
          <p className="text-text-muted mt-3 max-w-md mx-auto">
            Join thousands of Ghanaians who trust SwiftBundle for affordable, instant data bundles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/quick-buy">
              <Button size="lg">
                Buy Data Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" size="lg">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
