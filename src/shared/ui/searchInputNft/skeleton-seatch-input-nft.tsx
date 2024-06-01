import css from './searchInputNft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Skeleton } from '../skeleton';

export default function SkeletonSearchInputNft(): JSX.Element {
  return (
    <div className={css.skeletonWrapper}>
      <Skeleton className='rounded-[15px]'/>
    </div>
  );
}
