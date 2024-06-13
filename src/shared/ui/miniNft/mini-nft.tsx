'use client';
import React, { useState } from 'react';
import css from './miniNft.module.scss';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useFormatNumber } from '@/shared/lib/hooks/useFormatNumber';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

type Props = {
  id: string;
  image: string;
  name: string;
  totalPrice: number;
  lowestPrice: number;
};

export default function MiniNft({
  id,
  name,
  totalPrice = 0,
  lowestPrice = 0,
  image,
}: Props) {
  const t = useTranslations('home.topCollections.cards');
  const locale = useLocale();
  const formatTotalPrice = useFormatNumber(totalPrice);
  const formatLowestPrice = useFormatNumber(lowestPrice);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  if (hasError) {
    return null;
  }

  return (
    <Link
      href={`/${locale}/collections/${id}`}
      className={cn(css.wrapper, 'bg-1-bg-black-90')}
    >
      <div className={cn(css.image, 'bg-1-bg-black-100')}>
        <Image
          src={`${image}`}
          alt="NFT"
          width={65}
          height={60}
          onError={handleImageError}
        />
      </div>
      <div className={cn(css.content, 'text-1-text-white-100')}>
        <div className={css.info}>
          <div className={css.name}>
            <h3 className="text-1-text-white-100">{name}</h3>
            <Image
              src={'/assets/icons/verified.svg'}
              alt="Verified"
              width={11}
              height={11}
            />
          </div>
          <div className={css.price}>
            <h4 className="text-1-text-black-70">{t('price')}</h4>
            <h4 className="text-1-text-black-70">{formatTotalPrice} ETH</h4>
          </div>
        </div>
        <div className={css.priceInfo}>
          <h4 className="text-1-text-white-100">{formatLowestPrice} ETH</h4>
        </div>
      </div>
    </Link>
  );
}
