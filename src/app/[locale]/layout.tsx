import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import ThemeProvider from '@/shared/lib/Providers';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import Footer from './_components/footer/footer';
import Header from './_components/header/Header';
import { getTranslations } from 'next-intl/server';
import { SocketProvider } from '@/shared/containers/socketProvider';

const noto_Sans = Noto_Sans({ subsets: ['latin'] });

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('layout.title'),
    description: t('layout.description'),
    icons: {
      icon: [
        {
          media: '(prefers-color-scheme: light)',
          url: '/logo-dark.svg',
          href: '/logo-dark.svg',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/logo-light.svg',
          href: '/logo-light.svg',
        },
      ],
    },
  };
}
export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={noto_Sans.className}>
        <SocketProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
