import css from './myNft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  image: string;
  name: string;
  price: number;
};


export default function MyCollections({
  name,
  price,
  image,
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.card');

  return (
    <div className={css.wrapper}>
      <div>
        <Image
          src={`${image}`}
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
      </div>
    </div>
  );
}
