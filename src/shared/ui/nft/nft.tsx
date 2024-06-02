import css from './nft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useFormatNumber } from '@/shared/lib/hooks/useFormatNumber';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

type Props = {
  image: string;
  name: string;
  price: number;
  total: number;
  href: string;
};

export default function Nft({
  name,
  price,
  total,
  image,
  href,
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.card');
  const formatPrice = useFormatNumber(price);
  return (
    <Link href={href} className={css.wrapper}>
      <div>
        <Image
          className={cn(css.img, 'max-w-[236px] h-[236px]')}
          src={image}
          alt="NFT"
          width={236}
          height={236}
        />
      </div>
      <div className={css.fullBlock}>
        <div className={css.namePrice}>
          <div>
            <h3 className={css.nameNft}>{name}</h3>
          </div>
          <div className={css.priceBlock}>
            <h4>{formatPrice}</h4>
            <span>ETH</span>
          </div>
        </div>
        <div className={css.lastSale}>
          <span>{t('lastSale')}</span>
          <h4>{formatPrice}</h4>
          <span>ETH</span>
        </div>
        <div className={css.lastSaleButton}>
          <button
            onClick={() => console.log('Button clicked')}
            className={css.buyButton}
          >
            {t('buy')}
          </button>
        </div>
      </div>
    </Link>
  );
}
