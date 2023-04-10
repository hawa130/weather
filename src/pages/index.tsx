import { Inter } from 'next/font/google';
import { AppShell, Container } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <AppShell>
      <Container p={0}>
        App
      </Container>
    </AppShell>
  );
}
