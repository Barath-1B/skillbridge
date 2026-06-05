import { useEffect, useState } from 'react';
import { Card, Button, Spinner } from '../../components/common';
import { useToast } from '../../components/common/Toast';
import adminService from '../../services/admin/admin.service';
import CareerForm from '../../components/admin/CareerForm';

export default function AdminCareers() {
  const toast = useToast();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminService.getCareers();
      setCareers(data?.careers || []);
    } catch {
      toast.error('Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await adminService.getCareers();
        if (mounted) setCareers(data?.careers || []);
      } catch {
        if (mounted) toast.error('Failed to load careers');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const openCreate = () => {
    setEditing(null);
    setFormKey((k) => k + 1);
    setModalOpen(true);
  };

  const openEdit = (career) => {
    setEditing(career);
    setFormKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await adminService.updateCareer(editing._id, formData);
        toast.success('Career path updated');
      } else {
        await adminService.createCareer(formData);
        toast.success('Career path created');
      }
      setModalOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save career path');
    }
  };

  const handleDelete = async (career) => {
    if (!window.confirm(`Delete "${career.title}"? This also removes related user progress.`)) return;
    try {
      await adminService.deleteCareer(career._id);
      toast.success('Career path deleted');
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete career path');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Careers</h1>
        <Button onClick={openCreate}>Add New Career</Button>
      </div>

      <Card>
        <table className="w-full text-left">
          <thead className="border-b border-zinc-200 dark:border-white/10">
            <tr>
              <th className="pb-3">Title</th>
              <th className="pb-3">Domain</th>
              <th className="pb-3">Demand</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((c) => (
              <tr key={c._id} className="border-b border-zinc-100 dark:border-white/5">
                <td className="py-3">{c.title}</td>
                <td>{c.domain}</td>
                <td className="capitalize">{c.demand}</td>
                <td className="text-right whitespace-nowrap">
                  <Button size="sm" variant="secondary" className="w-auto mr-2" onClick={() => openEdit(c)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" className="w-auto" onClick={() => handleDelete(c)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {careers.length === 0 && (
          <p className="text-center text-zinc-500 py-8">No career paths yet. Add one to get started.</p>
        )}
      </Card>

      <CareerForm
        key={formKey}
        open={modalOpen}
        career={editing}
        onSave={handleSave}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
      />
    </div>
  );
}
