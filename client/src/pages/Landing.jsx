import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Compass,
  Map,
  Zap,
  ShieldCheck,
  Brain,
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { staggerParent, fadeUp } from '../utils/motion';

const HOW_IT_WORKS = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Tell us about you',
    body: 'Share your skills, experience, certifications, and personality in a 4-step flow.',
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: 'See your matches',
    body: 'We score every viable career path against your profile and rank them by fit.',
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: 'Follow the roadmap',
    body: 'Each match comes with a step-by-step plan for the gaps you need to bridge.',
  },
];

const PROFILE_LAYERS = [
  { icon: <Briefcase className="w-5 h-5" />, label: 'Experience', desc: 'Student to senior' },
  { icon: <Award className="w-5 h-5" />, label: 'Certifications', desc: 'Industry credentials' },
  { icon: <Code2 className="w-5 h-5" />, label: 'Skills', desc: 'What you can do' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Knowledge', desc: 'What you know' },
  { icon: <Brain className="w-5 h-5" />, label: 'Personality', desc: 'How you work' },
];

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Instant analysis',
    body: 'Match scores in under a second. No waiting, no friction.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Built on data',
    body: 'Curated career profiles with weighted skill priorities, not generic checklists.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Made for CS',
    body: 'Tuned for software, ML, data, and other technical career paths.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative">
      {/* Decorative background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-slate-900/20 blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
        <div className="absolute top-10 right-0 w-[460px] h-[460px] rounded-full bg-teal-500/20 blur-3xl animate-[blob_22s_ease-in-out_infinite]" />
        <div className="absolute top-72 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-slate-900/15 blur-3xl animate-[blob_25s_ease-in-out_infinite]" />
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 backdrop-blur text-zinc-700 dark:text-zinc-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            New — full-profile match scoring
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 text-balance"
        >
          Find your gap.{' '}
          <span className="gradient-text">Bridge it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl mx-auto text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 text-pretty"
        >
          Discover the career paths that fit your skills, experience, and personality —
          with a roadmap for the gaps you need to close.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            size="lg"
            onClick={() => navigate(user ? '/dashboard' : '/setup/profile')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {user ? 'Go to dashboard' : 'Get started — free'}
          </Button>
          {!user && (
            <Link to="/login">
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 mx-auto max-w-3xl glass-card-strong p-5 sm:p-7 text-left"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Sample match
              </p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Machine Learning Engineer</h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold gradient-text tabular-nums">87%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">match</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden mb-5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '87%' }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-teal-600"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <Stat label="Skill match" value="92%" />
            <Stat label="Personality fit" value="+8%" tone="positive" />
            <Stat label="Gap to close" value="3 skills" />
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="How it works"
          title="From profile to plan in 3 steps"
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-4 mt-10"
        >
          {HOW_IT_WORKS.map((step, i) => (
            <motion.li key={step.title} variants={fadeUp} className="glass-card p-6 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-xl grid place-items-center bg-teal-600 text-white text-sm font-bold shadow-[var(--shadow-glow)]">
                {i + 1}
              </div>
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-teal-500/10 text-teal-700 dark:text-teal-300 mb-3">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{step.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{step.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* 5-layer profile */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="5-layer profile"
          title="We look at the whole picture"
          subtitle="Most career sites only know your job title. SkillBridge models five layers — and weighs them differently for every career."
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          {PROFILE_LAYERS.map((layer) => (
            <motion.li
              key={layer.label}
              variants={fadeUp}
              className="glass-card p-4 text-center"
            >
              <div className="mx-auto w-10 h-10 rounded-xl grid place-items-center bg-teal-500/15 text-teal-700 dark:text-teal-300 mb-2">
                {layer.icon}
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{layer.label}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{layer.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading eyebrow="Why SkillBridge" title="Built for serious career planning" />
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid md:grid-cols-3 gap-4"
        >
          {FEATURES.map((f) => (
            <motion.li key={f.title} variants={fadeUp} className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-teal-500/10 text-teal-700 dark:text-teal-300 mb-3">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{f.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{f.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center glass-card-strong">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/25 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 text-balance">
              Ready to find your fit?
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
              Free to use. No credit card. Get your career matches in under 3 minutes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate(user ? '/dashboard' : '/setup/profile')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {user ? 'Open dashboard' : 'Start now'}
              </Button>
              {!user && (
                <Link to="/register">
                  <Button variant="secondary" size="lg">
                    Create an account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }) {
  const valueClass =
    tone === 'positive'
      ? 'text-emerald-600 dark:text-emerald-400'
      : 'text-zinc-900 dark:text-zinc-50';
  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
        {label}
      </p>
      <p className={`text-lg font-bold tabular-nums ${valueClass}`}>{value}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <p className="text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-pretty">{subtitle}</p>
      )}
    </div>
  );
}
