import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';

export interface DataCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DataCard: React.FC<DataCardProps> = ({ title, subtitle, actions, children, className }) => {
  return (
    <section className={cn('glass-panel token-card rounded-xl p-4 space-y-3', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Insight</p>
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <Button variant="ghost" size="sm" aria-label="More actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="min-h-[240px]">{children}</div>
    </section>
  );
};
