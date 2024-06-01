import { Skeleton } from '@/shared/ui/skeleton';
import css from './Avatar.module.scss';
import { LoadingSpinner } from '../loading-spinner';

export default function SkeletonAvatar(): JSX.Element {
  return (
    <Skeleton className={`${css.avatar} ${css.skeleton}`}>
        <LoadingSpinner />
    </Skeleton>
  );
}
