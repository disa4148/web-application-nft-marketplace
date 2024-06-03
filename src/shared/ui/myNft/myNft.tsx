import css from './myNft.module.scss';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  image: string;
  name: string;
  price: number;
  collectionId: string;
  nftId: string;
};

export default function MyCollections({
  name,
  price,
  image,
  collectionId,
  nftId
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.card');
  const locale = useLocale();
  return (
    <div className={css.wrapper}>
      <Link href={`/${locale}/collections/${collectionId}/${nftId}`}>
        <Image
          src={`${image}`}
          alt="NFT"
          width={237}
          height={154}
        />
      </Link>
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
