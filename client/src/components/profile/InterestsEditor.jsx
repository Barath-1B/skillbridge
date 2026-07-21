import { useState } from 'react';
import { Plus, X, Heart } from 'lucide-react';
import { Input, Button } from '../common';
import { useToast } from '../common/Toast';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../services/profile/profile.service';

// Inline editor for the user's interests. Persists the full list through the
// existing PUT /profile endpoint and keeps AuthContext in sync.
export default function InterestsEditor() {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const interests = Array.isArray(user?.interests) ? user.interests : [];

  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);

  const persist = async (next) => {
    setSaving(true);
    try {
      const updated = await profileService.updateProfile({ interests: next });
      updateUser({ interests: updated?.interests ?? next });
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update interests');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    if (interests.some((i) => i.toLowerCase() === name.toLowerCase())) {
      toast.error('That interest is already listed');
      return;
    }
    const ok = await persist([...interests, name]);
    if (ok) {
      setValue('');
      toast.success('Interest added');
    }
  };

  const handleRemove = async (name) => {
    const ok = await persist(interests.filter((i) => i !== name));
    if (ok) toast.success('Interest removed');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex items-start gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g., Machine Learning"
          aria-label="Interest"
          className="flex-1"
        />
        <Button type="submit" loading={saving} disabled={!value.trim()} leftIcon={<Plus className="w-4 h-4" />}>
          Add
        </Button>
      </form>

      {interests.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-sm text-teal-800 dark:text-teal-200"
            >
              <Heart className="w-3.5 h-3.5" />
              {i}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                disabled={saving}
                aria-label={`Remove ${i}`}
                className="p-0.5 rounded-full text-teal-700/70 dark:text-teal-300/70 hover:text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">No interests added yet. Add what excites you above.</p>
      )}
    </div>
  );
}
