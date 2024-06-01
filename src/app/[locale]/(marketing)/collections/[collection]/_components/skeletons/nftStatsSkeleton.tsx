import { Skeleton } from '@/shared/ui/skeleton';
import css from '../../page.module.scss';
import { useTranslations } from 'next-intl';


export default function NftStatsSkeleton(): JSX.Element {
  const t = useTranslations('catalogNft');
  return (
    <div className={css.fullInfo}>
      <div className={css.volume}>
        <Skeleton className='max-w-[140px] h-[30px]'/>
        <p>{t('volume')}</p>
      </div>
      <div className={css.price}>
        <Skeleton className='max-w-[150px] h-[30px]'/>
        <p>{t('minPrice')}</p>
      </div>
      <div className={css.offer}>
        <Skeleton className='max-w-[140px] h-[30px]'/>
        <p>{t('offer')}</p>
      </div>
      <div className={css.owners}>
        <Skeleton className='max-w-[95px] h-[30px]'/>
        <p>{t('owners')}</p>
      </div>
    </div>
  );
}
