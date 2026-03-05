'use client';
import { useState, useEffect } from 'react';
import { Users, Search, Loader2, Mail, Phone } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { formatCurrency, formatDate } from '@/lib/constants';
import api from '@/lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.phoneNumber?.includes(q);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight">Users</h1>
        <p className="text-secondary/40 text-sm mt-1">{users.length} registered users</p>
      </div>

      <Input
        icon={Search}
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary/[0.06]">
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Phone</th>
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Balance</th>
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u._id} className="border-b border-secondary/[0.04] last:border-0 hover:bg-secondary/[0.02]">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-sm text-secondary">{u.name}</p>
                      <p className="text-xs text-secondary/40">{u.email}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-secondary/60">{u.phoneNumber || '—'}</td>
                    <td className="px-5 py-3 text-sm font-bold text-secondary">{formatCurrency(u.walletBalance || 0)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary/[0.06] text-secondary/50'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-secondary/40">{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
