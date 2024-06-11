'use client';
import Image from 'next/image';
import { useGetMirrorsQuery } from '../redux/features/mirrorApi';
import Link from 'next/link';
import { LoadingSpinner } from './loading-spinner';

export default function ServerLogotype(): JSX.Element {
  const { data, isLoading, error } = useGetMirrorsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Failed to load logotype:', error);
  }

  return (
    <Link href={'/'}>
      {data?.logo ? (
        <Image alt="Logotype" src={data.logo} width={157} height={24} />
      ) : (
        <div>No logo available</div>
      )}
    </Link>
  );
}
