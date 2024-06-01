import css from './infoContainer.module.scss';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/ui/skeleton';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';


export default function SkeletonInfo(): JSX.Element {
  const t = useTranslations('nftCard.infoBlock');

  return (
    <div className={css.infoContainer}>
      <div className={css.topItems}>
        <div className={css.gradientText}>
          <p>{t('status')}</p>
        </div>
      </div>
      <div className={css.title}>
        <Skeleton className='max-w-[250px] h-[35px]'/>
        <Skeleton className='max-w-[500px] h-[250px] rounded-[15px] flex justify-center items-center'> 
          <LoadingSpinner />
        </Skeleton>
      </div>
    </div>
  );
}
