import { useMemo } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { TableV2 } from '@/components/table/table-v2';
import { useBuckets } from '@/lib/api/hooks';
import { InlineState } from '@/components/design-system/inline-state';
import { Badge } from '@/components/ui/badge';
import { formatApiError } from '@/lib/api/client';

const BucketsPage = () => {
  const { data = [], isLoading, error } = useBuckets();

  const columns = useMemo(
    () => [
      { header: 'ID', accessorKey: 'id' },
      { header: 'Type', accessorKey: 'type' },
      { header: 'Hostname', accessorKey: 'hostname' },
      {
        header: 'Client',
        cell: ({ row }: any) => <Badge variant="info">{row.original.client ?? 'unknown'}</Badge>
      }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buckets"
        description="Inspect raw buckets served by aw-server."
        breadcrumb={{ section: 'Next UI' }}
      />
      {error ? (
        <InlineState
          state="error"
          description="Unable to load buckets from aw-server."
          technicalDetails={formatApiError(error as any)}
          actionLabel="Open legacy UI"
          onAction={() => window.open('/#/buckets', '_blank')}
        />
      ) : isLoading ? (
        <InlineState state="loading" />
      ) : data.length === 0 ? (
        <InlineState
          state="empty"
          title="No watcher buckets found for this host"
          description="Start a watcher like aw-watcher-window or aw-watcher-afk to populate data."
          actionLabel="Open legacy UI"
          onAction={() => window.open('/#/buckets', '_blank')}
        />
      ) : (
        <TableV2 data={data} columns={columns} searchPlaceholder="Search buckets" />
      )}
    </div>
  );
};

export default BucketsPage;
