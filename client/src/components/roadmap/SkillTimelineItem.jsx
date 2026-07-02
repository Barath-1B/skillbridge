import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, CircleDashed, Clock, AlertCircle, ChevronDown, ExternalLink,
} from 'lucide-react';

const STATUS = {
  have: { label: 'You have this', badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10' },
  partial: { label: 'Adjacent skill', badge: 'text-amber-700 dark:text-amber-300 bg-amber-500/10' },
  missing: { label: 'To learn', badge: 'text-zinc-600 dark:text-zinc-400 bg-zinc-500/10' },
};

// Resources whose title overlaps the skill name (case-insensitive either way).
function matchResources(resources, name) {
  if (!Array.isArray(resources)) return [];
  const n = name.toLowerCase();
  return resources.filter((r) => {
    const t = (r.title || '').toLowerCase();
    return t && (t.includes(n) || n.includes(t));
  });
}

export default function SkillTimelineItem({ skill, phaseNum, onToggle, resources }) {
  const [open, setOpen] = useState(false);
  const completed = skill.completed;
  const status = STATUS[skill.status] || STATUS.missing;
  const links = matchResources(resources, skill.name);

  return (
    <li className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5">
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Toggle — separate target from expand */}
        <button
          type="button"
          onClick={() => onToggle(phaseNum, skill.name)}
          aria-pressed={completed}
          aria-label={completed ? `Mark ${skill.name} incomplete` : `Mark ${skill.name} complete`}
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-full"
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          ) : skill.status === 'have' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : skill.status === 'partial' ? (
            <CircleDashed className="w-5 h-5 text-amber-500" />
          ) : (
            <Circle className="w-5 h-5 text-zinc-400" />
          )}
        </button>

        <span className={`flex-1 min-w-0 text-sm text-zinc-800 dark:text-zinc-100 ${completed ? 'line-through decoration-1 decoration-teal-600/60' : ''}`}>
          {skill.name}
        </span>

        <span className={`hidden sm:inline text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badge}`}>
          {status.label}
        </span>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle details"
          className="shrink-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
              <p className="sm:hidden font-medium">{status.label}</p>
              {skill.status === 'partial' && skill.via && (
                <p>You already know <span className="font-medium text-amber-700 dark:text-amber-300">{skill.via}</span>, which is closely related.</p>
              )}
              {typeof skill.effortHours === 'number' && (
                <p className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Roughly {skill.effortHours}h to working proficiency.</p>
              )}
              {skill.needsFoundation && (
                <p className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <AlertCircle className="w-3.5 h-3.5" />Learn {skill.needsFoundation} first.
                </p>
              )}
              {links.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 dark:text-teal-300 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />{r.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
