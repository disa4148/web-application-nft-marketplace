import css from './miniNft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  image: string;
  name: string;
  price: number;
  total: number;
  percentage: number;
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
      <div className={css.leftItems}>
        <Image
          src={`/assets/forTest/${image}`}
          alt="NFT"
          width={65}
          height={60}
        />
      </div>
      <div className={css.middleItems}>
        <div>
          <h3>{name}</h3>
          <Image
            src={'/assets/icons/verified.svg'}
            alt="Verified"
            width={11}
            height={11}
          />
        </div>
        <div>
          <h4>{t('price')}</h4>
          <h4 className={css.price}>{price}</h4>
          <span>ETH</span>
        </div>
      </div>
      <div className={css.rightItems}>
        <div>
          <h4>{total}</h4>
          <span>ETH</span>
        </div>
        <div>
          <p>+{percentage}%</p>
        </div>
      </div>
    </div>
  );
}
