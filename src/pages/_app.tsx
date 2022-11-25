import { ProviderAuth } from '@hooks/useAuth';
import type { AppProps } from 'next/app';
import MainLayout from '@layout/MainLayout';

import '@styles/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}
