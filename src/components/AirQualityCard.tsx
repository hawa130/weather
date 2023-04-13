import DataCard from '@/components/DataCard';
import { Mist } from 'tabler-icons-react';
import { Center, RingProgress, Stack, Text } from '@mantine/core';

export interface AirQualityCardProps {
  aqi: number;
}

function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#00e400';
  if (aqi <= 100) return '#ffff00';
  if (aqi <= 150) return '#ff7e00';
  if (aqi <= 200) return '#ff0000';
  if (aqi <= 300) return '#99004c';
  return '#7e0023';
}

function getAQIText(aqi: number): string {
  if (aqi <= 50) return '优';
  if (aqi <= 100) return '良';
  if (aqi <= 150) return '轻度污染';
  if (aqi <= 200) return '中度污染';
  if (aqi <= 300) return '重度污染';
  return '严重污染';
}

export default function AirQualityCard({ aqi }: AirQualityCardProps) {
  return (
    <DataCard icon={<Mist size={14} />} title="AQI">
      <Center>
        <RingProgress
          sections={[{ value: aqi / 5, color: getAQIColor(aqi) }]}
          roundCaps
          size={120}
          thickness={8}
          label={
            <Stack spacing={0}>
              <Text size="xl" align="center" weight="bold">
                {aqi}
              </Text>
              <Text size="sm" align="center">
                {getAQIText(aqi)}
              </Text>
            </Stack>
          }
        />
      </Center>
    </DataCard>
  );
}