import css from './offers.module.scss';

import { Separator } from '@/shared/ui/separator';
import { offerItems } from './offersItems';

import { useTranslations } from 'next-intl';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

export default function SkeletonOffers(): JSX.Element {
  const t = useTranslations('nftCard.tabs.offers');
  return (
    <div className={css.wrapper}>
      <div>
        <h3>{t('title')}</h3>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className={css.skeletonScroll}>
        <LoadingSpinner className='h-[240px]'/>
      </div>
    </div>
  );
}
