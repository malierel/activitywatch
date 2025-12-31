import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'flat';
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, delta, icon: Icon, trend = 'flat', className }) => {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted';

  return (
    <div className={cn('glass-panel token-card p-4 rounded-xl', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-muted" />}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-text">{value}</p>
        {delta && <span className={cn('text-xs font-semibold', trendColor)}>{delta}</span>}
      </div>
    </div>
  );
};
