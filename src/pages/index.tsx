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
import axios, { AxiosResponse } from 'axios';
import { fetchWeatherData } from '@/pages/api/weather';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ initData, key }: { initData?: WeatherData, key: string }) {
  const { data: axiosData } = useSWR<AxiosResponse<WeatherData>>('/api/weather', axios.get);
  const data = axiosData?.data ?? initData;

  return (
    <AppShell className={`${inter.className} bg-fixed ${getWeatherBg(data?.result?.realtime?.skycon)}`}>
      <Container size="lg" p={0}>
        <CityOverview
          city="西安市长安区"
          temperature={data?.result?.realtime?.temperature}
          highTemperature={data?.result?.daily?.temperature[0].max}
          lowTemperature={data?.result?.daily?.temperature[0].min}
          skycon={data?.result?.realtime?.skycon}
        />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          spacing="lg"
          mt="lg"
        >
          <AirQualityCard data={data?.result?.realtime?.air_quality} />
          <HourlyCard data={data?.result?.hourly} />
          <SimpleGrid cols={2} spacing="lg">
            <WindCard data={data?.result?.realtime?.wind} />
            <SunCard data={data?.result?.daily?.astro[0]} />
          </SimpleGrid>
          <ExtraCard
            data={data?.result?.realtime}
            probability={data?.result?.hourly?.precipitation[0].probability}
          />
          <DailyCard className="col-span-1" data={data?.result?.daily} />
        </SimpleGrid>
        <Text align="center" size="sm" mt="lg">
          <span className="opacity-60">数据来源：</span>
          <a className="opacity-60 hover:opacity-100" href="https://www.caiyunapp.com/" target="_blank">彩云天气</a>
        </Text>
      </Container>
    </AppShell>
  );
}

export async function getServerSideProps() {
  const data = await fetchWeatherData();
  const amapKey = process.env.AMAP_KEY;
  return {
    props: { initData: data, key: amapKey },
  };
}