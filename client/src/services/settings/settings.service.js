import api from '../../api/axios';

export async function updateAccount({ name, email, avatarUrl }) {
  const res = await api.put('/profile/account', { name, email, avatarUrl });
  return res.data?.data;
}

export async function updateSettings({ theme, notificationPreferences }) {
  const res = await api.put('/profile/settings', { theme, notificationPreferences });
  return res.data?.data;
}

export async function changePassword({ currentPassword, newPassword }) {
  const res = await api.put('/auth/password', { currentPassword, newPassword });
  return res.data?.data;
}

export async function deleteAccount({ password }) {
  const res = await api.delete('/auth/account', { data: { password } });
  return res.data?.data;
}
