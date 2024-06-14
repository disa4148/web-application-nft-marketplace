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
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <Link href={href}>
        <Image
          className={cn(css.img, 'max-w-[236px] h-[236px]')}
          src={image}
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
            <h4 className="text-1-text-white-100">{formatPrice}</h4>
            <span className="text-1-text-white-100">ETH</span>
          </div>
        </div>
        <div className={css.lastSale}>
          <span className="text-1-text-white-100">{t('lastSale')}</span>
          <h4 className="text-1-text-white-100">{formatPrice}</h4>
          <span className="text-1-text-white-100">ETH</span>
        </div>
        <Link href={href} className={cn(css.lastSaleButton, 'bg-1-gradient')}>
          <button className={css.buyButton}>{t('buy')}</button>
        </Link>
      </div>
    </div>
  );
}
