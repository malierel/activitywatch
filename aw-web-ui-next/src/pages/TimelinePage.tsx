import { useMemo } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { FilterBar } from '@/components/design-system/filter-bar';
import { EChartCard } from '@/components/chart/echart-card';
import { InlineState } from '@/components/design-system/inline-state';

const TimelinePage = () => {
  const option = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      toolbox: { feature: { dataZoom: { yAxisIndex: 'none' }, restore: {}, saveAsImage: {} } },
      dataZoom: [{ type: 'slider', start: 10, end: 80 }],
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Activity density',
          type: 'bar',
          stack: 'time',
          emphasis: { focus: 'series' },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Other',
          type: 'bar',
          stack: 'time',
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    }),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Timeline"
        description="Brush, zoom, and inspect activity segments across your day."
        breadcrumb={{ section: 'Next UI' }}
      />
      <FilterBar />
      <EChartCard title="Stacked timeline" subtitle="Zoom and brush to inspect" option={option} />
      <InlineState state="empty" description="Aggregate tiny segments are grouped as 'Other' to stay readable." />
    </div>
  );
};

export default TimelinePage;
