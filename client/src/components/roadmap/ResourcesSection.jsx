import { PlayCircle, FileText, GraduationCap, Award, ExternalLink } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const TYPE_ICON = {
  video: PlayCircle,
  article: FileText,
  course: GraduationCap,
  cert: Award,
};

export default function ResourcesSection({ career }) {
  const resources = Array.isArray(career.resources) ? career.resources : [];
  const certs = Array.isArray(career.certifications) ? career.certifications : [];
  if (resources.length === 0 && certs.length === 0) return null;

  return (
    <Card padding="lg" className="mb-8">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Resources & certifications</h3>

      {resources.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-2 mb-4">
          {resources.map((r) => {
            const Icon = TYPE_ICON[r.type] || FileText;
            return (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-teal-400 transition group"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg grid place-items-center bg-teal-500/15 text-teal-700 dark:text-teal-300">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="flex-1 min-w-0 text-sm text-zinc-800 dark:text-zinc-100 truncate">{r.title}</span>
                  <ExternalLink className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-teal-500" />
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {certs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {certs.map((c) => (
            <Badge key={c} variant="primary">
              <Award className="w-3 h-3 mr-1" />
              {c}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
