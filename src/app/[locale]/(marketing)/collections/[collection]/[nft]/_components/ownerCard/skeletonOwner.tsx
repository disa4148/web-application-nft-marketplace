import { Skeleton } from '@/shared/ui/skeleton';
import css from './OwnerCard.module.scss';
import Image from 'next/image';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

export default function SkeletonOwner(): JSX.Element {
  return (
    <div className={css.wrapper}>
      <div className={css.item}>
        <Skeleton className="w-[50px] h-[50px] flex justify-center items-center">
          <LoadingSpinner className="max-w-[45px] h-[45px]" />
        </Skeleton>
        <div>
          <Skeleton className={css.skeletonTitle}/>
          <div>
            <Skeleton className={css.skeletonContent}/>
          </div>
        </div>
      </div>
    </div>
  );
}
