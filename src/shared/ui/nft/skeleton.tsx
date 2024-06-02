import css from './nft.module.scss';
import { Skeleton } from '../skeleton';
import { useTranslations } from 'next-intl';
import { LoadingSpinner } from '../loading-spinner';
import { cn } from '@/shared/lib/utils';

export default function NftCardSkeleton(): JSX.Element {
  const t = useTranslations('catalogNft.card');
  return (
    <div className={css.wrapper}>
      <div>
        <Skeleton className={cn(css.spinner, "w-[236px] h-[236px] max-w-[236px]")}>
            <LoadingSpinner />
        </Skeleton>
      </div>
      <div className={css.fullBlock}>
        <div className={css.namePrice}>
          <div>
            <Skeleton className={cn(css.skeleton, 'w-24 h-5')}/>
          </div>
          <div className={css.priceBlock}>
          <Skeleton className={cn(css.skeleton, 'w-10 h-5')}/>
            <span>ETH</span>
          </div>
        </div>
        <div className={css.lastSale}>
          <span>{t('lastSale')}</span>
          <Skeleton className={cn(css.skeleton, 'w-8 h-5')}/>
          <span>ETH</span>
        </div>
      </div>
    </div>
  );
}
