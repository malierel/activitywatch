import { useMemo } from 'react';
import { PageHeader } from '@/components/design-system/page-header';
import { FilterBar } from '@/components/design-system/filter-bar';
import { EChartCard } from '@/components/chart/echart-card';
import { DataCard } from '@/components/design-system/data-card';

const TrendsPage = () => {
  const areaOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: {},
      xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Focus', type: 'line', areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Meetings', type: 'line', areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] }
      ]
    }),
    []
  );

  const heatmapOption = useMemo(
    () => ({
      tooltip: { position: 'top' },
      grid: { height: '50%', top: '10%' },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], splitArea: { show: true } },
      yAxis: { type: 'category', data: ['Morning', 'Day', 'Evening', 'Night'], splitArea: { show: true } },
      visualMap: {
        min: 0,
        max: 24,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%'
      },
      series: [
        {
          name: 'Density',
          type: 'heatmap',
          data: [
            [0, 0, 5],
            [1, 0, 8],
            [2, 1, 10],
            [3, 2, 12],
            [4, 1, 9],
            [5, 3, 3],
            [6, 3, 1]
          ],
          label: { show: false },
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.4)' } }
        }
      ]
    }),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trends"
        description="Defaulting to last 7 days with stacked area and weekday heatmap."
        breadcrumb={{ section: 'Next UI' }}
      />
      <FilterBar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EChartCard title="Stacked area" subtitle="Focus vs meetings" option={areaOption} />
        <EChartCard title="Weekday heatmap" subtitle="Intensity by daypart" option={heatmapOption} />
      </div>
      <DataCard title="Notes" subtitle="Default view is Last 7 days">
        <p className="text-sm text-muted">Use the global date picker to expand range for trend detection.</p>
      </DataCard>
    </div>
  );
};

export default TrendsPage;
