import { motion } from 'framer-motion';
import { staggerParent } from '../../utils/motion';
import PhaseNode from './PhaseNode';

// Vertical milestone timeline: a spine whose teal fill tracks overall
// completion, with a connected node per phase.
export default function MilestoneTimeline({ roadmap, progress, onToggleSkill, resources }) {
  const percent = progress?.percentComplete || 0;

  return (
    <div className="relative">
      {/* Spine (track) — centered under the 44px phase nodes */}
      <div className="absolute left-[21px] top-3 bottom-3 w-0.5 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percent}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-full bg-linear-to-b from-teal-500 to-teal-400"
        />
      </div>

      <motion.ol variants={staggerParent} initial="hidden" animate="show" className="relative space-y-8">
        {roadmap.map((phase, index) => (
          <PhaseNode
            key={phase.phase}
            phase={phase}
            index={index}
            onToggleSkill={onToggleSkill}
            resources={resources}
          />
        ))}
      </motion.ol>
    </div>
  );
}
