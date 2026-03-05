'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap, Shield, Clock, Smartphone, Store, Users,
  ArrowRight, CheckCircle2, Wifi, TrendingUp, Gift, ChevronRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import NetworkIcon from '@/components/shared/NetworkIcon';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              Fastest data delivery in Ghana
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
            >
              Buy data bundles
              <br />
              <span className="relative">
                <span className="text-primary">in seconds,</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 2 250 2 298 8" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>
              {' '}not minutes.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-secondary/50 mt-6 max-w-lg leading-relaxed"
            >
              MTN, Telecel & AirtelTigo data at the best prices.
              No wahala, no delays. Just fast, cheap data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Link href="/sign-up">
                <Button size="lg" className="group">
                  Start buying data
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="outline" size="lg">See how it works</Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-10"
            >
              <div className="flex -space-x-2">
                {['bg-primary', 'bg-accent', 'bg-secondary', 'bg-success'].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 ${bg} rounded-full border-2 border-white flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{['DA', 'KO', 'AM', 'EF'][i]}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-secondary">2,000+</span>
                <span className="text-secondary/40"> happy users</span>
              </div>
            </motion.div>
          </div>

          {/* Hero visual - floating network cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:block absolute right-8 top-20 w-[380px]"
          >
            {/* Phone mockup with bundle cards */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-secondary/10 p-6 border border-secondary/[0.06] rotate-2">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold text-secondary/40 uppercase tracking-wider">Quick Buy</span>
                <span className="text-xs font-bold text-success">Online</span>
              </div>
              {[
                { net: 'YELLO', gb: '5GB', price: '23.00', badge: 'Popular' },
                { net: 'TELECEL', gb: '10GB', price: '38.50', badge: null },
                { net: 'AT_PREMIUM', gb: '3GB', price: '14.00', badge: 'Best Value' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors mb-2">
                  <NetworkIcon network={item.net} size={36} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-secondary">{item.gb}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">{item.badge}</span>
                      )}
                    </div>
                    <span className="text-xs text-secondary/40">30 days</span>
                  </div>
                  <span className="font-bold text-sm text-secondary">GH₵{item.price}</span>
                </div>
              ))}
              <button className="w-full mt-3 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark transition-colors">
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== NETWORK STRIP ===== */}
      <section className="border-y border-secondary/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
            {['YELLO', 'TELECEL', 'AT_PREMIUM'].map(net => (
              <div key={net} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <NetworkIcon network={net} size={32} />
                <span className="text-sm font-semibold text-secondary/60">
                  {{ YELLO: 'MTN Ghana', TELECEL: 'Telecel', AT_PREMIUM: 'AirtelTigo' }[net]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Why DataSwift</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Everything you need to buy<br className="hidden sm:block" /> & sell data bundles
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Data delivered to any number within 2 minutes. No waiting, no manual processing.', color: 'bg-primary/10 text-primary' },
              { icon: Shield, title: 'Secure Payments', desc: 'Pay with Mobile Money or your wallet. Every transaction is encrypted and protected.', color: 'bg-blue-500/10 text-blue-500' },
              { icon: TrendingUp, title: 'Best Prices', desc: 'We negotiate bulk rates so you get the cheapest data prices in Ghana. Period.', color: 'bg-success/10 text-success' },
              { icon: Store, title: 'Agent Store', desc: 'Create your own data store, set your prices, share a link. Earn on every sale your customers make.', color: 'bg-accent/10 text-accent' },
              { icon: Gift, title: 'Referral Rewards', desc: 'Invite friends and earn cash commission on every purchase they make. Plus bonus data at milestones.', color: 'bg-purple-500/10 text-purple-500' },
              { icon: Smartphone, title: 'Works Everywhere', desc: 'Buy from your phone, tablet or computer. Our site works beautifully on any device.', color: 'bg-pink-500/10 text-pink-500' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl border border-secondary/[0.06] hover:border-primary/10 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{feature.title}</h3>
                <p className="text-secondary/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Simple as 1-2-3</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How it works
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up in 30 seconds with your name, email and phone number. Fund your wallet via MoMo.' },
              { step: '02', title: 'Choose your bundle', desc: 'Pick your network, select a data bundle, enter the recipient number. That\'s it.' },
              { step: '03', title: 'Get instant delivery', desc: 'Your data is delivered within 2 minutes. You\'ll get a confirmation immediately.' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary font-extrabold text-xl rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-secondary mb-2">{item.title}</h3>
                <p className="text-secondary/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRICING PREVIEW ===== */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Transparent Pricing</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Unbeatable data prices
            </motion.h2>
            <motion.p variants={fadeUp} className="text-secondary/50 mt-3 max-w-md mx-auto text-sm">
              No hidden fees. What you see is what you pay. Prices start from just GH₵4.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { net: 'YELLO', bundles: [{ gb: '2GB', price: '9.00' }, { gb: '5GB', price: '23.00' }, { gb: '10GB', price: '42.00' }, { gb: '25GB', price: '100.00' }] },
              { net: 'TELECEL', bundles: [{ gb: '10GB', price: '38.50' }, { gb: '15GB', price: '55.00' }, { gb: '25GB', price: '92.00' }, { gb: '50GB', price: '178.00' }] },
              { net: 'AT_PREMIUM', bundles: [{ gb: '2GB', price: '8.50' }, { gb: '5GB', price: '20.00' }, { gb: '10GB', price: '39.00' }, { gb: '25GB', price: '96.00' }] }
            ].map((network, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-secondary/[0.06] overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-5 border-b border-secondary/[0.06] flex items-center gap-3">
                  <NetworkIcon network={network.net} size={36} />
                  <span className="font-bold text-secondary">
                    {{ YELLO: 'MTN', TELECEL: 'Telecel', AT_PREMIUM: 'AirtelTigo' }[network.net]}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  {network.bundles.map((b, j) => (
                    <div key={j} className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-background transition-colors">
                      <span className="text-sm font-medium text-secondary/70">{b.gb}</span>
                      <span className="text-sm font-bold text-secondary">GH₵{b.price}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 pb-4">
                  <Link href="/sign-up" className="block">
                    <button className="w-full py-2.5 text-sm font-semibold text-primary border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all">
                      View all bundles
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== AGENT STORE CTA ===== */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-3">For hustlers & entrepreneurs</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Start your own data business today
            </h2>
            <p className="text-white/50 mt-4 text-lg leading-relaxed max-w-lg">
              Create a free agent store, set your own prices, and share your store link.
              Every time a customer buys from your store, you earn profit. It&apos;s that simple.
            </p>

            <div className="mt-8 space-y-3">
              {[
                'Free to create — no upfront cost',
                'Set your own prices and keep the profit',
                'Share your unique store link on WhatsApp, Instagram, etc.',
                'Withdraw earnings to your MoMo anytime'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="/sign-up">
                <Button size="lg">Create your store <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REFERRAL CTA ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 sm:p-12 border border-primary/10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gift className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Invite friends, earn rewards
            </h2>
            <p className="text-secondary/50 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              Share your referral code. When your friends sign up and buy data,
              you earn cash commission on every purchase plus bonus data at milestones.
            </p>
            <Link href="/sign-up">
              <Button size="lg">
                Get your referral code
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 bg-white border-t border-secondary/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Ready to get started?
          </h2>
          <p className="text-secondary/50 mb-6 text-sm">
            Join thousands of Ghanaians buying cheap data every day.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button size="lg">Create free account <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
