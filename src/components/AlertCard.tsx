import DataCard, { DataCardProps } from '@/components/DataCard';
import { WeatherAlertContent } from '@/types/alert';
import { AlertTriangle, ChevronUp } from 'tabler-icons-react';
import { ActionIcon, Box, Group, Text, Transition } from '@mantine/core';
import { cls } from '@/utils/helper';
import { useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { SimpleBadge } from '@/components/SimpleBadge';

export interface AlertCardProps extends Omit<DataCardProps, 'icon' | 'title'> {
  data?: WeatherAlertContent[];
}

export default function AlertCard({ data, className, ...props }: AlertCardProps) {
  const [isHidden, setIsHidden] = useState(false);
  const { ref, height } = useElementSize();

  return (
    <DataCard
      className={cls(className, '!border-0')} pb={0}
      {...props}
      onTitleClick={() => setIsHidden(prev => !prev)}
      icon={<AlertTriangle size={16} />} title="天气预警"
      titleBg={isHidden ? undefined : getLevelColor(data?.[0]?.code.slice(2, 4))}
      extra={
        <Group>
          <Transition transition="slide-up" mounted={isHidden}>
            {(styles) => <SimpleBadge style={styles}>{data?.length ?? 0} 则</SimpleBadge>}
          </Transition>
          <ActionIcon size={20}>
            <ChevronUp className={cls(isHidden ? 'rotate-180' : undefined, 'transition-transform')} />
          </ActionIcon>
        </Group>
      }
    >
      <Box mx={-12} h={isHidden ? 0 : height} className="overflow-hidden transition-[height] duration-200">
        <Box ref={ref}>
          {data?.map((alert) => {
            const [type, level] = getAlertTypeLevel(alert.code);
            return (
              <Box
                key={alert.alertId}
                className="border-t border-semi-transparent" px="md" py="sm"
                bg={getLevelColor(alert.code.slice(2, 4))}
              >
                <Group spacing="sm">
                  <Text weight="bold">{type}{level}预警</Text>
                  <SimpleBadge>{alert.status}</SimpleBadge>
                </Group>
                <Text>{alert.description}</Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </DataCard>
  );
}

function getAlertType(type: string) {
  switch (type) {
    case '01':
      return '台风';
    case '02':
      return '暴雨';
    case '03':
      return '暴雪';
    case '04':
      return '寒潮';
    case '05':
      return '大风';
    case '06':
      return '沙尘暴';
    case '07':
      return '高温';
    case '08':
      return '干旱';
    case '09':
      return '雷电';
    case '10':
      return '冰雹';
    case '11':
      return '霜冻';
    case '12':
      return '大雾';
    case '13':
      return '霾';
    case '14':
      return '道路结冰';
    case '15':
      return '森林火险';
    case '16':
      return '雷雨大风';
    case '17':
      return '春季沙尘天气趋势';
    case '18':
      return '沙尘';
    default:
      return '未知';
  }
}

function getAlertLevel(level: string) {
  switch (level) {
    case '00':
      return '白色';
    case '01':
      return '蓝色';
    case '02':
      return '黄色';
    case '03':
      return '橙色';
    case '04':
      return '红色';
    default:
      return '';
  }
}

function getLevelColor(level?: string) {
  switch (level) {
    case '00':
      return 'rgba(255,255,255,0.15)';
    case '01':
      return 'rgba(49,101,255,0.15)';
    case '02':
      return 'rgba(250,237,30,0.15)';
    case '03':
      return 'rgba(247,141,25,0.25)';
    case '04':
      return 'rgba(215,47,40,0.25)';
    default:
      return 'transparent';
  }
}

function getAlertTypeLevel(code: string) {
  const type = code.slice(0, 2);
  const level = code.slice(2, 4);
  return [getAlertType(type), getAlertLevel(level)];
}