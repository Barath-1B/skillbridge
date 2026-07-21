import { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';
import { Input, Button } from '../common';
import { useToast } from '../common/Toast';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../services/profile/profile.service';

// Inline editor for the user's certifications. Persists the full list through
// the existing PUT /profile endpoint and keeps AuthContext in sync.
export default function CertificationsManager() {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const certs = Array.isArray(user?.certifications) ? user.certifications : [];

  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);

  const persist = async (next) => {
    setSaving(true);
    try {
      const updated = await profileService.updateProfile({ certifications: next });
      updateUser({ certifications: updated?.certifications ?? next });
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update certifications');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    if (certs.some((c) => c.toLowerCase() === name.toLowerCase())) {
      toast.error('That certification is already listed');
      return;
    }
    const ok = await persist([...certs, name]);
    if (ok) {
      setValue('');
      toast.success('Certification added');
    }
  };

  const handleRemove = async (name) => {
    const ok = await persist(certs.filter((c) => c !== name));
    if (ok) toast.success('Certification removed');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex items-start gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g., AWS Certified Developer"
          aria-label="Certification name"
          className="flex-1"
        />
        <Button type="submit" loading={saving} disabled={!value.trim()} leftIcon={<Plus className="w-4 h-4" />}>
          Add
        </Button>
      </form>

      {certs.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-2">
          {certs.map((c) => (
            <li
              key={c}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 text-sm text-zinc-700 dark:text-zinc-200"
            >
              <span className="flex items-center gap-2 min-w-0">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">{c}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemove(c)}
                disabled={saving}
                aria-label={`Remove ${c}`}
                className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No certifications listed yet. Add the credentials you've earned above.
        </p>
      )}
    </div>
  );
}
