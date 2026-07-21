import { useEffect, useMemo, useState } from 'react';
import { Users, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Card, Button, Spinner, Badge, ProgressBar } from '../../components/common';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { EXPERIENCE_LABELS } from '../../constants/experience';
import adminService from '../../services/admin/admin.service';

const selectClass = [
  'rounded-lg px-2.5 py-1.5 text-sm outline-none transition',
  'bg-white border border-zinc-200 text-zinc-900',
  'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
  'dark:bg-white/5 dark:border-white/10 dark:text-zinc-100',
].join(' ');

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');

function StatCard({ icon, label, value }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/15 dark:text-teal-300">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">{value}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export default function AdminUsers() {
  const toast = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data?.users || []);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await adminService.getUsers();
        if (mounted) setUsers(data?.users || []);
      } catch {
        if (mounted) toast.error('Failed to load users');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const onboarded = users.filter((u) => u.progress?.profileComplete).length;
    const oceanDone = users.filter((u) => u.progress?.oceanCompleted).length;
    return { total, onboarded, oceanDone };
  }, [users]);

  const handleRoleChange = async (user, role) => {
    if (role === user.role) return;
    setBusyId(user._id);
    try {
      await adminService.updateUserRole(user._id, role);
      toast.success(`${user.name} is now ${role}`);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update role');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name} (${user.email})? This cannot be undone.`)) return;
    setBusyId(user._id);
    try {
      await adminService.deleteUser(user._id);
      toast.success('User deleted');
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete user');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Members</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<Users className="w-5 h-5" />} label="Total members" value={stats.total} />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Completed onboarding" value={stats.onboarded} />
        <StatCard icon={<BrainCircuit className="w-5 h-5" />} label="Took the OCEAN test" value={stats.oceanDone} />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="pb-3 pr-4">Member</th>
                <th className="pb-3 pr-4">Experience</th>
                <th className="pb-3 pr-4">Profile</th>
                <th className="pb-3 pr-4">OCEAN</th>
                <th className="pb-3 pr-4 text-center">Skills</th>
                <th className="pb-3 pr-4 text-center">Certs</th>
                <th className="pb-3 pr-4 text-center">Saved</th>
                <th className="pb-3 pr-4">Roadmap progress</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = currentUser && (currentUser._id === u._id || currentUser.id === u._id);
                const p = u.progress || {};
                return (
                  <tr key={u._id} className="border-b border-zinc-100 dark:border-white/5 align-middle">
                    <td className="py-3 pr-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {u.name}
                        {isSelf && <span className="ml-2 text-xs text-teal-600">(you)</span>}
                      </div>
                      <div className="text-xs text-zinc-500">{u.email}</div>
                    </td>
                    <td className="pr-4 text-zinc-600 dark:text-zinc-300">
                      {EXPERIENCE_LABELS[u.experience] || '—'}
                    </td>
                    <td className="pr-4">
                      {p.profileComplete ? (
                        <Badge variant="success">Complete</Badge>
                      ) : (
                        <Badge variant="neutral">Incomplete</Badge>
                      )}
                    </td>
                    <td className="pr-4 text-zinc-600 dark:text-zinc-300">
                      {p.oceanCompleted ? fmtDate(u.lastOceanTestDate) : '—'}
                    </td>
                    <td className="pr-4 text-center tabular-nums">{p.skillsCount ?? 0}</td>
                    <td className="pr-4 text-center tabular-nums">{p.certificationsCount ?? 0}</td>
                    <td className="pr-4 text-center tabular-nums">{p.savedCareers ?? 0}</td>
                    <td className="pr-4 w-40">
                      {p.savedCareers > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-24">
                            <ProgressBar progress={p.avgProgress || 0} size="sm" showLabel={false} />
                          </div>
                          <span className="text-xs tabular-nums text-zinc-500">{p.avgProgress || 0}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-400">No saved careers</span>
                      )}
                    </td>
                    <td className="pr-4">
                      <select
                        className={selectClass}
                        value={u.role}
                        disabled={isSelf || busyId === u._id}
                        onChange={(e) => handleRoleChange(u, e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <Button
                        size="sm"
                        variant="danger"
                        className="w-auto"
                        disabled={isSelf || busyId === u._id}
                        onClick={() => handleDelete(u)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <p className="text-center text-zinc-500 py-8">No members found.</p>
        )}
      </Card>
    </div>
  );
}
