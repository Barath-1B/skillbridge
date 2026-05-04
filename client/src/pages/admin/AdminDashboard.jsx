import { useFetch } from '../../hooks/useFetch';
import { Card, Spinner } from '../../components/common';

export default function AdminDashboard() {
  const { data: stats, loading } = useFetch('/api/admin/analytics');

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Users">
          <p className="text-4xl font-bold text-blue-600">{stats?.totalUsers || 0}</p>
        </Card>
        <Card title="Total Careers">
          <p className="text-4xl font-bold text-green-600">{stats?.totalCareers || 0}</p>
        </Card>
        <Card title="Total Skills">
          <p className="text-4xl font-bold text-purple-600">{stats?.totalSkills || 0}</p>
        </Card>
        <Card title="Avg Match Score">
          <p className="text-4xl font-bold text-orange-600">{stats?.avgMatchScore || 0}%</p>
        </Card>
      </div>

      <Card title="Quick Links" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/admin/careers" className="p-4 border rounded hover:bg-blue-50">
          <h3 className="font-bold mb-2">Manage Careers</h3>
          <p className="text-sm text-gray-600">Create, edit, delete career paths</p>
        </a>
        <a href="/admin/skills" className="p-4 border rounded hover:bg-blue-50">
          <h3 className="font-bold mb-2">Manage Skills</h3>
          <p className="text-sm text-gray-600">Manage skill database</p>
        </a>
        <a href="/admin/users" className="p-4 border rounded hover:bg-blue-50">
          <h3 className="font-bold mb-2">User Management</h3>
          <p className="text-sm text-gray-600">View and manage users</p>
        </a>
      </Card>
    </div>
  );
}
