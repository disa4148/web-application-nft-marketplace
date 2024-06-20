import css from './myNft.module.scss';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useLocale } from 'next-intl';
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
  nftId,
}: Props): JSX.Element {
  const locale = useLocale();
  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <Link href={`/${locale}/collections/${collectionId}/${nftId}`}>
        <Image
          className={cn(css.img, 'max-w-[236px] h-[236px]')}
          src={`${image}`}
          alt="NFT"
          width={236}
          height={236}
        />
      </Link>
      <div className={css.fullBlock}>
        <div className={css.namePrice}>
          <div>
            <h3 className={cn(css.nameNft, 'text-1-text-white-100')}>{name}</h3>
          </div>
          <div className={css.priceBlock}>
            <h4 className="text-1-text-white-100">{price}</h4>
            <span className="text-1-text-white-100">ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
