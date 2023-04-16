import { Inter } from 'next/font/google';
import { AppShell, Container, SimpleGrid, Text } from '@mantine/core';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';
import Data from '@/mock/weather.json';
import { WeatherData } from '@/types/weather';
import HourlyCard from '@/components/HourlyCard';
import WindCard from '@/components/WindCard';
import SunCard from '@/components/SunCard';
import ExtraCard from '@/components/ExtraCard';

const inter = Inter({ subsets: ['latin'] });

// @ts-ignore
const mockData = Data as WeatherData;

export default function Home() {
  return (
    <AppShell className={`${inter.className} bg-gradient-blue bg-blue-grey bg-blend-soft-light`}>
      <Container size="lg" p={0}>
        <CityOverview
          city="西安市长安区"
          temperature={mockData.result.realtime?.temperature}
          highTemperature={mockData.result.daily?.temperature[0].max}
          lowTemperature={mockData.result.daily?.temperature[0].min}
          skycon={mockData.result.realtime?.skycon}
        />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          spacing="lg"
          mt="lg"
        >
          <AirQualityCard data={mockData.result.realtime?.air_quality} />
          <HourlyCard data={mockData.result.hourly} />
          <SimpleGrid cols={2} spacing="lg">
            <WindCard data={mockData.result.realtime?.wind} />
            <SunCard data={mockData.result.daily?.astro[0]} />
          </SimpleGrid>
          <ExtraCard
            data={mockData.result.realtime}
            probability={mockData.result.hourly?.precipitation[0].probability}
          />
        </SimpleGrid>
        <Text align="center" size="sm" mt="lg">
          <span className="opacity-60">数据来源：</span>
          <a className="opacity-60 hover:opacity-100" href="https://www.caiyunapp.com/" target="_blank">彩云天气</a>
        </Text>
      </Container>
    </AppShell>
  );
}
