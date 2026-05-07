import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import FormError from '../components/common/FormError';
import Button from '../components/common/Button';
import Logo from '../components/layout/Logo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const tooShort = password && password.length < 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tooShort) return;
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.data.user);
      navigate('/setup/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create your account</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Free forever. No credit card required.
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              leftIcon={<User className="w-4 h-4" />}
              placeholder="Ada Lovelace"
            />
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
              autoComplete="new-password"
              leftIcon={<Lock className="w-4 h-4" />}
              hint={!tooShort ? 'At least 6 characters' : undefined}
              error={tooShort ? 'Use at least 6 characters' : ''}
            />

            <FormError message={error} />

            <Button
              type="submit"
              loading={loading}
              disabled={tooShort}
              fullWidth
              size="lg"
              rightIcon={!loading ? <ArrowRight className="w-4 h-4" /> : null}
            >
              Create account
            </Button>
          </form>

          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 text-center">
            By creating an account you agree to our terms and privacy policy.
          </p>
        </Card>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-teal-700 dark:text-teal-300 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </PageContainer>
  );
}
