import { Separator } from '@/shared/ui/separator';
import { useTranslations } from 'next-intl';
import css from '../../ModalNFtPurchase.module.scss';
import { Skeleton } from '@/shared/ui/skeleton';



export default function SkeletonNftStats(): JSX.Element {
  const t = useTranslations('catalogNft.modal');
  return (
    <>
      <div className={css.stats}>
        <div className={css.statsItem}>
          <div>
            <h2>{t('price.title')}</h2>
            <Skeleton className='w-[205px] h-[25px]'/>
          </div>
          <div>
            <h4>{t('price.description')}</h4>
          </div>
        </div>
        <div className={css.statsItem}>
          <div>
            <h2>{t('networkCommission.title')}</h2>
            <Skeleton className='w-[60px] h-[25px]'/>
          </div>
          <div>
            <h4>{t('networkCommission.description')}</h4>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className={css.total}>
        <h2>{t('total')}</h2>
        <Skeleton className='w-[205px] h-[25px]'/>
      </div>
    </>
  );
}
