import { useMemo } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { TableV2 } from '@/components/table/table-v2';
import { useBuckets } from '@/lib/api/hooks';
import { InlineState } from '@/components/design-system/inline-state';
import { Badge } from '@/components/ui/badge';

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
      {error && <InlineState state="error" technicalDetails={String(error)} />}
      {isLoading ? (
        <InlineState state="loading" />
      ) : data.length === 0 ? (
        <InlineState state="empty" actionLabel="Open legacy UI" onAction={() => window.open('/#/buckets', '_blank')} />
      ) : (
        <TableV2 data={data} columns={columns} searchPlaceholder="Search buckets" />
      )}
    </div>
  );
};

export default BucketsPage;
