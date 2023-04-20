import { HourlyData } from '@/types/hourly';
import DataCard, { DataCardProps } from '@/components/DataCard';
import { Clock } from 'tabler-icons-react';
import { Box, Center, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getSkyConText, SkyConType } from '@/types/skycon';
import WeatherIcon from '@/components/WeatherIcon';
import AQIBadge from '@/components/AQIBadge';
import { cls } from '@/utils/helper';
import { getWeatherBgColor } from '@/utils/weather';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Area = dynamic(
  () => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false },
);

export interface HourlyWeatherProps extends Omit<DataCardProps, 'icon' | 'title'> {
  data?: HourlyData;
  skycon?: SkyConType;
  isNight?: boolean;
}

export default function HourlyCard({ data, skycon, isNight, ...props }: HourlyWeatherProps) {
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
      <Box className="h-full flex flex-col justify-between">
        {data ? <>
          <Text align="center">{data?.description}</Text>
          <ScrollArea mx={-12} mb={-8} scrollbarSize={6} styles={(_theme) => ({
            scrollbar: {
              '&[data-orientation="horizontal"]': {
                transition: 'height 150ms ease-in-out',
              },
              '&[data-orientation="horizontal"]:hover': {
                height: '8px',
                transition: 'height 150ms ease-in-out',
                background: 'rgba(255,255,255,0.1)',
              },
            },
          })}>
            <Box h={100} w={3400}>
              <Area
                meta={{ temperature: { range: [0, 0.8] } }}
                appendPadding={[16, 0, 4, 0]}
                data={plotData}
                xField="time"
                yField="temperature"
                xAxis={{ label: null, line: null, tickLine: null }}
                yAxis={{ label: null, grid: null }}
                label={{
                  offsetY: -4,
                  formatter: (v) => {
                    const data = v as PlotData;
                    return `${data.temperature.toFixed(0)}°`;
                  },
                  style: {
                    ...inter.style,
                    fill: '#fff',
                    fontSize: 16,
                  },
                  autoRotate: false,
                }}
                startOnZero={false}
                tooltip={{
                  domStyles: {
                    'g2-tooltip': {
                      borderRadius: '0.5rem',
                      background: '#0000',
                      boxShadow: 'none',
                      padding: 0,
                      opacity: 1,
                    },
                  },
                  customContent: (k, v) => {
                    if (!v[0]) return '';
                    const data = v[0].data as PlotData;
                    const date = new Date(data.time);
                    return (
                      <div
                        style={inter.style}
                        className={cls(
                          skycon ? `${getWeatherBgColor(skycon, isNight)}` : 'bg-black bg-opacity-90',
                          'py-2 px-3 rounded-lg border-t border-semi-transparent-dark text-white',
                        )}
                      >
                        <div className="text-xs whitespace-nowrap">
                          {date.toLocaleString('zh-CN', {
                            month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
                          })}
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
                          <AQIBadge aqi={data.aqi} showVal />
                        </div>
                      </div>
                    );
                  },
                }}
                color="#fff"
                smooth
                point={{ shape: 'circle', size: 2, style: { fill: '#fff' } }}
                areaStyle={() => ({ fill: 'l(270) 0:#ffffff00 0.5:#fff 1:#fff' })}
                animation={false}
                renderer="svg"
              />
            </Box>
            <SimpleGrid w={3400} cols={plotData.length} pb={8} className="justify-items-center" spacing={0}>
              {plotData.map((data) => {
                const date = new Date(data.time);
                const hour = date.getHours();
                return (
                  <Stack spacing={4} align="center" key={data.time}>
                    <WeatherIcon className="w-5 h-5" skycon={data.skycon} />
                    <AQIBadge aqi={data.aqi} short />
                    <Text
                      size="xs"
                      opacity={0.8}
                    >{hour === 0
                      ? date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
                      : date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                    }</Text>
                  </Stack>
                );
              })}
            </SimpleGrid>
          </ScrollArea>
        </> : <Center h={192}>暂无数据</Center>}
      </Box>
    </DataCard>
  );
}