import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.levpidoor.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.meebits.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'opepenai.nyc3.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixelmon-training-rewards.s3-accelerate.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nftmedia.parallelnft.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'miladymaker.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'remilio.org', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'elementals-images.azuki.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.memeland.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.larvalabs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'metadata.degods.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.pudgypenguins.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'captainz-api.memeland.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cryptopunks.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'clonex-assets.rtfkt.com',
        pathname: '/**',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
