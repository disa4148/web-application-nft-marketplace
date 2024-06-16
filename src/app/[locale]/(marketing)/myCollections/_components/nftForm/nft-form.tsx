'use client';
import css from './nftForm.module.scss';
import MyCollections from '@/shared/ui/myNft/myNft';

import { useGetMyCollectionQuery } from '@/shared/redux/features/nftApi';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import { useEffect } from 'react';

export default function NftForm(): JSX.Element {
  const { data: myCollection, refetch } = useGetMyCollectionQuery();
  const t = useTranslations('myCollection');
  const locale = useLocale();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={css.cards}>
      {myCollection && myCollection.length > 0 ? (
        myCollection.map((item, index) => (
          <MyCollections
            key={index}
            nftId={item.nft._id}
            collectionId={item.nft.collectionId}
            name={item.nft.name}
            price={item.nft.price}
            image={item.nft.image_url}
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
