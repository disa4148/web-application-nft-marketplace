import { Skeleton } from '@/shared/ui/skeleton';
import css from './skeletons.module.scss';

export default function NftInfoSkeleton(): JSX.Element {
  return (
    <div className={css.nftInfoSkeleton}>
      <Skeleton className='w-40 h-9'/>
      <Skeleton className='w-40 h-6'/>
    </div>
  );
}
