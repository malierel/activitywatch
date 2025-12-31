import { useMemo } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { FilterBar } from '@/components/design-system/filter-bar';
import { TableV2 } from '@/components/table/table-v2';
import { InlineState } from '@/components/design-system/inline-state';
import { Badge } from '@/components/ui/badge';

const SearchPage = () => {
  const data = useMemo(
    () =>
      Array.from({ length: 120 }).map((_, i) => ({
        id: i,
        title: i % 2 === 0 ? 'Browser tab' : 'Editor window',
        bucket: i % 2 === 0 ? 'aw-watcher-web' : 'aw-watcher-window',
        regex: i % 3 === 0
      })),
    []
  );

  const columns = useMemo(
    () => [
      { header: 'Title', accessorKey: 'title' },
      { header: 'Bucket', accessorKey: 'bucket' },
      {
        header: 'Match type',
        cell: ({ row }: any) => <Badge variant={row.original.regex ? 'info' : 'default'}>{row.original.regex ? 'Regex' : 'Keyword'}</Badge>
      }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Search"
        description="Keyword search by default with an advanced regex toggle."
        breadcrumb={{ section: 'Next UI' }}
      />
      <FilterBar />
      <TableV2 data={data} columns={columns} searchPlaceholder="Search keywords or titles" />
      <InlineState state="empty" description="Advanced mode supports regex for power users." />
    </div>
  );
};

export default SearchPage;
