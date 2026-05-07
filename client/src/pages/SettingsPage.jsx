import { useMemo, useState } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User as UserIcon,
  Lock,
  Sliders,
  TriangleAlert,
  Save,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../components/common/Toast';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import FormError from '../components/common/FormError';
import Switch from '../components/common/Switch';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import {
  updateAccount,
  updateSettings,
  changePassword,
  deleteAccount,
} from '../services/settings/settings.service';
import { THEMES } from '../constants/theme';
import { cx } from '../utils/cx';

const TABS = [
  { id: 'account', label: 'Account', icon: <UserIcon className="w-4 h-4" />, Component: AccountTab },
  { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" />, Component: SecurityTab },
  { id: 'preferences', label: 'Preferences', icon: <Sliders className="w-4 h-4" />, Component: PreferencesTab },
  { id: 'danger', label: 'Danger zone', icon: <TriangleAlert className="w-4 h-4" />, Component: DangerZoneTab },
];

const THEME_OPTIONS = [
  { id: THEMES.LIGHT, label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { id: THEMES.DARK, label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { id: THEMES.SYSTEM, label: 'System', icon: <Monitor className="w-4 h-4" /> },
];

function getErrorMessage(err, fallback) {
  return err?.response?.data?.message || fallback;
}

export default function SettingsPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTabId = useMemo(
    () => (TABS.some((t) => t.id === tab) ? tab : 'account'),
    [tab]
  );
  const ActiveTab = TABS.find((t) => t.id === activeTabId).Component;

  return (
    <PageContainer>
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account, security, and preferences.
        </p>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside>
          <nav
            className="flex lg:flex-col gap-1 p-1.5 rounded-2xl bg-zinc-100/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 overflow-x-auto lg:overflow-visible"
            aria-label="Settings sections"
          >
            {TABS.map((t) => (
              <NavLink
                key={t.id}
                to={`/settings/${t.id}`}
                className={({ isActive }) => {
                  const active = isActive || (!tab && t.id === 'account');
                  return cx(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition',
                    active
                      ? 'bg-white text-zinc-900 dark:bg-white/10 dark:text-zinc-50 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  );
                }}
              >
                {t.icon}
                {t.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActiveTab onDeleted={() => navigate('/')} />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </PageContainer>
  );
}

function SettingsSection({ title, description, children, className = '' }) {
  return (
    <Card padding="lg" className={className}>
      <header className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
        )}
      </header>
      {children}
    </Card>
  );
}

function AccountTab() {
  const { user, updateUser } = useAuth();
  return user ? <AccountForm key={user._id} user={user} updateUser={updateUser} /> : null;
}

function AccountForm({ user, updateUser }) {
  const toast = useToast();
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const dirty =
    name !== (user.name || '') ||
    email !== (user.email || '') ||
    avatarUrl !== (user.avatarUrl || '');

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const updated = await updateAccount({ name, email, avatarUrl });
      updateUser(updated);
      toast.success('Account updated');
    } catch (err) {
      const msg = getErrorMessage(err, 'Could not update account');
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsSection title="Account" description="Update how others see you on SkillBridge.">
      <form onSubmit={handleSave} className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={name} src={avatarUrl} size="xl" ring />
          <div className="flex-1">
            <Input
              label="Avatar URL"
              type="url"
              placeholder="https://…"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              hint="Paste an image URL. We'll show your initials if none is provided."
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={80}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <FormError message={error} />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={!dirty || saving}
            loading={saving}
            leftIcon={!saving ? <Save className="w-4 h-4" /> : null}
          >
            Save changes
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}

function SecurityTab() {
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const mismatch = confirmPassword && newPassword !== confirmPassword;
  const tooShort = newPassword && newPassword.length < 6;
  const canSubmit =
    currentPassword && newPassword && !mismatch && !tooShort && newPassword !== currentPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setSaving(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password updated');
    } catch (err) {
      const msg = getErrorMessage(err, 'Could not change password');
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsSection
      title="Security"
      description="Change your password. Pick something at least 6 characters long."
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <PasswordInput
          label="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <PasswordInput
          label="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          required
          error={tooShort ? 'Use at least 6 characters' : ''}
        />
        <PasswordInput
          label="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          required
          error={mismatch ? 'Passwords do not match' : ''}
        />

        <FormError message={error} />

        <div className="flex justify-end pt-1">
          <Button type="submit" disabled={!canSubmit || saving} loading={saving}>
            Update password
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}

function PreferencesTab() {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const toast = useToast();

  const baseline = useMemo(
    () => ({
      emailUpdates: user?.notificationPreferences?.emailUpdates ?? true,
      productNews: user?.notificationPreferences?.productNews ?? false,
      weeklyDigest: user?.notificationPreferences?.weeklyDigest ?? true,
    }),
    [user]
  );

  const [prefs, setPrefs] = useState(baseline);
  const [saving, setSaving] = useState(false);

  const persistTheme = async (next) => {
    setTheme(next);
    try {
      const updated = await updateSettings({ theme: next });
      updateUser(updated);
    } catch {
      // Local theme already applied; server sync is best-effort.
    }
  };

  const togglePref = async (key, value) => {
    const prev = prefs;
    const nextPrefs = { ...prev, [key]: value };
    setPrefs(nextPrefs);
    setSaving(true);
    try {
      const updated = await updateSettings({ notificationPreferences: nextPrefs });
      updateUser(updated);
      toast.success('Preferences saved');
    } catch (err) {
      setPrefs(prev);
      toast.error(getErrorMessage(err, 'Could not save preferences'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <SettingsSection
        title="Appearance"
        description="Pick a theme. SkillBridge will follow your system if you choose System."
      >
        <div className="grid grid-cols-3 gap-2 max-w-md">
          {THEME_OPTIONS.map((opt) => {
            const active = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => persistTheme(opt.id)}
                className={cx(
                  'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition',
                  active
                    ? 'border-teal-500 bg-teal-500/5 text-zinc-900 dark:text-zinc-50'
                    : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20'
                )}
                aria-pressed={active}
              >
                <span
                  className={cx(
                    'w-9 h-9 rounded-lg grid place-items-center',
                    active
                      ? 'bg-teal-600 text-white'
                      : 'bg-zinc-100 dark:bg-white/10'
                  )}
                >
                  {opt.icon}
                </span>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Choose what email we send you. We never share your email."
      >
        <div className="space-y-4">
          <Switch
            id="pref-email"
            checked={prefs.emailUpdates}
            onChange={(v) => togglePref('emailUpdates', v)}
            label="Account & match updates"
            description="Get notified when your match scores change or your roadmap progresses."
          />
          <Switch
            id="pref-news"
            checked={prefs.productNews}
            onChange={(v) => togglePref('productNews', v)}
            label="Product news"
            description="Occasional emails about new features and improvements."
          />
          <Switch
            id="pref-digest"
            checked={prefs.weeklyDigest}
            onChange={(v) => togglePref('weeklyDigest', v)}
            label="Weekly digest"
            description="A short summary of your career progress every Monday."
          />
        </div>
        {saving && <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Saving…</p>}
      </SettingsSection>
    </div>
  );
}

function DangerZoneTab({ onDeleted }) {
  const { logout } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const canDelete = password && confirmText === 'DELETE';

  const resetModal = () => {
    setOpen(false);
    setPassword('');
    setConfirmText('');
    setError('');
  };

  const handleDelete = async () => {
    if (!canDelete) return;
    setError('');
    setDeleting(true);
    try {
      await deleteAccount({ password });
      toast.success('Account deleted');
      await logout();
      onDeleted?.();
    } catch (err) {
      const msg = getErrorMessage(err, 'Could not delete account');
      setError(msg);
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Card
        padding="lg"
        className="border-red-200/70 dark:border-red-500/20 bg-red-50/40 dark:bg-red-500/5"
      >
        <header className="flex items-start gap-3 mb-4">
          <span className="w-10 h-10 rounded-xl grid place-items-center bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
            <TriangleAlert className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Delete account</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 max-w-prose">
              This permanently removes your profile, skills, OCEAN scores, and saved roadmaps. This
              cannot be undone.
            </p>
          </div>
        </header>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete my account
        </Button>
      </Card>

      <Modal
        open={open}
        onClose={() => {
          if (!deleting) resetModal();
        }}
        title="Delete account"
        description="To continue, type DELETE and enter your password."
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={resetModal} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!canDelete || deleting}
              loading={deleting}
            >
              Yes, delete
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input
            label="Type DELETE to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormError message={error} />
        </div>
      </Modal>
    </>
  );
}
