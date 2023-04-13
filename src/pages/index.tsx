import { Inter } from 'next/font/google';
import { AppShell, Container, SimpleGrid } from '@mantine/core';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';
import Data from '@/mock/weather.json';
import { WeatherData } from '@/types/weather';

const inter = Inter({ subsets: ['latin'] });

// @ts-ignore
const mockData = Data as WeatherData;

export default function Home() {
  return (
    <AppShell className={`${inter.className} bg-gradient-blue bg-blue-grey bg-blend-soft-light`}>
      <Container p={0}>
        <CityOverview
          city="西安市"
          temperature={20}
          highTemperature={29}
          lowTemperature={12}
          skycon="PARTLY_CLOUDY_NIGHT"
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
        </SimpleGrid>
      </Container>
    </AppShell>
  );
}
