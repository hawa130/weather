import { MinutelyData } from '@/types/minutely';
import dynamic from 'next/dynamic';
import { Box, BoxProps, Center, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { cls } from '@/utils/helper';
import { useMemo } from 'react';

const Area = dynamic(
  () => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false },
);

interface MinutelyCardProps extends BoxProps {
  data?: MinutelyData;
  description?: string;
}

export default function MinutelyCard({ data, description, className, ...props }: MinutelyCardProps) {
  const max = useMemo(() => {
    if (data) {
      return Math.max(...data.precipitation_2h);
    }
    return 0;
  }, [data]);

  return (
    <Box
      px="md" py="sm" {...props}
      className={cls('bg-semi-transparent backdrop-blur rounded-lg border-t border-semi-transparent overflow-hidden', className)}
    >
      <Center className={max ? undefined : 'h-full'}>{description ?? '---'}</Center>
      {max ? (
        <ScrollArea mx={-12} mb={-8} scrollbarSize={4} type="scroll" styles={(_theme) => ({
          scrollbar: {
            '&[data-orientation="horizontal"]': {
              transition: 'height 150ms ease-in-out',
            },
            '&[data-orientation="horizontal"]:hover': {
              height: '6px',
              transition: 'height 150ms ease-in-out',
              background: 'rgba(255,255,255,0.1)',
            },
          },
        })}>
          <Box w={800} h={48}>
            <Area
              meta={{ data: { max: 0.5, range: [0, 0.85] } }}
              padding={[0, -4, 1, -4]}
              data={data?.precipitation_2h.map((data, index) => ({ index, data })) ?? []}
              tooltip={false}
              color="#fff"
              xField="index"
              yField="data"
              xAxis={{ label: null, line: null, tickLine: null }}
              yAxis={{ label: null, grid: null }}
              smooth
              line={{ size: 1.5 }}
              areaStyle={() => ({ fill: 'l(270) 0:#ffffff00 0.5:#fff 1:#fff' })}
              animation={false}
            />
          </Box>
          <SimpleGrid w={800} cols={24} spacing={0} className="justify-items-center">
            {Array.from({ length: 12 }, (_, i) => (
              i !== 0
                ? <Text key={i} className="col-span-2" size="xs" pb="xs" opacity={0.8}>{i * 10}min</Text>
                : <div key={i} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      ) : null}
    </Box>
  );
}