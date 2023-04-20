import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hanwan Weather</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <script src="/iconfont.js" />
      </Head>

      <MantineProvider
        withGlobalStyles
        theme={{
          /** Put your mantine theme override here */
          spacing: {
            xs: '.25rem',  // 4px
            sm: '.5rem',   // 8px
            md: '.75rem',  // 12px
            lg: '1rem',    // 16px
            xl: '1.25rem', // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.75rem', // 28px
            '4xl': '2rem',    // 32px
          },
          colorScheme: 'dark',
          colors: {
            dark: [
              '#ffffff',
              '#C1C2C5',
              '#A6A7AB',
              '#909296',
              '#5C5F66',
              '#2C2E33',
              '#25262B',
              '#1A1B1E',
              '#141517',
              '#101113',
            ],
            white: [
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF',
            ],
          },
          ...inter.style,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
