'use client';
import { useState, useEffect, use } from 'react';
import { ShoppingBag, Phone, Loader2, Check, Zap, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import NetworkIcon from '@/components/shared/NetworkIcon';
import { formatCurrency } from '@/lib/constants';
import api from '@/lib/api';

const NETWORKS = [
  { id: 'YELLO', label: 'MTN' },
  { id: 'TELECEL', label: 'Telecel' },
  { id: 'AT_PREMIUM', label: 'AirtelTigo' },
];

export default function PublicStorePage({ params }) {
  const { storeSlug } = use(params);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStore();
  }, [storeSlug]);

  const fetchStore = async () => {
    try {
      const [storeRes, productsRes] = await Promise.all([
        api.get(`/shop/${storeSlug}`),
        api.get(`/shop/${storeSlug}/products`),
      ]);
      setStore(storeRes.data.data);
      setProducts(productsRes.data.data || []);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Store not found' : 'Failed to load store');
    } finally {
      setLoading(false);
    }
  };

  const networkProducts = selectedNetwork
    ? products.filter(p => p.network === selectedNetwork)
    : [];

  const handleBuy = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Enter a phone number');
      return;
    }
    if (!selectedBundle) return;

    setBuying(true);
    try {
      const res = await api.post(`/shop/${storeSlug}/buy`, {
        network: selectedNetwork,
        capacity: selectedBundle.capacity,
        phoneNumber: phoneNumber.trim(),
      });
      const { authorization_url } = res.data.data;
      window.location.href = authorization_url;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAF8' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: store?.theme?.primaryColor || '#FF6B00' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-800">{error}</h1>
          <p className="text-gray-400 text-sm mt-2">This store may no longer be available.</p>
        </div>
      </div>
    );
  }

  const primaryColor = store?.theme?.primaryColor || '#FF6B00';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-extrabold text-lg" style={{ color: '#1A1A2E' }}>
              {store?.storeName}
            </span>
          </div>
          <span className="text-xs font-medium" style={{ color: 'rgba(26,26,46,0.4)' }}>
            Powered by SwiftBundle
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {store?.description && (
          <p className="text-center" style={{ color: 'rgba(26,26,46,0.5)' }}>{store.description}</p>
        )}

        {/* Network selection */}
        <div>
          <h2 className="font-bold text-sm mb-3" style={{ color: 'rgba(26,26,46,0.5)' }}>Select Network</h2>
          <div className="grid grid-cols-3 gap-3">
            {NETWORKS.map(net => {
              const hasProducts = products.some(p => p.network === net.id);
              if (!hasProducts) return null;
              return (
                <button
                  key={net.id}
                  onClick={() => { setSelectedNetwork(net.id); setSelectedBundle(null); }}
                  className="p-4 rounded-2xl border-2 transition-all text-center"
                  style={{
                    borderColor: selectedNetwork === net.id ? primaryColor : 'rgba(0,0,0,0.06)',
                    backgroundColor: selectedNetwork === net.id ? `${primaryColor}08` : 'white',
                  }}
                >
                  <div className="flex justify-center mb-2">
                    <NetworkIcon network={net.id} size={36} />
                  </div>
                  <p className="font-bold text-sm" style={{ color: selectedNetwork === net.id ? primaryColor : '#1A1A2E' }}>
                    {net.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bundles */}
        {selectedNetwork && networkProducts.length > 0 && (
          <div>
            <h2 className="font-bold text-sm mb-3" style={{ color: 'rgba(26,26,46,0.5)' }}>Choose Bundle</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {networkProducts.map((pkg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBundle(pkg)}
                  className="p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    borderColor: selectedBundle?.capacity === pkg.capacity ? primaryColor : 'rgba(0,0,0,0.06)',
                    backgroundColor: selectedBundle?.capacity === pkg.capacity ? `${primaryColor}08` : 'white',
                  }}
                >
                  <p className="text-lg font-extrabold" style={{ color: '#1A1A2E' }}>{pkg.capacity}GB</p>
                  <p className="font-bold text-sm mt-1" style={{ color: primaryColor }}>
                    {formatCurrency(pkg.sellingPrice)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Checkout */}
        {selectedBundle && (
          <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <h2 className="font-bold" style={{ color: '#1A1A2E' }}>Complete Purchase</h2>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(26,26,46,0.5)' }}>
                Recipient phone number
              </label>
              <div className="flex items-center gap-2 border rounded-xl px-4 py-3" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <Phone className="w-4 h-4" style={{ color: 'rgba(26,26,46,0.3)' }} />
                <input
                  type="tel"
                  placeholder="024 XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 outline-none text-sm font-medium bg-transparent"
                  style={{ color: '#1A1A2E' }}
                />
              </div>
            </div>

            <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: '#FAFAF8' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'rgba(26,26,46,0.4)' }}>Bundle</span>
                <span className="font-semibold" style={{ color: '#1A1A2E' }}>
                  {selectedBundle.capacity}GB {NETWORKS.find(n => n.id === selectedNetwork)?.label}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'rgba(26,26,46,0.4)' }}>Price</span>
                <span className="font-extrabold" style={{ color: primaryColor }}>
                  {formatCurrency(selectedBundle.sellingPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={buying}
              className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: primaryColor }}
            >
              {buying ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Pay {formatCurrency(selectedBundle.sellingPrice)}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-xs" style={{ color: 'rgba(26,26,46,0.3)' }}>
          Powered by <span className="font-bold">SwiftBundle</span>
        </p>
      </div>
    </div>
  );
}
