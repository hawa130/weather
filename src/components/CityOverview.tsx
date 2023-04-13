import { Center, Flex, Group, Text } from '@mantine/core';
import { getSkyConText, SkyConType } from '@/types/skycon';
import { Location } from 'tabler-icons-react';

export interface CityOverviewProps {
  city: string;
  highTemperature: number;
  lowTemperature: number;
  temperature: number;
  skycon: SkyConType;
}

export default function CityOverview(
  { city, highTemperature, lowTemperature, temperature, skycon }: CityOverviewProps,
) {
  return (
    <Center py="lg">
      <Flex justify="center" align="center" direction="column">
        <Group spacing="sm">
          <Location size={16} />
          <Text size="xl">{city}</Text>
        </Group>
        <Text weight={500} className="text-[64px] leading-none">
          {temperature}
          <span className="inline-block w-0">°</span>
        </Text>
        <Text>{getSkyConText(skycon)}</Text>
        <Flex gap="sm">
          <Text size="sm">最高 {highTemperature}°</Text>
          <Text size="sm">最低 {lowTemperature}°</Text>
        </Flex>
      </Flex>
    </Center>
  );
}