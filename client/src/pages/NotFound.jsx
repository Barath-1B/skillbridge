import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft } from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const { user } = useAuth();
  const homeHref = user ? '/dashboard' : '/';

  return (
    <PageContainer size="narrow" className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="py-16"
      >
        <p className="text-7xl sm:text-9xl font-extrabold gradient-text leading-none">
          404
        </p>
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 text-balance">
          We couldn't find that page.
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-pretty">
          The page might have been moved, or the link is wrong. Let's get you back on track.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to={homeHref}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 shadow-[var(--shadow-glow)] hover:brightness-110 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {user ? 'dashboard' : 'home'}
          </Link>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/10 transition"
          >
            <Compass className="w-4 h-4" />
            Browse careers
          </Link>
        </div>
      </motion.div>
    </PageContainer>
  );
}
