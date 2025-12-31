import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { FilterBar } from '@/components/design-system/filter-bar';
import { Tabs } from '@/components/ui/tabs';
import { KpiCard } from '@/components/design-system/kpi-card';
import { EChartCard } from '@/components/chart/echart-card';
import { TableV2 } from '@/components/table/table-v2';
import { DataCard } from '@/components/design-system/data-card';

const sampleEvents = Array.from({ length: 200 }).map((_, idx) => ({
  id: idx + 1,
  bucket: idx % 2 === 0 ? 'aw-watcher-window' : 'aw-watcher-afk',
  timestamp: new Date(Date.now() - idx * 60000).toISOString(),
  summary: idx % 2 === 0 ? 'Window change' : 'AFK heartbeat'
}));

const ReportsPage = () => {
  const [tab, setTab] = useState('builder');

  const columns = useMemo(
    () => [
      {
        header: 'Bucket',
        accessorKey: 'bucket'
      },
      {
        header: 'Timestamp',
        accessorKey: 'timestamp'
      },
      {
        header: 'Summary',
        accessorKey: 'summary'
      }
    ],
    []
  );

  const builder = (
    <DataCard title="Report builder" subtitle="Define filters, host, and bucket scope">
      <FilterBar />
    </DataCard>
  );

  const results = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard label="Events" value="12,480" delta="+4%" trend="up" />
        <KpiCard label="Avg session" value="48m" delta="-3%" trend="down" />
        <KpiCard label="Active hosts" value="3" delta="Stable" trend="flat" />
      </div>
      <EChartCard
        title="Category distribution"
        subtitle="Stacked bars per day"
        option={{
          tooltip: { trigger: 'axis' },
          legend: {},
          xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
          yAxis: { type: 'value' },
          series: [
            { name: 'Focus', type: 'bar', stack: 'total', data: [120, 200, 150, 80, 70] },
            { name: 'Meetings', type: 'bar', stack: 'total', data: [60, 40, 70, 110, 130] }
          ]
        }}
      />
      <DataCard title="Events" subtitle="Virtualized results">
        <TableV2 data={sampleEvents} columns={columns} searchPlaceholder="Search events" />
      </DataCard>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Two-step builder for composing reusable reports."
        breadcrumb={{ section: 'Next UI' }}
      />
      <Tabs
        options={[
          { id: 'builder', label: 'Builder' },
          { id: 'results', label: 'Results' }
        ]}
        value={tab}
        onChange={setTab}
      >
        {tab === 'builder' ? builder : results}
      </Tabs>
    </div>
  );
};

export default ReportsPage;
