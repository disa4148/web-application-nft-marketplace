import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.seadn.io',
      'remilio.org',
      'elementals-images.azuki.com',
      'ipfs.io',
      'api.memeland.com',
      'www.larvalabs.com',
      'metadata.degods.com',
      'api.pudgypenguins.io',
      'captainz-api.memeland.com'
    ],
  },
};

export default withNextIntl(nextConfig);
