import { useFetch } from '../../hooks/useFetch';
import { Card, Spinner } from '../../components/common';

export default function AdminUsers() {
  const { data: users, loading } = useFetch('/api/admin/users');

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">User Management</h1>

      <Card>
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
