'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Phone, ChevronRight, Check, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NetworkIcon from '@/components/shared/NetworkIcon';
import { useAuth } from '@/context/AuthContext';
import { NETWORKS, formatCurrency } from '@/lib/constants';
import api from '@/lib/api';

const NETWORK_LIST = [
  { id: 'YELLO', label: 'MTN', color: '#FFCC00' },
  { id: 'TELECEL', label: 'Telecel', color: '#E60000' },
  { id: 'AT_PREMIUM', label: 'AirtelTigo', color: '#0066CC' },
];

export default function BuyDataPage() {
  const { user, refreshUser } = useAuth();
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buying, setBuying] = useState(false);
  const [step, setStep] = useState('network'); // network | bundle | confirm | done

  useEffect(() => {
    if (selectedNetwork) {
      fetchPackages(selectedNetwork);
    }
  }, [selectedNetwork]);

  const fetchPackages = async (network) => {
    setLoadingPackages(true);
    setPackages([]);
    try {
      const res = await api.get(`/purchase/packages?network=${network}`);
      setPackages(res.data.data || []);
    } catch {
      toast.error('Failed to load packages');
    } finally {
      setLoadingPackages(false);
    }
  };

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
    setSelectedBundle(null);
    setStep('bundle');
  };

  const handleSelectBundle = (bundle) => {
    setSelectedBundle(bundle);
    setStep('confirm');
  };

  const handleBuy = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Enter a phone number');
      return;
    }
    if (selectedBundle.price > (user?.walletBalance || 0)) {
      toast.error('Insufficient balance. Please top up your wallet.');
      return;
    }

    setBuying(true);
    try {
      await api.post('/purchase/buy', {
        network: selectedNetwork,
        capacity: selectedBundle.capacity,
        phoneNumber: phoneNumber.trim(),
      });
      toast.success('Data purchase successful!');
      refreshUser();
      setStep('done');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally {
      setBuying(false);
    }
  };

  const reset = () => {
    setSelectedNetwork(null);
    setSelectedBundle(null);
    setPhoneNumber('');
    setStep('network');
  };

  if (step === 'done') {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-xl font-extrabold text-secondary">Purchase Successful!</h2>
        <p className="text-secondary/40 text-sm mt-2 mb-6">
          {selectedBundle?.capacity}GB {NETWORK_LIST.find(n => n.id === selectedNetwork)?.label} data sent to {phoneNumber}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Buy more</Button>
          <Button variant="outline" onClick={() => window.location.href = '/transactions'}>View history</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight">Buy Data</h1>
        <p className="text-secondary/40 text-sm mt-1">Choose a network and bundle to get started.</p>
      </div>

      {/* Balance reminder */}
      <Card className="bg-secondary !text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs">Your balance</p>
            <p className="text-xl font-extrabold">{formatCurrency(user?.walletBalance || 0)}</p>
          </div>
          <Button variant="accent" size="sm" onClick={() => window.location.href = '/wallet'}>Top up</Button>
        </div>
      </Card>

      {/* Step 1: Network selection */}
      <div>
        <h2 className="font-bold text-sm text-secondary/60 mb-3">
          {step === 'network' ? '1. Select network' : 'Network'}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {NETWORK_LIST.map(net => (
            <button
              key={net.id}
              onClick={() => handleSelectNetwork(net.id)}
              className={`p-4 rounded-2xl border-2 transition-all text-center ${
                selectedNetwork === net.id
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-secondary/[0.06] hover:border-secondary/20'
              }`}
            >
              <div className="flex justify-center mb-2">
                <NetworkIcon network={net.id} size={40} />
              </div>
              <p className={`font-bold text-sm ${selectedNetwork === net.id ? 'text-primary' : 'text-secondary'}`}>
                {net.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Bundle selection */}
      {step !== 'network' && (
        <div>
          <h2 className="font-bold text-sm text-secondary/60 mb-3">2. Choose a bundle</h2>
          {loadingPackages ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : packages.length === 0 ? (
            <Card>
              <div className="text-center py-4">
                <AlertCircle className="w-8 h-8 text-secondary/20 mx-auto mb-2" />
                <p className="text-secondary/40 text-sm">No packages available for this network right now.</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {packages.map((pkg, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectBundle(pkg)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedBundle?.capacity === pkg.capacity
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                      : 'border-secondary/[0.06] hover:border-secondary/20'
                  }`}
                >
                  <p className="text-lg font-extrabold text-secondary">{pkg.capacity}GB</p>
                  <p className="text-primary font-bold text-sm mt-1">{formatCurrency(pkg.price)}</p>
                  {pkg.validity && (
                    <p className="text-xs text-secondary/40 mt-1">{pkg.validity}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 'confirm' && selectedBundle && (
        <div>
          <h2 className="font-bold text-sm text-secondary/60 mb-3">3. Enter recipient number</h2>
          <Card>
            <div className="space-y-4">
              <Input
                label="Phone number"
                type="tel"
                icon={Phone}
                placeholder="024 XXX XXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <div className="bg-background rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary/40">Network</span>
                  <span className="font-semibold text-secondary">
                    {NETWORK_LIST.find(n => n.id === selectedNetwork)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary/40">Bundle</span>
                  <span className="font-semibold text-secondary">{selectedBundle.capacity}GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary/40">Price</span>
                  <span className="font-extrabold text-primary">{formatCurrency(selectedBundle.price)}</span>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                loading={buying}
                onClick={handleBuy}
              >
                <ShoppingBag className="w-4 h-4" />
                Confirm Purchase
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
