import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl'
};

export const Modal: React.FC<ModalProps> = ({ open, onOpenChange, title, subtitle, children, footer, size = 'md' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={cn('w-full rounded-xl bg-surface-2 border border-border shadow-card', sizeClasses[size])}>
        <div className="flex items-start justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-text">{title}</h3>
            {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
          </div>
          <Button variant="ghost" size="sm" aria-label="Close" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-4">{children}</div>
        {footer && <div className="p-4 border-t border-border bg-surface">{footer}</div>}
      </div>
    </div>
  );
};
