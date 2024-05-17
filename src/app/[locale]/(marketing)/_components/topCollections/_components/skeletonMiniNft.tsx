import { Skeleton } from '@/shared/ui/skeleton';
import css from '../../../../../../shared/ui/miniNft/miniNft.module.scss';
export default function SkeletonMiniNft(): JSX.Element {
  return (
    <Skeleton className={css.wrapperSkeleton}>
      <div className={css.leftItems}></div>
      <div className={css.middleItems}>
        <div></div>
        <div></div>
      </div>
      <div className={css.rightItems}>
        <div></div>
        <div></div>
      </div>
    </Skeleton>
  );
}
