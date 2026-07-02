import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import { fadeUp } from '../../utils/motion';
import Badge from '../common/Badge';
import SkillTimelineItem from './SkillTimelineItem';

// Node state from this phase's own completion.
function phaseState(skills) {
  const total = skills.length;
  const done = skills.filter((s) => s.completed).length;
  if (total > 0 && done === total) return 'complete';
  if (done > 0) return 'active';
  return 'upcoming';
}

export default function PhaseNode({ phase, index, onToggleSkill, resources }) {
  const done = phase.skills.filter((s) => s.completed).length;
  const state = phaseState(phase.skills);

  const node =
    state === 'complete'
      ? 'bg-teal-600 text-white border-teal-600'
      : state === 'active'
        ? 'bg-white dark:bg-zinc-900 text-teal-600 border-teal-500 ring-4 ring-teal-500/15'
        : 'bg-white dark:bg-zinc-900 text-zinc-400 border-zinc-300 dark:border-white/15';

  return (
    <motion.li variants={fadeUp} className="relative pl-16">
      {/* Node on the spine */}
      <span
        className={`absolute left-0 top-0 grid place-items-center w-11 h-11 rounded-full border-2 font-semibold text-sm ${node} ${state === 'active' ? 'animate-pulse' : ''}`}
      >
        {state === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
      </span>

      <div className="pt-1">
        <header className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300">
              Phase {phase.phase}
            </p>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{phase.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              {done}/{phase.skills.length} skills
            </span>
            {phase.milestoneMonths && (
              <Badge variant="neutral">
                <Clock className="w-3 h-3 mr-1" />
                {phase.milestoneMonths}
              </Badge>
            )}
          </div>
        </header>

        <ul className="space-y-2">
          {phase.skills.map((skill) => (
            <SkillTimelineItem
              key={skill.name}
              skill={skill}
              phaseNum={phase.phase}
              onToggle={onToggleSkill}
              resources={resources}
            />
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
