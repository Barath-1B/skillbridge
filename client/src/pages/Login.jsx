import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import FormError from '../components/common/FormError';
import Button from '../components/common/Button';
import Logo from '../components/layout/Logo';

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
      login(res.data.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer size="narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-6">
          <div className="inline-flex"><Logo showWordmark={false} size="lg" /></div>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to pick up where you left off.
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4" />}
              placeholder="you@example.com"
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <FormError message={error} />

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
              rightIcon={!loading ? <ArrowRight className="w-4 h-4" /> : null}
            >
              Sign in
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          New to SkillBridge?{' '}
          <Link to="/register" className="font-semibold text-teal-700 dark:text-teal-300 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </PageContainer>
  );
}
