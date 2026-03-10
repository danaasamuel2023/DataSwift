'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, Phone, Mail, Loader2, Check, AlertCircle, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import NetworkIcon from '@/components/shared/NetworkIcon';
import { formatCurrency } from '@/lib/constants';
import api from '@/lib/api';

const NETWORKS = [
  { id: 'YELLO', label: 'MTN', color: '#FFCC00' },
  { id: 'TELECEL', label: 'Telecel', color: '#E60000' },
  { id: 'AT_PREMIUM', label: 'AirtelTigo', color: '#0066CC' },
];

export default function GuestBuyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    }>
      <GuestBuyContent />
    </Suspense>
  );
}

function GuestBuyContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment');
  const paymentRef = searchParams.get('reference') || searchParams.get('trxref');

  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [buying, setBuying] = useState(false);

  // Payment callback state
  const [verifying, setVerifying] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    if (paymentStatus === 'callback' && paymentRef) {
      checkGuestOrder(paymentRef);
    }
  }, [paymentStatus, paymentRef]);

  useEffect(() => {
    if (selectedNetwork) {
      fetchPackages(selectedNetwork);
    }
  }, [selectedNetwork]);

  const fetchPackages = async (network) => {
    setLoadingPackages(true);
    setPackages([]);
    try {
      const res = await api.get(`/purchase/guest-packages?network=${network}`);
      setPackages(res.data.data || []);
    } catch {
      toast.error('Failed to load packages');
    } finally {
      setLoadingPackages(false);
    }
  };

  const checkGuestOrder = async (ref) => {
    setVerifying(true);
    // Give webhook a moment to process
    await new Promise(r => setTimeout(r, 3000));
    try {
      const res = await api.get(`/purchase/guest-status/${ref}`);
      setOrderStatus(res.data.data);
    } catch {
      setOrderStatus({ status: 'pending' });
    } finally {
      setVerifying(false);
    }
  };

  const handleBuy = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Enter a phone number');
      return;
    }
    if (!email.trim()) {
      toast.error('Enter your email for payment receipt');
      return;
    }
    if (!selectedBundle) return;

    setBuying(true);
    try {
      const res = await api.post('/purchase/guest-buy', {
        network: selectedNetwork,
        capacity: selectedBundle.capacity,
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
      });
      const { authorization_url } = res.data.data;
      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        toast.error('Failed to initialize payment');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally {
      setBuying(false);
    }
  };

  // Payment callback view
  if (paymentStatus === 'callback') {
    if (verifying) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white">Processing your order...</h1>
            <p className="text-text-muted text-sm mt-2">Please wait while we confirm your payment.</p>
          </div>
        </div>
      );
    }

    const status = orderStatus?.status;
    const isSuccess = status === 'completed' || status === 'processing' || status === 'pending';

    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className={`w-16 h-16 ${isSuccess ? 'bg-success/10' : 'bg-error/10'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            {isSuccess ? <Check className="w-8 h-8 text-success" /> : <AlertCircle className="w-8 h-8 text-error" />}
          </div>
          <h1 className="text-xl font-bold text-white">
            {isSuccess ? 'Payment Received!' : 'Something went wrong'}
          </h1>
          <p className="text-text-muted text-sm mt-2 mb-2">
            {isSuccess
              ? `Your ${orderStatus?.capacity}GB ${NETWORKS.find(n => n.id === orderStatus?.network)?.label || ''} data is being delivered to ${orderStatus?.phoneNumber}.`
              : 'We could not process your order. If you were charged, please contact support.'}
          </p>
          {isSuccess && status !== 'completed' && (
            <p className="text-xs text-text-muted/60 mb-6">Data is usually delivered within 2 minutes.</p>
          )}
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/quick-buy">
              <button className="px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
                Buy more data
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-6 py-3 border border-white/10 text-text font-bold text-sm rounded-xl hover:border-white/20 transition-colors">
                Create account
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main buy flow
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full mb-4">
          <Zap className="w-3.5 h-3.5" />
          No account needed
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Buy Data Instantly
        </h1>
        <p className="text-text-muted mt-2">
          Pick a bundle, enter a number, pay with MoMo. Done in seconds.
        </p>
      </div>

      {/* Step 1: Network */}
      <div>
        <h2 className="font-bold text-sm text-text-muted mb-3">1. Select network</h2>
        <div className="grid grid-cols-3 gap-3">
          {NETWORKS.map(net => (
            <button
              key={net.id}
              onClick={() => { setSelectedNetwork(net.id); setSelectedBundle(null); }}
              className={`p-4 rounded-2xl border transition-all text-center ${
                selectedNetwork === net.id
                  ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                  : 'border-white/[0.04] hover:border-white/10 bg-card'
              }`}
            >
              <div className="flex justify-center mb-2">
                <NetworkIcon network={net.id} size={40} />
              </div>
              <p className={`font-bold text-sm ${selectedNetwork === net.id ? 'text-primary' : 'text-white'}`}>
                {net.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Bundle */}
      {selectedNetwork && (
        <div>
          <h2 className="font-bold text-sm text-text-muted mb-3">2. Choose a bundle</h2>
          {loadingPackages ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : packages.length === 0 ? (
            <div className="bg-card rounded-2xl border border-white/[0.04] p-6 text-center">
              <AlertCircle className="w-8 h-8 text-text-muted/30 mx-auto mb-2" />
              <p className="text-text-muted text-sm">No packages available for this network right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {packages.map((pkg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBundle(pkg)}
                  className={`p-4 rounded-2xl border transition-all text-left ${
                    selectedBundle?.capacity === pkg.capacity
                      ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                      : 'border-white/[0.04] hover:border-white/10 bg-card'
                  }`}
                >
                  <p className="text-lg font-extrabold text-white">{pkg.capacity}GB</p>
                  <p className="text-primary font-bold text-sm mt-1">{formatCurrency(pkg.price)}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Details & Pay */}
      {selectedBundle && (
        <div>
          <h2 className="font-bold text-sm text-text-muted mb-3">3. Enter details & pay</h2>
          <div className="glass-card rounded-2xl p-6 space-y-4">
            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Recipient phone number</label>
              <div className="flex items-center gap-2 border rounded-xl px-4 py-3 border-white/10 bg-surface-light focus-within:border-primary transition-colors">
                <Phone className="w-4 h-4 text-text-muted/50" />
                <input
                  type="tel"
                  placeholder="024 XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 outline-none text-sm font-medium bg-transparent text-text placeholder:text-text-muted/40"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Your email (for payment receipt)</label>
              <div className="flex items-center gap-2 border rounded-xl px-4 py-3 border-white/10 bg-surface-light focus-within:border-primary transition-colors">
                <Mail className="w-4 h-4 text-text-muted/50" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 outline-none text-sm font-medium bg-transparent text-text placeholder:text-text-muted/40"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface-light rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Network</span>
                <span className="font-semibold text-white">
                  {NETWORKS.find(n => n.id === selectedNetwork)?.label}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Bundle</span>
                <span className="font-semibold text-white">{selectedBundle.capacity}GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Payment</span>
                <span className="font-semibold text-white">Mobile Money</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/[0.04] pt-2 mt-2">
                <span className="text-text-muted">Total</span>
                <span className="font-extrabold text-primary">{formatCurrency(selectedBundle.price)}</span>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={buying}
              className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-primary hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-primary/25"
            >
              {buying ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Pay {formatCurrency(selectedBundle.price)} with MoMo
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Sign up nudge */}
      <div className="text-center text-sm text-text-muted pb-8">
        Want wallet payments, order history & referral rewards?{' '}
        <Link href="/sign-up" className="text-primary font-bold hover:underline">Create a free account</Link>
      </div>
    </div>
  );
}
