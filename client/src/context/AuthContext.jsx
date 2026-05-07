import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Accepts login(user) or legacy login(token, user) — kept while older callers migrate.
  const login = useCallback((arg1, arg2) => {
    const userData = arg2 ?? arg1;
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Server may have already cleared the cookie; treat as success either way.
    }
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.data);
      return response.data.data;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((cur) => (cur ? { ...cur, ...patch } : cur));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
