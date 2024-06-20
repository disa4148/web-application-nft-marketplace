'use client';
import Image from 'next/image';
import { useGetMirrorsQuery } from '../redux/features/mirrorApi';
import Link from 'next/link';
import { LoadingSpinner } from './loading-spinner';
import { useLocale } from 'next-intl';

export default function ServerLogotype(): JSX.Element {
  const locale = useLocale();
  const { data, isLoading, error } = useGetMirrorsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Failed to load logotype:', error);
  }

  return (
    <Link href={`/${locale}`}>
      {data?.logo ? (
        <Image alt="Logotype" src={data.logo} width={157} height={24} />
      ) : (
        <div>Logotype</div>
      )}
    </Link>
  );
}
