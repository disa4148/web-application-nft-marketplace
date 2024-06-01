import { LoadingSpinner } from '../loading-spinner';
import { Skeleton } from '../skeleton';
import css from './Banner.module.scss';

export default function SkeletonBanner(): JSX.Element {
  return (
    <Skeleton className={`${css.banner} ${css.skeleton}`}>
      <LoadingSpinner />
    </Skeleton>
  );
}
