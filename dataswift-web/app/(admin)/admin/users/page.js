'use client';
import { useState, useEffect } from 'react';
import { Search, Loader2, ShieldCheck, ShieldOff, UserCheck, UserX } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { formatCurrency, formatDate } from '@/lib/constants';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState(null);

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

  const updateUser = async (id, updates, confirmMsg) => {
    if (confirmMsg && !confirm(confirmMsg)) return;
    setUpdating(id);
    try {
      const res = await api.put(`/admin/users/${id}`, updates);
      setUsers(prev => prev.map(u => u._id === id ? res.data.data : u));
      toast.success('User updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setUpdating(null);
    }
  };

  const toggleRole = (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const msg = newRole === 'admin'
      ? `Make ${user.name} an admin?`
      : `Remove admin from ${user.name}?`;
    updateUser(user._id, { role: newRole }, msg);
  };

  const toggleActive = (user) => {
    const msg = user.isActive
      ? `Deactivate ${user.name}? They won't be able to log in.`
      : `Reactivate ${user.name}?`;
    updateUser(user._id, { isActive: !user.isActive }, msg);
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
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-secondary/40 px-5 py-3">Joined</th>
                  <th className="text-right text-xs font-semibold text-secondary/40 px-5 py-3">Actions</th>
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
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        u.isActive !== false ? 'bg-success/10 text-success' : 'bg-red-50 text-red-500'
                      }`}>
                        {u.isActive !== false ? 'active' : 'disabled'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-secondary/40">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleRole(u)}
                          disabled={updating === u._id}
                          title={u.role === 'admin' ? 'Remove admin' : 'Make admin'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            u.role === 'admin'
                              ? 'text-primary hover:bg-primary/10'
                              : 'text-secondary/30 hover:bg-secondary/[0.06] hover:text-secondary/60'
                          }`}
                        >
                          {u.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => toggleActive(u)}
                          disabled={updating === u._id}
                          title={u.isActive !== false ? 'Deactivate' : 'Activate'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            u.isActive !== false
                              ? 'text-success hover:bg-success/10'
                              : 'text-red-400 hover:bg-red-50'
                          }`}
                        >
                          {u.isActive !== false ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
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
