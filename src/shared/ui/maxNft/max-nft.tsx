import css from './maxNft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Props = {
  imageCatalog: string;
  name: string;
  price: number;
  total: number;
};

export default function MaxNft({
  name,
  price,
  total,
  imageCatalog,
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.card');
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={css.wrapper} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <div>
        <Image
          src={`/assets/forTest/${imageCatalog}`}
          alt="NFT"
          width={237}
          height={154}
        />
      </div>
      <div className={css.fullBlock}>
        <div className={css.namePrice}>
          <div>
            <h3 className={css.nameNft}>{name}</h3>
          </div>
          <div className={css.priceBlock}>
            <h4>{price}</h4>
            <span>ETH</span>
          </div>
        </div>
        {isHovered ? (<div className={css.lastSaleButton}> <button className={css.buyButton}>{t('buy')}</button> </div>
        ) : (
        <div className={css.lastSale}>
          <span>{t('lastSale')}</span>
          <h4>{total}</h4>
          <span>ETH</span>
        </div>
        )}
      </div>
    </div>
  );
}