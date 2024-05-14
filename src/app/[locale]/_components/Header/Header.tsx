import css from './header.module.scss';
import { cn } from '@/shared/lib/utils';

import { useTranslations, useLocale } from 'next-intl';

import Logotype from '@/shared/ui/logotype';
import SearchInput from '@/shared/ui/searchInput/search-input';

import HeaderLayout from './HeaderLayout';
import BurgerDropdown from './_components/Dropdowns/BurgerDropdown';

export default function Header(): JSX.Element {
  const t = useTranslations('header');
  const locale = useLocale();
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
