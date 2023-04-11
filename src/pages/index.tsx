import { Inter } from 'next/font/google';
import { AppShell, Box, Container } from '@mantine/core';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <AppShell className={inter.className}>
      <Container p={0}>
        <CityOverview
          city="西安市"
          temperature={20}
          highTemperature={29}
          lowTemperature={12}
          skycon="PARTLY_CLOUDY_NIGHT"
        />
        <Box className="grid grid-cols-2 gap-3" mt="lg">
          <AirQualityCard />
        </Box>
      </Container>
    </AppShell>
  );
}
