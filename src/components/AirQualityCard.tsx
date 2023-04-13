import DataCard, { DataCardProps } from '@/components/DataCard';
import { Mist } from 'tabler-icons-react';
import { Center, Flex } from '@mantine/core';
import dynamic from 'next/dynamic';
import { AirQualityType } from '@/types/realtime';
import DataItems from '@/components/DataItems';

const Gauge = dynamic(
  () => import('@ant-design/plots').then(({ Gauge }) => Gauge),
  { ssr: false },
);

export interface AirQualityCardProps extends Omit<DataCardProps, 'icon' | 'title'> {
  data?: AirQualityType;
}

function getAQIColor(aqi?: number): string {
  if (aqi == undefined) return '#ffffff4c';
  if (aqi <= 50) return '#2bd92b';
  if (aqi <= 100) return '#ffd500';
  if (aqi <= 150) return '#ff7e00';
  if (aqi <= 200) return '#e53737';
  if (aqi <= 300) return '#99004c';
  return '#7e0023';
}

function getAQIText(aqi?: number): string {
  if (aqi == undefined) return '无数据';
  if (aqi <= 50) return '优';
  if (aqi <= 100) return '良';
  if (aqi <= 150) return '轻度污染';
  if (aqi <= 200) return '中度污染';
  if (aqi <= 300) return '重度污染';
  return '严重污染';
}

export default function AirQualityCard({ data, ...props }: AirQualityCardProps) {
  const aqi = data?.aqi?.chn;

  return (
    <DataCard {...props} icon={<Mist size={14} />} title="空气质量">
      <Flex justify="space-around" align="center" gap="lg">
        <Center h={120} w={120}>
          <Gauge
            percent={aqi ? aqi / 500 : 0}
            indicator={false}
            innerRadius={0.8}
            gaugeStyle={{ lineCap: 'round' }}
            width={120}
            height={120}
            range={{
              ticks: [aqi ? aqi / 500 : 0.001, 1],
              color: [getAQIColor(aqi), '#ffffff4c'],
            }}
            statistic={{
              title: {
                offsetY: -32,
                content: `${aqi ?? '--'}`,
                style: { fontSize: '24px' },
              },
              content: {
                content: getAQIText(aqi),
                style: {
                  fontSize: '14px',
                  color: '#fff',
                },
              },
            }}
          />
        </Center>
        <Center>
          <DataItems
            spacing={2}
            data={[
              { title: <span>PM<sub>10</sub></span>, value: data?.pm10 },
              { title: <span>NO<sub>2</sub></span>, value: data?.no2 },
              { title: <span>O<sub>3</sub></span>, value: data?.o3 },
            ]}
            fallback="--"
          />
        </Center>
        <Center>
          <DataItems
            spacing={2}
            data={[
              { title: <span>PM<sub>2.5</sub></span>, value: data?.pm25 },
              { title: <span>SO<sub>2</sub></span>, value: data?.so2 },
              { title: <span>CO</span>, value: data?.co },
            ]}
            fallback="--"
          />
        </Center>
      </Flex>
    </DataCard>
  );
}