import DataCard, { DataCardProps } from '@/components/DataCard';
import { WindType } from '@/types/general';
import { ArrowDownTail, Wind } from 'tabler-icons-react';
import { Box, Center, Flex, Text } from '@mantine/core';
import { useMemo } from 'react';

export interface WindCardProps extends Omit<DataCardProps, 'icon' | 'title'> {
  data?: WindType;
}

export function getWindDirectionText(direction?: number): string {
  if (direction == undefined) return '无数据';
  if (direction > 348.75 || direction <= 11.25) return '北';
  if (direction > 11.25 && direction <= 33.75) return '北东北';
  if (direction > 33.75 && direction <= 56.25) return '东北';
  if (direction > 56.25 && direction <= 78.75) return '东东北';
  if (direction > 78.75 && direction <= 101.25) return '东';
  if (direction > 101.25 && direction <= 123.75) return '东东南';
  if (direction > 123.75 && direction <= 146.25) return '东南';
  if (direction > 146.25 && direction <= 168.75) return '南东南';
  if (direction > 168.75 && direction <= 191.25) return '南';
  if (direction > 191.25 && direction <= 213.75) return '南西南';
  if (direction > 213.75 && direction <= 236.25) return '西南';
  if (direction > 236.25 && direction <= 258.75) return '西西南';
  if (direction > 258.75 && direction <= 281.25) return '西';
  if (direction > 281.25 && direction <= 303.75) return '西西北';
  if (direction > 303.75 && direction <= 326.25) return '西北';
  if (direction > 326.25 && direction <= 348.75) return '北西北';
  return '无数据';
}

export function getWindLevel(speed?: number): number {
  if (speed == undefined) return NaN;
  if (speed < 1) return 0;
  if (speed <= 5) return 1;
  if (speed <= 11) return 2;
  if (speed <= 19) return 3;
  if (speed <= 28) return 4;
  if (speed <= 38) return 5;
  if (speed <= 49) return 6;
  if (speed <= 61) return 7;
  if (speed <= 74) return 8;
  if (speed <= 88) return 9;
  if (speed <= 102) return 10;
  if (speed <= 117) return 11;
  if (speed <= 133) return 12;
  if (speed <= 149) return 13;
  if (speed <= 166) return 14;
  if (speed <= 183) return 15;
  if (speed <= 201) return 16;
  return 17;
}

export default function WindCard({ data, ...props }: WindCardProps) {
  const windText = useMemo(() => {
    if (data?.direction == undefined) return '无数据';
    return `${getWindDirectionText(data.direction)}`;
  }, [data?.direction]);

  const windLevel = useMemo(() => {
    if (data?.speed == undefined) return '-- 级';
    return `${getWindLevel(data.speed)} 级`;
  }, [data?.speed]);

  return (
    <DataCard {...props} icon={<Wind size={14} />} title="风">
      <Flex className="h-full" justify="space-between" align="center">
        <Box>
          <Text weight="bold">{windText}</Text>
          <Flex columnGap="md" wrap="wrap">
            <Text size="sm" weight="bold">{windLevel}</Text>
            <Text size="sm" opacity={0.8}>{data?.speed.toFixed(0) ?? '--'} km/h</Text>
          </Flex>
        </Box>
        <Center mt={-20}>
          <Box className="w-20 h-20 relative rounded-full border-[20px] border-semi-transparent">
            <ArrowDownTail
              className="absolute top-1/2 left-1/2 transition-transform duration-700"
              size={36}
              strokeWidth={1}
              style={{ transform: `translate(-50%, -50%) rotate(${data?.direction ?? 180}deg)` }}
            />
            <Text
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
              size="xs" opacity={0.8}
            >北</Text>
            <Text
              className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2"
              size="xs" px={4} opacity={0.8}
            >东</Text>
            <Text
              className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2"
              size="xs" px={4} opacity={0.8}
            >西</Text>
            <Text
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
              size="xs" opacity={0.8}
            >南</Text>
          </Box>
        </Center>
      </Flex>
    </DataCard>
  );
}