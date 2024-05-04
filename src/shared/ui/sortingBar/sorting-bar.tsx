import css from './sortingBar.module.scss';

import { useTranslations } from 'next-intl';

export default function SortingBar(): JSX.Element {
  const t = useTranslations('home.topCollections.sortingBar')
  return (
    <div className={css.wrapper}>
      <div className={css.active}>
        <p>{t('1day')}</p>
      </div>
      <div>
        <p>{t('7days')}</p>
      </div>
      <div>
        <p>{t('30days')}</p>
      </div>
      <div>
        <p>{t('allTime')}</p>
      </div>
    </div>
  );
}
