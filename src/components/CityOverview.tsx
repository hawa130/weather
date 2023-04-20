import { Box, Container, Flex, Group, Loader, Stack, Text } from '@mantine/core';
import { getSkyConText, SkyConType } from '@/types/skycon';
import { ChevronDown, ChevronUp, Location } from 'tabler-icons-react';
import WeatherIcon from '@/components/WeatherIcon';
import { useMemo } from 'react';

export interface CityOverviewProps {
  city?: string;
  street?: string;
  fallbackCity?: string;
  highTemperature?: number;
  lowTemperature?: number;
  temperature?: number;
  skycon?: SkyConType;
  onGetLocation?: () => void;
  locating?: boolean;
  geoLoading?: boolean;
  weatherValidating?: boolean;
  showLocationIcon?: boolean;
}

export default function CityOverview(
  {
    city,
    street,
    fallbackCity,
    highTemperature,
    lowTemperature,
    temperature,
    skycon,
    onGetLocation,
    locating,
    geoLoading,
    weatherValidating,
    showLocationIcon,
  }: CityOverviewProps,
) {
  const statusText = useMemo(() => {
    if (locating) return '定位中...';
    if (geoLoading) return '获取位置信息...';
    return undefined;
  }, [locating, geoLoading]);

  return (
    <Container
      pt={4} pb={64} px={48}
      className="rounded-lg max-w-md"
    >
      <Group
        title="切换地点"
        position="center"
        className="cursor-pointer rounded-lg hover:bg-semi-transparent active:bg-semi-transparent-dark transition-colors"
        onClick={onGetLocation}
        py="md" mb={52}
      >
        {locating || geoLoading || weatherValidating
          ? <Loader size="xs" color="white" />
          : showLocationIcon ? <Location size={16} /> : null}
        <Text className="whitespace-nowrap">{statusText ?? (city || fallbackCity) ?? '选择地点'}</Text>
        <Text className="whitespace-nowrap">{statusText ? undefined : street}</Text>
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