import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ element, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  return element;
}
