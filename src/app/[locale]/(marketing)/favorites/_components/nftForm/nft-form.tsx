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

export default function NftForm(): JSX.Element {
  const t = useTranslations('favorite');
  const locale = useLocale();
  const [nfts, setNfts] = useState<NftData[]>([]);
  const [isLoadingS, setIsLoading] = useState<boolean>(true);

  const accessToken = getAccessToken();
  useEffect(() => {
    fetch('https://nft.levpidoor.ru/api/users/favorite', {
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((dataS) => {
        setIsLoading(false);
        setNfts(dataS as unknown as NftData[]);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={css.cards}>
      {isLoadingS ? (
        <div className="absolute w-[100%] grid place-items-center">
          <LoadingSpinner />
        </div>
      ) : nfts.length > 0 ? (
        nfts.map((item: any, index: any) => (
          <FavoritesNft
            id={item._id}
            collectionId={item.collectionId}
            nfts={nfts}
            setNfts={setNfts}
            key={index}
            name={item.name}
            price={item.price}
            total={item.total}
            imageCatalog={item.image_url}
          />
        ))
      ) : (
        <div className={cn(css.empty, "absolute w-[100%] grid place-items-center")}>
          <h1>{t('empty')}</h1>
          <Link href={`/${locale}`}>
            <Button className={css.coloredBtn} variant={'default'}>
              {t('button')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
