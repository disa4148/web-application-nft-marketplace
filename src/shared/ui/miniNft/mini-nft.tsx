'use client';
import css from './miniNft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  image?: string;
  name: string;
  price?: number;
  total?: number;
  percentage?: number;
};

export default function MiniNft({
  name,
  percentage,
  price,
  total,
  image,
}: Props): JSX.Element {
  const t = useTranslations('home.topCollections.cards');
  return (
    <div className={css.wrapper}>
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
            <h4>{t('price')}</h4>
            <h4>{price} ETH</h4>
          </div>
        </div>
        <div className={css.priceInfo}>
          <h4>{total} ETH</h4>
          <p>+{percentage}%</p>
        </div>
      </div>
      {/* <div className={css.middleItems}>
        <div>
          <h3>{name}</h3>
         
        </div>
        <div>
          
        </div>
      </div>
      <div className={css.rightItems}>
        <div>
          <h4>{total}</h4>
          <span></span>
        </div>
        <div>
        </div>
      </div> */}
    </div>
  );
}
