import * as React from 'react';
import { cn } from '@/lib/utils';

export type TabOption = { id: string; label: string };

export interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({ options, value, onChange, className, children }) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-2 rounded-lg bg-surface-2 p-2 shadow-sm border border-border">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-semibold transition-colors',
              value === opt.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-text hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
};
