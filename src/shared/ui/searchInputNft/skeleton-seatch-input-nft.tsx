import css from './searchInputNft.module.scss';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '../skeleton';

export default function SkeletonSearchInputNft(): JSX.Element {
  return (
    <div className={cn(css.skeletonWrapper, 'bg-1-bg-black-80')}>
      <Skeleton className='rounded-[15px]'/>
    </div>
  );
}
