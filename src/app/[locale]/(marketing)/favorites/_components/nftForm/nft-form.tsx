'use client';
import css from './nftForm.module.scss';
import FavoritesNft, { NftData } from '@/shared/ui/favoritesNft/favoritesNft';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getAccessToken } from '@/shared/lib/cookie';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useGetFavoritesQuery } from '@/shared/redux/features/favoriteApi';

export default function NftForm(): JSX.Element {
  const t = useTranslations('favorite');
  const locale = useLocale();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, isError, refetch } = useGetFavoritesQuery();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      refetch()
    }
    if (isError) {
      setError(new Error('Failed to fetch collections'));
      setIsLoading(false);
    }
  }, [data, isError]);
  return (
    <div className={css.cards}>
      {isLoading ? (
        <div className="absolute w-[100%] grid place-items-center">
          <LoadingSpinner />
        </div>
      ) : data.length > 0 ? (
        data.map((item: any, index: any) => (
          <FavoritesNft
            refetchNftData={refetch}
            id={item._id}
            collectionId={item.collectionId}
            nfts={data}
            key={index}
            name={item.name}
            price={item.price}
            total={item.total}
            imageCatalog={item.image_url}
          />
        ))
      ) : (
        <div
          className={cn(css.empty, 'absolute w-[100%] grid place-items-center')}
        >
          <h1 className="text-1-text-white-100">{t('empty')}</h1>
          <Link href={`/${locale}`}>
            <Button
              className={cn(css.coloredBtn, 'bg-1-gradient')}
              variant={'default'}
            >
              {t('button')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
