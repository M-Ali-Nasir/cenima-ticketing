import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  // Hydration fix: only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="BigScreenBiz - Cinema Management System" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <div className="font-sans antialiased">
        {isClient && <Component {...pageProps} />}
      </div>
    </>
  );
}

export default MyApp; 