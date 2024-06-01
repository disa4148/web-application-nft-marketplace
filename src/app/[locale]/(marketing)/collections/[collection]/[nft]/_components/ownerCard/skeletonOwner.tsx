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
          <Skeleton style={{
            width: '55px',
            height: '15px',
          }}/>
          <div>
            <Skeleton  style={{
            width: '150px',
            height: '20px'
          }}/>
          </div>
        </div>
      </div>
    </div>
  );
}
