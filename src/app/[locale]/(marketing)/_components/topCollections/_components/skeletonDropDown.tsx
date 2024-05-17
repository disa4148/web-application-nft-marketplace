import { Skeleton } from '@/shared/ui/skeleton';
import css from '../../../../../../shared/ui/dropdown/dropdown.module.scss';
import Image from 'next/image';
export default function SkeletonDropDown(): JSX.Element {
  return (
    <Skeleton className={css.dropdown}>
      <Skeleton>
        <button className={css.dropdownToggle}>
          <Skeleton />
        </button>
      </Skeleton>
      <Skeleton>
        <Skeleton />
      </Skeleton>
    </Skeleton>
  );
}
