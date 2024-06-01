import { Skeleton } from '@/shared/ui/skeleton';
import css from '../../page.module.scss';
import { useTranslations } from 'next-intl';

export default function NftInfoSkeleton(): JSX.Element {
  const t = useTranslations('catalogNft');
  return (
    <div className={css.users}>
      <div>
        <div>
          <Skeleton className={css.skeletonCollection}/>
        </div>
        <div>
          <Skeleton className={css.skeletonOwner}/>
        </div>
      </div>
      <div>
        <Skeleton className={css.skeletonDescription}/>
        <div className={css.underInfo}>
          <div className={css.items}>
            <p>{t('items')}</p>
            <Skeleton className={css.skeletonItems}/>
          </div>
          <div className={css.dateCreate}>
            <p>{t('dateCreated')}</p>
            <Skeleton className={css.skeletonDate}/>
          </div>
          <div className={css.network}>
            <p>{t('network')}</p>
            <Skeleton className={css.skeletonNetwork}/>
          </div>
        </div>
      </div>
    </div>
  );
}
