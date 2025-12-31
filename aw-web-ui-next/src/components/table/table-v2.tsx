import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { ArrowDownUp, Search } from 'lucide-react';

export interface TableV2Props<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
}

export function TableV2<TData>({ data, columns, searchPlaceholder }: TableV2Props<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((row: any) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 8
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <Input
            placeholder={searchPlaceholder ?? 'Search rows'}
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-surface-2 shadow-sm">
        <div className="max-h-96 overflow-auto" ref={parentRef}>
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 bg-surface">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          className="flex items-center gap-1"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <ArrowDownUp className="h-3 w-3" />
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody style={{ height: `${rowVirtualizer.getTotalSize()}px` }} className="relative block">
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      'absolute left-0 right-0 border-b border-border/60 px-4 hover:bg-surface',
                      virtualRow.index % 2 === 0 ? 'bg-surface-2' : 'bg-surface'
                    )}
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-text">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
