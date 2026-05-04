import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, fetch current user from server (httpOnly cookie automatically sent)
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

  const login = (userData) => {
    // Token is stored in httpOnly cookie by server; we only store user data in state
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
