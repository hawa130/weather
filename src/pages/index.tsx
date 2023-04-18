import { Inter } from 'next/font/google';
import { AppShell, Container, SimpleGrid, Text } from '@mantine/core';
import useSWR from 'swr';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';
import { WeatherData } from '@/types/weather';
import HourlyCard from '@/components/HourlyCard';
import WindCard from '@/components/WindCard';
import SunCard from '@/components/SunCard';
import ExtraCard from '@/components/ExtraCard';
import DailyCard from '@/components/DailyCard';
import { getWeatherBg } from '@/utils/weather';
import axios from 'axios';
import { fetchWeatherData } from '@/pages/api/weather';
import { useEffect, useMemo, useState } from 'react';
import { getLocation } from '@/utils/location';
import { GeolocationError, ReGeocodeResult } from '@/types/location';
import { notifications, Notifications } from '@mantine/notifications';
import MinutelyCard from '@/components/MinuatelyCard';
import AlertCard from '@/components/AlertCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ initData, AMapKey }: { initData?: WeatherData, AMapKey: string }) {
  const [coord, setCoord] = useState<string>();
  const [locating, setLocating] = useState<boolean>(false);

  const { data } = useSWR<WeatherData>(
    coord ? ['/api/weather', coord] : null,
    async ([url, coord]: [string, string | undefined]) => (await axios.get(url, { params: { coord } })).data,
    // To use mock data: async () => await import('../mock/weather.json').then((res) => res.default) as WeatherData,
    { fallbackData: initData },
  );

  const { data: geoData, isLoading: geoFetching } = useSWR<ReGeocodeResult>(
    coord ? ['/api/geocode', coord] : null,
    async ([url, coord]: [string, string | undefined]) => (await axios.get(url, { params: { coord } })).data,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const handleGetLocation = () => {
    setLocating(true);
    getLocation(AMapKey)
      .then((result) => {
        setCoord(result.position.toString());
      })
      .catch((err: GeolocationError) => notifications.show({
        radius: 'md',
        color: 'red',
        title: '定位失败',
        message: err.message,
        styles: (theme) => ({
          root: {
            backgroundColor: 'rgba(50, 50, 50, 0.3)',
            borderColor: 'rgba(200, 200, 200, 0.17)',
            backdropFilter: 'blur(8px)',
          },
          description: {
            color: theme.white,
            opacity: 0.8,
          },
        }),
      }))
      .finally(() => setLocating(false));
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const city = useMemo(() => {
    if (geoData?.regeocode?.addressComponent) {
      const district = geoData.regeocode.addressComponent.district;
      const cityData = geoData.regeocode.addressComponent.city;
      const city = Array.isArray(cityData) ? geoData.regeocode.addressComponent.province : cityData;
      return `${city}${district}`;
    }
    return undefined;
  }, [geoData]);

  const street = useMemo(() => {
    if (geoData?.regeocode?.addressComponent) {
      return geoData.regeocode.addressComponent.streetNumber.street;
    }
    return undefined;
  }, [geoData]);

  return (
    <AppShell className={`${inter.className} bg-fixed ${getWeatherBg(data?.result?.realtime?.skycon)}`}>
      <Container size="lg" p={0}>
        <CityOverview
          city={city}
          street={street}
          temperature={data?.result?.realtime?.temperature}
          highTemperature={data?.result?.daily?.temperature[0].max}
          lowTemperature={data?.result?.daily?.temperature[0].min}
          skycon={data?.result?.realtime?.skycon}
          geoLoading={locating || geoFetching}
          onGetLocation={handleGetLocation}
        />
        {data?.result?.alert?.content.length ? (
          <AlertCard mt={16} data={data?.result?.alert?.content} />
        ) : null}
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          spacing="lg"
          mt="lg"
        >
          <SimpleGrid cols={1} spacing="lg">
            <MinutelyCard data={data?.result?.minutely} description={data?.result?.minutely?.description} />
            <AirQualityCard data={data?.result?.realtime?.air_quality} />
          </SimpleGrid>
          <HourlyCard data={data?.result?.hourly} />
          <DailyCard className="col-span-1" data={data?.result?.daily} />
          <SimpleGrid cols={1} spacing="lg">
            <SimpleGrid cols={2} spacing="lg">
              <WindCard data={data?.result?.realtime?.wind} />
              <SunCard data={data?.result?.daily?.astro[0]} />
            </SimpleGrid>
            <ExtraCard
              data={data?.result?.realtime}
              probability={data?.result?.hourly?.precipitation[0].probability}
            />
          </SimpleGrid>
        </SimpleGrid>
        <Text align="center" size="sm" mt="lg">
          <span className="opacity-60">数据来源：</span>
          <a className="opacity-60 hover:opacity-100" href="https://www.caiyunapp.com/" target="_blank">彩云天气</a>
        </Text>
      </Container>
      <Notifications position="top-right" />
    </AppShell>
  );
}

export async function getServerSideProps() {
  const data = await fetchWeatherData();
  const AMapKey = process.env.AMAP_JS_KEY;
  return {
    props: { initData: data, AMapKey },
  };
}