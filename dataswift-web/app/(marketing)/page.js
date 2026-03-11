'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Clock, CheckCircle, CreditCard, ChevronDown, Phone, Wifi, Star, Users, TrendingUp, Smartphone } from 'lucide-react';
import Button from '@/components/ui/Button';
import NetworkIcon from '@/components/shared/NetworkIcon';

const networkData = [
  { id: 'YELLO', label: 'MTN', color: '#FFCC00', bgClass: 'from-yellow-500 to-amber-500', bundles: [
    { gb: '1', price: '4.15', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '2', price: '9.00', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '5', price: '23.00', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '10', price: '42.00', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '15', price: '60.00', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '20', price: '80.00', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '25', price: '100.00', rollover: 'N/A', duration: 'No Expiry' },
    { gb: '50', price: '200.00', rollover: 'N/A', duration: 'No Expiry' },
  ]},
  { id: 'AT_PREMIUM', label: 'AirtelTigo', color: '#0066CC', bgClass: 'from-blue-600 to-blue-700', bundles: [
    { gb: '1', price: '3.80', rollover: 'Yes', duration: '60 Days' },
    { gb: '2', price: '7.50', rollover: 'Yes', duration: '60 Days' },
    { gb: '5', price: '18.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '10', price: '35.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '15', price: '52.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '25', price: '85.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '50', price: '165.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '100', price: '320.00', rollover: 'Yes', duration: '60 Days' },
  ]},
  { id: 'TELECEL', label: 'Telecel', color: '#E60000', bgClass: 'from-red-600 to-red-700', bundles: [
    { gb: '5', price: '18.50', rollover: 'Yes', duration: '60 Days' },
    { gb: '10', price: '36.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '15', price: '52.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '20', price: '68.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '25', price: '85.00', rollover: 'Yes', duration: '60 Days' },
    { gb: '50', price: '165.00', rollover: 'Yes', duration: '60 Days' },
  ]},
];

export default function LandingPage() {
  const [activeNetwork, setActiveNetwork] = useState('YELLO');
  const [expandedCard, setExpandedCard] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentNetwork = networkData.find(n => n.id === activeNetwork);

  return (
    <>
      {/* Hero Banner — gradient like DataMart */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.08] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 pb-10 sm:pb-16">
          {/* Greeting banner */}
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-5 sm:p-8 mb-8 shadow-xl shadow-primary/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  Buy Cheap Data Bundles Instantly
                </h1>
                <p className="text-blue-100 mt-2 text-sm sm:text-base">
                  MTN, Telecel & AirtelTigo — Best prices in Ghana. No account needed.
                </p>
                <p className="text-white font-bold text-xs mt-3 bg-black/20 inline-block px-3 py-1.5 rounded-full border border-white/20">
                  Trusted by 10,000+ Ghanaians
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <Link href="/quick-buy">
                  <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-primary font-bold text-sm rounded-xl shadow-lg hover:bg-gray-50 transition-all active:scale-[0.98]">
                    Buy Data Now
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all active:scale-[0.98]">
                    Create Account
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* System Status Banner — like DataMart */}
          <div className="bg-gradient-to-r from-accent to-emerald-600 rounded-2xl p-4 sm:p-5 mb-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-white rounded-full relative" />
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">System Online</span>
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] sm:text-xs font-bold">24/7</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-100 text-xs sm:text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-2.5 py-1.5 rounded-full whitespace-nowrap">
                  <Wifi className="w-3 h-3 text-white" />
                  <span className="text-[10px] sm:text-xs text-white font-medium">Always Open</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-2.5 py-1.5 rounded-full whitespace-nowrap">
                  <Zap className="w-3 h-3 text-white" />
                  <span className="text-[10px] sm:text-xs text-white font-medium">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-2.5 py-1.5 rounded-full whitespace-nowrap">
                  <Shield className="w-3 h-3 text-white" />
                  <span className="text-[10px] sm:text-xs text-white font-bold">Paystack Secured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Network Buttons — like DataMart "Place New Order" */}
          <div className="bg-card border border-white/[0.06] rounded-2xl overflow-hidden shadow-lg mb-8">
            <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600" />
            <div className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-white mb-4">Quick Buy — Select Network</h2>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {networkData.map((net) => (
                  <Link href="/quick-buy" key={net.id}>
                    <div className="flex flex-col items-center p-3 sm:p-5 rounded-2xl border border-white/[0.06] hover:border-white/20 hover:shadow-lg transition-all duration-200 bg-white/[0.02] hover:bg-white/[0.04] active:scale-[0.97]">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 mb-2 sm:mb-3">
                        <NetworkIcon network={net.id} size={64} />
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">{net.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'text-primary' },
              { icon: Zap, value: '< 30s', label: 'Delivery Time', color: 'text-accent' },
              { icon: Shield, value: '100%', label: 'Secure Payments', color: 'text-primary' },
              { icon: Clock, value: '24/7', label: 'Always Available', color: 'text-accent' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-white/[0.06] rounded-2xl p-4 sm:p-5 text-center hover:border-white/10 transition-all">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section id="pricing" className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="bg-card border border-white/[0.06] rounded-2xl overflow-hidden shadow-lg">
            <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600" />
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">Our Data Packages</h2>
                <p className="text-text-muted text-xs sm:text-sm">No hidden fees. What you see is what you pay.</p>
              </div>

              {/* Network Tabs */}
              <div className="flex items-center gap-1 mb-6 bg-background/50 border border-white/[0.06] rounded-xl p-1.5">
                {networkData.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => { setActiveNetwork(network.id); setExpandedCard(null); }}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 justify-center ${
                      activeNetwork === network.id
                        ? `bg-gradient-to-r ${network.bgClass} text-white shadow-lg`
                        : 'text-text-muted hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <NetworkIcon network={network.id} size={20} />
                    <span className="hidden sm:inline">{network.label}</span>
                  </button>
                ))}
              </div>

              {/* Bundle Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentNetwork.bundles.map((b) => {
                  const cardKey = `${activeNetwork}-${b.gb}`;
                  const isExpanded = expandedCard === cardKey;

                  return (
                    <div key={cardKey} className="flex flex-col">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
                        className={`bg-background/50 border rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 hover:shadow-md ${
                          isExpanded ? 'border-primary/40 ring-1 ring-primary/20' : 'border-white/[0.06] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white">{b.gb}</span>
                            <span className="text-sm font-bold text-text-muted">GB</span>
                          </div>
                          <NetworkIcon network={activeNetwork} size={36} />
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06]">
                          <div className="text-center">
                            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Price</p>
                            <p className="text-xs sm:text-sm font-bold text-white">GH₵{b.price}</p>
                          </div>
                          <div className="text-center border-x border-white/[0.06]">
                            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Rollover</p>
                            <p className={`text-xs sm:text-sm font-bold ${b.rollover === 'Yes' ? 'text-accent' : 'text-text-muted'}`}>{b.rollover}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Duration</p>
                            <p className="text-xs sm:text-sm font-bold text-accent">{b.duration}</p>
                          </div>
                        </div>

                        <div className={`flex items-center justify-center mt-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-4 h-4 text-text-muted" />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-card border border-t-0 border-primary/20 rounded-b-2xl -mt-2 pt-4 pb-4 px-4 sm:px-5">
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="tel"
                              placeholder="Enter phone number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full bg-background border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/40 transition-colors"
                            />
                          </div>
                          <Link href={`/quick-buy?network=${activeNetwork}&gb=${b.gb}&phone=${phoneNumber}`} className="block mt-3">
                            <button className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors active:scale-[0.98]">
                              Buy Now — GH₵{b.price}
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
          <div className="bg-card border border-white/[0.06] rounded-2xl overflow-hidden shadow-lg">
            <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6">How It Works</h2>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { num: '1', icon: Smartphone, title: 'Select bundle', desc: 'Choose your network and data package.' },
                  { num: '2', icon: CreditCard, title: 'Pay with MoMo', desc: 'Secure payment via Mobile Money or Paystack.' },
                  { num: '3', icon: Zap, title: 'Receive instantly', desc: 'Data delivered to the phone within seconds.' },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-background/50 border border-white/[0.06]">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-primary mb-1">STEP {step.num}</div>
                      <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                      <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
          <div className="bg-card border border-white/[0.06] rounded-2xl overflow-hidden shadow-lg">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500" />
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">What Our Customers Say</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: 'Kwame A.', location: 'Accra', text: 'Been using SwiftBundle for months now. The data comes through instantly and the prices are the best I\'ve found.', rating: 5 },
                  { name: 'Abena M.', location: 'Kumasi', text: 'Very reliable service. My customers are happy with the fast delivery and I make good profit as an agent.', rating: 5 },
                  { name: 'Yaw K.', location: 'Tamale', text: 'I buy data for my family every week. The MoMo payment is so convenient. No wahala at all.', rating: 5 },
                ].map((review) => (
                  <div key={review.name} className="p-4 rounded-xl bg-background/50 border border-white/[0.06]">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
                    <div>
                      <p className="text-sm font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-6 sm:p-10 text-center shadow-xl shadow-primary/20">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to get started?</h2>
            <p className="text-blue-100 mt-2 max-w-md mx-auto text-sm">
              Join thousands of Ghanaians who trust SwiftBundle for affordable, instant data bundles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link href="/quick-buy">
                <button className="px-6 py-3 bg-white text-primary font-bold text-sm rounded-xl shadow-lg hover:bg-gray-50 transition-all active:scale-[0.98]">
                  Buy Data Now <ArrowRight className="w-4 h-4 inline ml-1" />
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-6 py-3 bg-white/10 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all active:scale-[0.98]">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
