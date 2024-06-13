import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import ThemeProvider from '@/shared/lib/Providers';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import Footer from './_components/footer/footer';
import Header from './_components/header/Header';

const noto_Sans = Noto_Sans({ subsets: ['latin'] });

const metadataEn = {
  title: 'NFT JET',
  description:
    'NFT JET is the premier marketplace for digital assets and unique collectibles. Here, creators and collectors alike can trade, sell, and discover one-of-a-kind NFTs. NFT JET offers a seamless, secure, and user-friendly platform for managing your digital portfolio. Join our community to explore a vast universe of digital art, music, virtual real estate, and more, all while enjoying cutting-edge features and unparalleled support.',
    keywords: 'NFT, marketplace, digital assets, collectibles, blockchain, digital art, crypto art, virtual real estate, decentralized, tokens, cryptocurrency, digital portfolio, NFT trading, NFT marketplace, NFT community, rare collectibles, unique NFTs, blockchain technology, digital ownership, crypto collectibles, NFT auction, NFT gallery, NFT creators, NFT collectors, tokenized assets',
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

const metadataRu = {
  title: 'NFT JET',
  description:
    'NFT JET - ведущий маркетплейс для цифровых активов и уникальных коллекционных предметов. Здесь создатели и коллекционеры могут обмениваться, продавать и находить уникальные NFT. NFT JET предлагает бесшовную, безопасную и удобную платформу для управления вашим цифровым портфелем. Присоединяйтесь к нашему сообществу, чтобы исследовать обширную вселенную цифрового искусства, музыки, виртуальной недвижимости и многого другого, наслаждаясь передовыми функциями и непревзойденной поддержкой.',
    keywords: 'NFT, маркетплейс, цифровые активы, коллекционные предметы, блокчейн, цифровое искусство, крипто искусство, виртуальная недвижимость, децентрализованный, токены, криптовалюта, цифровой портфель, торговля NFT, сообщество NFT, редкие коллекционные предметы, уникальные NFT, технология блокчейн, цифровая собственность, крипто коллекционные предметы, аукцион NFT, галерея NFT, создатели NFT, коллекционеры NFT, токенизированные активы',
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

function getMetadata(locale: string) {
  return locale === 'ru' ? metadataRu : metadataEn;
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  const metadata = getMetadata(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {metadata.icons.icon.map((icon) => (
          <link
            key={icon.href}
            rel="icon"
            href={icon.href}
            media={icon.media}
          />
        ))}
      </head>
      <body className={noto_Sans.className}>
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
      </body>
    </html>
  );
}
