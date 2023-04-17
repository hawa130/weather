import { Box, Container, Flex, Group, Stack, Text } from '@mantine/core';
import { getSkyConText, SkyConType } from '@/types/skycon';
import { ChevronDown, ChevronUp, Location } from 'tabler-icons-react';
import WeatherIcon from '@/components/WeatherIcon';

export interface CityOverviewProps {
  city?: string;
  street?: string;
  highTemperature?: number;
  lowTemperature?: number;
  temperature?: number;
  skycon?: SkyConType;
  onGetLocation?: () => void;
  geoLoading?: boolean;
}

export default function CityOverview(
  { city, street, highTemperature, lowTemperature, temperature, skycon, onGetLocation, geoLoading }: CityOverviewProps,
) {
  return (
    <Container
      pt={16} pb={64} px={48}
      className="rounded-lg max-w-md"
    >
      <Group position="center" className="cursor-pointer" onClick={geoLoading ? undefined : onGetLocation} mb={64}>
        <Group spacing="sm">
          <Location size={14} />
          <Text className="whitespace-nowrap">{city ?? (geoLoading ? '定位中...' : '------')}</Text>
        </Group>
        <Text className="whitespace-nowrap">{geoLoading && city ? '定位中...' : street}</Text>
      </Group>
      <Group position="apart">
        <Stack spacing="xs" align="center">
          {skycon ? <WeatherIcon className="w-14 h-14" skycon={skycon} /> : <Box className="w-14 h-14" />}
          <Text>{skycon ? getSkyConText(skycon) : '--'}</Text>
        </Stack>
        <Flex justify="center" align="center" direction="column">
          <Text weight={500} className="text-[58px] leading-none">
            {temperature?.toFixed(0) ?? '--'}
            <span className="inline-block w-0">°</span>
          </Text>
          <Flex gap="md">
            <Flex align="center" gap="xs">
              <ChevronUp size={16} />
              <Text className="whitespace-nowrap">{highTemperature?.toFixed(0) ?? '--'}℃</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <ChevronDown size={16} />
              <Text className="whitespace-nowrap">{lowTemperature?.toFixed(0) ?? '--'}℃</Text>
            </Flex>
          </Flex>
        </Flex>
      </Group>
    </Container>
  );
}