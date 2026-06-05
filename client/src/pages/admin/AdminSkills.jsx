import { useEffect, useState } from 'react';
import { Card, Button, Spinner } from '../../components/common';
import { useToast } from '../../components/common/Toast';
import { skillCategoryLabel } from '../../constants/skillCategories';
import adminService from '../../services/admin/admin.service';
import SkillForm from '../../components/admin/SkillForm';

export default function AdminSkills() {
  const toast = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminService.getSkills();
      setSkills(data?.skills || []);
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await adminService.getSkills();
        if (mounted) setSkills(data?.skills || []);
      } catch {
        if (mounted) toast.error('Failed to load skills');
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

  const openEdit = (skill) => {
    setEditing(skill);
    setFormKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await adminService.updateSkill(editing._id, formData);
        toast.success('Skill updated');
      } else {
        await adminService.createSkill(formData);
        toast.success('Skill created');
      }
      setModalOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save skill');
    }
  };

  const handleDelete = async (skill) => {
    if (!window.confirm(`Delete "${skill.name}"? This cannot be undone.`)) return;
    try {
      await adminService.deleteSkill(skill._id);
      toast.success('Skill deleted');
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete skill');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Skills</h1>
        <Button onClick={openCreate}>Add New Skill</Button>
      </div>

      <Card>
        <table className="w-full text-left">
          <thead className="border-b border-zinc-200 dark:border-white/10">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s._id} className="border-b border-zinc-100 dark:border-white/5">
                <td className="py-3">{s.name}</td>
                <td>{skillCategoryLabel(s.category)}</td>
                <td className="text-right whitespace-nowrap">
                  <Button size="sm" variant="secondary" className="w-auto mr-2" onClick={() => openEdit(s)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" className="w-auto" onClick={() => handleDelete(s)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {skills.length === 0 && (
          <p className="text-center text-zinc-500 py-8">No skills yet. Add one to get started.</p>
        )}
      </Card>

      <SkillForm
        key={formKey}
        open={modalOpen}
        skill={editing}
        onSave={handleSave}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
      />
    </div>
  );
}
