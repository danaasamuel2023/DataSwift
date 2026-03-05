'use client';
import { useState, useEffect } from 'react';
import { Users, ShoppingBag, Wallet, TrendingUp, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/constants';
import api from '@/lib/api';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/dashboard');
      setStats(res.data.data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'primary' },
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: 'success' },
    { label: 'Revenue', value: formatCurrency(stats?.totalRevenue || 0), icon: TrendingUp, color: 'accent' },
    { label: 'Deposits', value: formatCurrency(stats?.totalDeposits || 0), icon: Wallet, color: 'blue-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight">Admin Overview</h1>
        <p className="text-secondary/40 text-sm mt-1">Platform stats at a glance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${card.color}/10 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${card.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-secondary">{card.value}</p>
                  <p className="text-xs text-secondary/40">{card.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent activity */}
      {stats?.recentOrders?.length > 0 && (
        <Card>
          <h2 className="font-bold text-secondary mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-secondary/[0.04] last:border-0">
                <div>
                  <p className="font-semibold text-sm text-secondary">{order.phoneNumber}</p>
                  <p className="text-xs text-secondary/40">{order.network} &middot; {order.capacity}GB</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-secondary">{formatCurrency(order.price)}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    order.status === 'completed' ? 'bg-success/10 text-success' :
                    order.status === 'pending' ? 'bg-accent/10 text-accent' :
                    'bg-error/10 text-error'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
