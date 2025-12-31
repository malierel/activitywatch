import { Button } from '../ui/button';
import { BreadcrumbJsonLd } from './page-header.types';

export interface PageHeaderProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  actions?: React.ReactNode;
  breadcrumb?: BreadcrumbJsonLd;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, ctaLabel, onCtaClick, actions, breadcrumb }) => {
  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-border mb-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{breadcrumb?.section ?? 'Dashboard'}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-text">{title}</h1>
          {description && <p className="text-muted mt-2 max-w-2xl">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {ctaLabel && <Button onClick={onCtaClick}>{ctaLabel}</Button>}
        </div>
      </div>
    </div>
  );
};
