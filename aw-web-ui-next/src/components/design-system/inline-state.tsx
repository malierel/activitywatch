import { useState } from 'react';
import { AlertTriangle, Bug, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export interface InlineStateProps {
  state: 'loading' | 'empty' | 'error' | 'success';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  technicalDetails?: string;
  className?: string;
}

export const InlineState: React.FC<InlineStateProps> = ({
  state,
  title,
  description,
  actionLabel,
  onAction,
  technicalDetails,
  className
}) => {
  const [showTech, setShowTech] = useState(false);

  const icon = {
    loading: <Loader2 className="h-5 w-5 animate-spin text-primary" />,
    empty: <Sparkles className="h-5 w-5 text-muted" />,
    error: <Bug className="h-5 w-5 text-danger" />,
    success: <AlertTriangle className="h-5 w-5 text-success" />
  }[state];

  const defaultTitle =
    state === 'loading' ? 'Loading data…' : state === 'empty' ? 'No data found' : state === 'error' ? 'Something went wrong' : 'All good';

  const defaultDescription =
    state === 'loading'
      ? 'We are fetching fresh insights from aw-server.'
      : state === 'empty'
        ? 'Try adjusting filters, switching hosts, or verifying that watchers are running.'
        : state === 'error'
          ? 'The UI could not reach aw-server. Check that it is running on localhost and that buckets contain data.'
          : 'Data looks healthy.';

  return (
    <div className={cn('rounded-xl border border-border bg-surface-2 p-4 shadow-sm', className)}>
      <div className="flex items-start gap-3">
        {icon}
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-text">{title ?? defaultTitle}</p>
            <p className="text-sm text-muted">{description ?? defaultDescription}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
            {technicalDetails && (
              <Button variant="ghost" size="sm" onClick={() => setShowTech((v) => !v)}>
                {showTech ? 'Hide details' : 'Show technical details'}
              </Button>
            )}
          </div>
          {showTech && technicalDetails && (
            <pre className="mt-2 whitespace-pre-wrap rounded-md bg-surface p-3 text-xs text-muted border border-border">{technicalDetails}</pre>
          )}
        </div>
      </div>
    </div>
  );
};
