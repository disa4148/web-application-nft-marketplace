'use client';
import css from './miniNft.module.scss';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useFormatNumber } from '@/shared/lib/hooks/useFormatNumber';
import Link from 'next/link';

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
}: Props): JSX.Element {
  const t = useTranslations('home.topCollections.cards');
  const locale = useLocale();
  const formatTotalPrice = useFormatNumber(totalPrice);
  const formatLowestPrice = useFormatNumber(lowestPrice);
  return (
    <Link href={`/${locale}/collections/${id}`} className={css.wrapper}>
      <div className={css.image}>
        <Image src={`${image}`} alt="NFT" width={65} height={60} />
      </div>
      <div className={css.content}>
        <div className={css.info}>
          <div className={css.name}>
            <h3>{name}</h3>
            <Image
              src={'/assets/icons/verified.svg'}
              alt="Verified"
              width={11}
              height={11}
            />
          </div>
          <div className={css.price}>
            <h4 className='text-light-text-black-70'>{t('price')}</h4>
            <h4 className='text-light-text-black-70'>{formatTotalPrice} ETH</h4>
          </div>
        </div>
        <div className={css.priceInfo}>
          <h4>{formatLowestPrice} ETH</h4>
        </div>
      </div>
    </Link>
  );
}
