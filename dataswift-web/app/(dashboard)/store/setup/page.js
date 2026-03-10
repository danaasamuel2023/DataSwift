'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Type, FileText, Phone, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/api';

const THEME_COLORS = [
  '#FF6B00', '#E60000', '#10B981', '#3B82F6',
  '#8B5CF6', '#EC4899', '#F59E0B', '#1A1A2E',
];

export default function StoreSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    storeName: '',
    description: '',
    contactPhone: '',
    primaryColor: '#FF6B00',
    momoNumber: '',
    momoNetwork: 'MTN',
    momoName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.storeName.trim()) {
      toast.error('Store name is required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/store/create', {
        storeName: form.storeName,
        description: form.description,
        contactPhone: form.contactPhone,
        theme: { primaryColor: form.primaryColor },
        momoDetails: {
          number: form.momoNumber,
          network: form.momoNetwork,
          name: form.momoName,
        },
      });
      toast.success('Store created!');
      router.push('/store/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Create your store</h1>
        <p className="text-text-muted text-sm mt-1">Set up your data selling business in minutes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <h2 className="font-bold text-white mb-4">Store Details</h2>
          <div className="space-y-4">
            <Input
              label="Store name"
              icon={Store}
              placeholder="e.g. Kofi's Data Hub"
              value={form.storeName}
              onChange={(e) => setForm(prev => ({ ...prev, storeName: e.target.value }))}
            />
            <Input
              label="Description (optional)"
              icon={FileText}
              placeholder="Short description of your store"
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
            />
            <Input
              label="Contact phone"
              icon={Phone}
              type="tel"
              placeholder="024 XXX XXXX"
              value={form.contactPhone}
              onChange={(e) => setForm(prev => ({ ...prev, contactPhone: e.target.value }))}
            />
          </div>
        </Card>

        <Card>
          <h2 className="font-bold text-white mb-4">Store Theme</h2>
          <p className="text-text-muted text-xs mb-3">Pick a primary color for your store page.</p>
          <div className="flex gap-3 flex-wrap">
            {THEME_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, primaryColor: color }))}
                className={`w-10 h-10 rounded-xl transition-all ${
                  form.primaryColor === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-bold text-white mb-4">MoMo Withdrawal Details</h2>
          <p className="text-text-muted text-xs mb-4">Where should we send your earnings?</p>
          <div className="space-y-4">
            <Input
              label="MoMo number"
              icon={Phone}
              type="tel"
              placeholder="024 XXX XXXX"
              value={form.momoNumber}
              onChange={(e) => setForm(prev => ({ ...prev, momoNumber: e.target.value }))}
            />
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Network</label>
              <div className="flex gap-2">
                {['MTN', 'Telecel', 'AirtelTigo'].map(net => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, momoNetwork: net }))}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      form.momoNetwork === net
                        ? 'bg-primary text-white'
                        : 'bg-surface-light text-text-muted hover:bg-white/5'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Account name"
              icon={Type}
              placeholder="Name on MoMo account"
              value={form.momoName}
              onChange={(e) => setForm(prev => ({ ...prev, momoName: e.target.value }))}
            />
          </div>
        </Card>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          <Store className="w-4 h-4" /> Create Store
        </Button>
      </form>
    </div>
  );
}
