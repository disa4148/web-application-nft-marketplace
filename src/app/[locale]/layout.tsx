import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/shared/lib/Providers';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Test title',
  description:
    'test description',
  keywords:
    'test keywords',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logotype.svg',
        href: '/logotype.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logotype dark.svg',
        href: '/logotype dark.svg',
      },
    ],
  },
};

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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
