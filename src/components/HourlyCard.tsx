import { HourlyData } from '@/types/hourly';
import DataCard, { DataCardProps } from '@/components/DataCard';
import { Clock } from 'tabler-icons-react';
import { Box, Text } from '@mantine/core';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getSkyConText } from '@/types/skycon';
import { getAQIColor, getAQIText } from '@/components/AirQualityCard';

const Area = dynamic(
  () => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false },
);

export interface HourlyWeatherProps extends Omit<DataCardProps, 'icon' | 'title'> {
  data?: HourlyData;
}

export default function HourlyCard({ data, ...props }: HourlyWeatherProps) {
  const plotData = useMemo(() => {
    return Array.from({ length: data?.temperature.length ?? 0 }, (_, i) => ({
      time: data!.temperature[i].datetime,
      temperature: data!.temperature[i].value,
      skycon: data!.skycon[i].value,
      aqi: data!.air_quality.aqi[i].value.chn,
    }));
  }, [data]);

  type PlotData = typeof plotData[number];

  return (
    <DataCard {...props} icon={<Clock size={14} />} title="48小时预报">
      {data ? <>
        <Text align="center">{data?.description}</Text>
        <Box className="overflow-auto" h={140} mx={-12} mb={-8}>
          <Area
            meta={{ temperature: { range: [0, 0.8] } }}
            appendPadding={[8, 0, 8, 0]}
            autoFit={false}
            height={140}
            width={3500}
            data={plotData}
            xField="time"
            yField="temperature"
            xAxis={{
              label: {
                formatter: (k, _, index) => {
                  const date = new Date(k);
                  const hour = date.getHours();
                  if (hour === 0) return `${date.getMonth() + 1}月${date.getDate()}日`;
                  return `${hour}:00`;
                },
                style: {
                  fill: '#ffffffbe',
                  fontSize: 12,
                  fontFamily: 'Inter',
                },
              },
              line: null,
              tickLine: null,
            }}
            yAxis={{ label: null, grid: null }}
            label={{
              offsetY: -4,
              formatter: (v) => {
                const data = v as PlotData;
                return `${data.temperature.toFixed(0)}°`;
              },
              style: {
                fill: '#fff',
                fontSize: 16,
                fontFamily: 'Inter',
              },
              autoRotate: false,
            }}
            tooltip={{
              domStyles: {
                'g2-tooltip': {
                  borderRadius: '0.5rem',
                  background: '#6274A2',
                  boxShadow: 'none',
                },
              },
              customContent: (k, v) => {
                if (!v[0]) return '';
                const data = v[0].data as PlotData;
                const date = new Date(data.time);
                return (
                  <div className="py-2 text-white">
                    <div className="text-xs whitespace-nowrap">
                      {date.getMonth() + 1}/{date.getDate()} {date.getHours()}:00
                    </div>
                    <div className="whitespace-nowrap">
                    <span className="text-lg font-bold">
                      {data.temperature.toFixed(0) ?? '--'}°
                    </span>
                      <span className="ml-1 text-sm">
                      {getSkyConText(data.skycon)}
                    </span>
                    </div>
                    <div className="text-xs whitespace-nowrap">
                    <span className="px-1 rounded" style={{ backgroundColor: getAQIColor(data.aqi) }}>
                      {getAQIText(data.aqi)}
                    </span>
                    </div>
                  </div>
                );
              },
            }}
            color="#fff"
            smooth
            point={{ shape: 'circle', size: 2, style: { fill: '#fff' } }}
            areaStyle={() => ({ fill: 'l(270) 0:#ffffff00 0.5:#fff 1:#fff' })}
          />
        </Box>
      </> : <Text py={64} align="center">暂无数据</Text>}
    </DataCard>
  );
}