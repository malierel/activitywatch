import { useMemo } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { FilterBar } from '@/components/design-system/filter-bar';
import { KpiCard } from '@/components/design-system/kpi-card';
import { EChartCard } from '@/components/chart/echart-card';
import { InlineState } from '@/components/design-system/inline-state';
import { useBuckets, useHosts } from '@/lib/api/hooks';
import { Activity, Laptop, MousePointer2 } from 'lucide-react';

const ActivityPage = () => {
  const { data: hosts = [] } = useHosts();
  const { data: buckets = [], isLoading, error } = useBuckets();

  const categoryOption = useMemo(
    () => ({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [
        {
          name: 'Category',
          type: 'pie',
          radius: ['50%', '80%'],
          itemStyle: { borderRadius: 12, borderColor: '#fff', borderWidth: 2 },
          data: [
            { value: 1048, name: 'Communication' },
            { value: 735, name: 'Focus' },
            { value: 580, name: 'Browsing' },
            { value: 484, name: 'Meetings' },
            { value: 300, name: 'Other' }
          ]
        }
      ]
    }),
    []
  );

  const timelineOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: { data: ['Focus', 'Meetings', 'Browsing'] },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Focus', type: 'line', stack: 'total', areaStyle: {}, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Meetings', type: 'line', stack: 'total', areaStyle: {}, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Browsing', type: 'line', stack: 'total', areaStyle: {}, emphasis: { focus: 'series' }, data: [150, 232, 201, 154, 190, 330, 410] }
      ]
    }),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity"
        description="A modern view of your timeline, applications, and focus time across hosts."
        breadcrumb={{ section: 'Next UI' }}
        ctaLabel="Open legacy UI"
        onCtaClick={() => window.open('/', '_blank')}
      />

      <FilterBar hosts={hosts.map((h) => h.hostname)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard label="Focus time" value="6h 12m" delta="+12% vs last week" icon={Activity} trend="up" />
        <KpiCard label="Meetings" value="3h 08m" delta="-8%" icon={Laptop} trend="down" />
        <KpiCard label="App switches" value="178" delta="Stable" icon={MousePointer2} trend="flat" />
      </div>

      {error && (
        <InlineState
          state="error"
          technicalDetails={String(error)}
          actionLabel="Open buckets"
          onAction={() => window.open('/#/buckets', '_blank')}
        />
      )}

      {isLoading ? (
        <InlineState state="loading" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EChartCard title="Category breakdown" subtitle="Donut with categories" option={categoryOption} />
          <EChartCard title="Daily timeline" subtitle="Stacked areas over the last 7 days" option={timelineOption} />
        </div>
      )}

      <InlineState
        state="empty"
        title="Need more data?"
        description="Run a watcher like aw-watcher-window or aw-watcher-afk to start filling your buckets."
        actionLabel="Add watcher"
        onAction={() => window.open('https://docs.activitywatch.net/en/latest/watchers.html', '_blank')}
      />
    </div>
  );
};

export default ActivityPage;
