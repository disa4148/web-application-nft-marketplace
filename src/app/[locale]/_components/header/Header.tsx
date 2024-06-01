import css from './header.module.scss';
import { cn } from '@/shared/lib/utils';

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import Logotype from '@/shared/ui/logotype';
import SearchInput from '@/shared/ui/searchInput/search-input';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

import BurgerDropdown from './_components/Dropdowns/BurgerDropdown';

const HeaderLayout = dynamic(() => import('./HeaderLayout'), {
  ssr: false,
  loading: () => <LoadingSpinner/>,
});

export default function Header(): JSX.Element {
  const t = useTranslations('header');
  return (
    <header className={cn(css.wrapper)}>
      <div className={css.header}>
        <div className={css.leftItems}>
          <Logotype style="light" />
        </div>
        <div className={css.rightItems}>
          <div className={css.searchInput}>
            <SearchInput placeholder={t('inputPlaceholder')} />
          </div>
          <HeaderLayout />
          <BurgerDropdown />
        </div>
      </div>
    </header>
  );
}
