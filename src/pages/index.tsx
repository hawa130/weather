import { Inter } from 'next/font/google';
import { AppShell, Container, SimpleGrid, Text } from '@mantine/core';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';
import Data from '@/mock/weather.json';
import { WeatherData } from '@/types/weather';
import HourlyCard from '@/components/HourlyCard';

const inter = Inter({ subsets: ['latin'] });

// @ts-ignore
const mockData = Data as WeatherData;

export default function Home() {
  return (
    <AppShell className={`${inter.className} bg-gradient-blue bg-blue-grey bg-blend-soft-light`}>
      <Container p={0}>
        <CityOverview
          city="西安市长安区"
          temperature={mockData.result.realtime?.temperature}
          highTemperature={mockData.result.daily?.temperature[0].max}
          lowTemperature={mockData.result.daily?.temperature[0].min}
          skycon={mockData.result.realtime?.skycon}
        />
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 700, cols: 2 },
          ]}
          spacing="lg"
          mt="lg"
        >
          <AirQualityCard className="col-span-2" data={mockData.result.realtime?.air_quality} />
          <HourlyCard className="col-span-2" data={mockData.result.hourly} />
        </SimpleGrid>
        <Text align="center" size="sm" mt="lg">
          <span className="opacity-60">数据来源：</span>
          <a className="opacity-60 hover:opacity-100" href="https://www.caiyunapp.com/" target="_blank">彩云天气</a>
        </Text>
      </Container>
    </AppShell>
  );
}
