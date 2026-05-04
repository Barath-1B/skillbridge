import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      console.log('Login response:', res);
      console.log('Token:', res.data.data?.token);
      console.log('User:', res.data.data?.user);
      login(res.data.data.token, res.data.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 card">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">No account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
    </div>
  );
}
