import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { ECharts, EChartsOption } from 'echarts';
import { DataCard, type DataCardProps } from '../design-system/data-card';

export interface EChartCardProps extends Omit<DataCardProps, 'children'> {
  option: EChartsOption;
}

export const EChartCard: React.FC<EChartCardProps> = ({ option, ...cardProps }) => {
  const chartRef = useRef<ReactECharts>(null);
  const instanceRef = useRef<ECharts | null>(null);

  useEffect(() => {
    return () => {
      try {
        instanceRef.current?.dispose?.();
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn('ECharts dispose warning', err);
        }
      } finally {
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <DataCard {...cardProps}>
      <ReactECharts
        ref={chartRef}
        option={option}
        notMerge
        lazyUpdate
        style={{ height: 320 }}
        onChartReady={(instance) => {
          instanceRef.current = instance;
        }}
      />
    </DataCard>
  );
};
