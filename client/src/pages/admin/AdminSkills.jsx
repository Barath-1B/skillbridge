import { useFetch } from '../../hooks/useFetch';
import { Card, Button, Spinner } from '../../components/common';

export default function AdminSkills() {
  const { data: skills, loading } = useFetch('/api/admin/skills');

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Skills</h1>
        <Button>Add New Skill</Button>
      </div>

      <Card>
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills?.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-50">
                <td className="py-3">{s.name}</td>
                <td>{s.category}</td>
                <td>
                  <Button size="sm" variant="secondary" className="w-auto mr-2">Edit</Button>
                  <Button size="sm" variant="danger" className="w-auto">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
