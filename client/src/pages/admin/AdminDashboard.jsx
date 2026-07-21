import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Card, Spinner } from '../../components/common';

const QUICK_LINKS = [
  { to: '/admin/careers', title: 'Manage Careers', description: 'Create, edit, delete career paths' },
  { to: '/admin/skills', title: 'Manage Skills', description: 'Manage skill database' },
  { to: '/admin/users', title: 'User Management', description: 'View and manage users' },
];

export default function AdminDashboard() {
  const { data: stats, loading } = useFetch('/admin/analytics');

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Total Users">
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats?.totalUsers || 0}</p>
        </Card>
        <Card title="Total Careers">
          <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{stats?.totalCareerPaths || 0}</p>
        </Card>
        <Card title="Total Skills">
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">{stats?.totalSkills || 0}</p>
        </Card>
      </div>

      <Card title="Quick Links">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ to, title, description }) => (
            <Link
              key={to}
              to={to}
              className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
            >
              <h3 className="font-bold mb-2 text-zinc-900 dark:text-zinc-50">{title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
