import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { DataCard, type DataCardProps } from '../design-system/data-card';

export interface EChartCardProps extends Omit<DataCardProps, 'children'> {
  option: EChartsOption;
}

export const EChartCard: React.FC<EChartCardProps> = ({ option, ...cardProps }) => {
  return (
    <DataCard {...cardProps}>
      <ReactECharts option={option} notMerge lazyUpdate style={{ height: 320 }} />
    </DataCard>
  );
};
