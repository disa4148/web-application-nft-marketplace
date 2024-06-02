import { Skeleton } from '@/shared/ui/skeleton';
import css from '../../ModalNFtPurchase.module.scss';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

export default function SkeletonNftCard(): JSX.Element {
  return (
    <div className={css.cardWrapper}>
        <Skeleton className='w-[63px] h-[63px] flex justify-center items-center'>
            <LoadingSpinner />
        </Skeleton>
      <div>
        <Skeleton className={css.skeletonTitle}/>
        <Skeleton className={css.skeletonDescription}/>
      </div>
    </div>
  );
}
