import { Inter } from 'next/font/google';
import { AppShell, Container, SimpleGrid } from '@mantine/core';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';

const inter = Inter({ subsets: ['latin'] });

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
        <SimpleGrid cols={4} spacing="lg" mt="lg">
          {Array.from({ length: 11 }, (_, index) => index * 50).map((val) => (
            <AirQualityCard key={val} aqi={val} />
          ))}
        </SimpleGrid>
      </Container>
    </AppShell>
  );
}
