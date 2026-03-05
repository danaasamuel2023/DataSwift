'use client';
import { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NetworkIcon from '@/components/shared/NetworkIcon';
import { formatCurrency } from '@/lib/constants';
import api from '@/lib/api';

const NETWORKS = [
  { id: 'YELLO', label: 'MTN' },
  { id: 'TELECEL', label: 'Telecel' },
  { id: 'AT_PREMIUM', label: 'AirtelTigo' },
];

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState({ basePrices: {}, sellingPrices: {} });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('YELLO');

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const res = await api.get('/admin/pricing');
      setPricing(res.data.data || { basePrices: {}, sellingPrices: {} });
    } catch {
      toast.error('Failed to load pricing');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await api.post('/admin/pricing/sync');
      toast.success('Prices synced from DataMart');
      fetchPricing();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const handlePriceChange = (network, capacity, value) => {
    setPricing(prev => ({
      ...prev,
      sellingPrices: {
        ...prev.sellingPrices,
        [network]: {
          ...prev.sellingPrices[network],
          [capacity]: parseFloat(value) || 0,
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/admin/pricing', { sellingPrices: pricing.sellingPrices });
      toast.success('Pricing saved!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const basePrices = pricing.basePrices[selectedNetwork] || {};
  const sellingPrices = pricing.sellingPrices[selectedNetwork] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight">Pricing</h1>
          <p className="text-secondary/40 text-sm mt-1">Set selling prices for data bundles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" loading={syncing} onClick={handleSync}>
            <RefreshCw className="w-4 h-4" /> Sync from DataMart
          </Button>
          <Button size="sm" loading={saving} onClick={handleSave}>
            <Save className="w-4 h-4" /> Save
          </Button>
        </div>
      </div>

      {/* Network tabs */}
      <div className="flex gap-2">
        {NETWORKS.map(net => (
          <button
            key={net.id}
            onClick={() => setSelectedNetwork(net.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              selectedNetwork === net.id
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-secondary/[0.04] text-secondary/50 hover:bg-secondary/[0.08]'
            }`}
          >
            <NetworkIcon network={net.id} size={20} />
            {net.label}
          </button>
        ))}
      </div>

      {/* Pricing table */}
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary/[0.06]">
                <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Bundle</th>
                <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Cost (DataMart)</th>
                <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Selling Price</th>
                <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Margin</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(basePrices).map(([capacity, cost]) => {
                const selling = sellingPrices[capacity] || 0;
                const margin = selling - cost;
                return (
                  <tr key={capacity} className="border-b border-secondary/[0.04] last:border-0">
                    <td className="px-5 py-3 font-bold text-sm text-secondary">{capacity}GB</td>
                    <td className="px-5 py-3 text-sm text-secondary/60">{formatCurrency(cost)}</td>
                    <td className="px-5 py-3">
                      <input
                        type="number"
                        step="0.01"
                        value={selling || ''}
                        onChange={(e) => handlePriceChange(selectedNetwork, capacity, e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-secondary/10 text-sm font-semibold text-secondary focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                      />
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-sm font-bold ${margin > 0 ? 'text-success' : margin < 0 ? 'text-error' : 'text-secondary/30'}`}>
                        {margin > 0 ? '+' : ''}{formatCurrency(margin)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {Object.keys(basePrices).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-secondary/40 text-sm">
                    No prices found. Click &quot;Sync from DataMart&quot; to fetch base prices.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
