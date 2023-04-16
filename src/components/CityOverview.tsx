import { Center, Flex, Group, Text } from '@mantine/core';
import { getSkyConText, SkyConType } from '@/types/skycon';
import { ChevronDown, ChevronUp, Location } from 'tabler-icons-react';

export interface CityOverviewProps {
  city?: string;
  highTemperature?: number;
  lowTemperature?: number;
  temperature?: number;
  skycon?: SkyConType;
}

export default function CityOverview(
  { city, highTemperature, lowTemperature, temperature, skycon }: CityOverviewProps,
) {
  return (
    <Center py={64}>
      <Flex justify="center" align="center" direction="column">
        <Group spacing="sm">
          <Location size={16} />
          <Text size="xl">{city ?? '--'}</Text>
        </Group>
        <Text weight={500} className="text-[64px] leading-none">
          {temperature?.toFixed(0) ?? '--'}
          <span className="inline-block w-0">°</span>
        </Text>
        <Text>{skycon ? getSkyConText(skycon) : '--'}</Text>
        <Flex gap="md">
          <Flex align="center" gap="xs">
            <ChevronUp size={16} />
            <Text size="sm" className="whitespace-nowrap">{highTemperature?.toFixed(0) ?? '--'}℃</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <ChevronDown size={16} />
            <Text size="sm" className="whitespace-nowrap">{lowTemperature?.toFixed(0) ?? '--'}℃</Text>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}