import css from './header.module.scss';
import { cn } from '@/shared/lib/utils';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

import Logotype from '@/shared/ui/logotype';
import SearchInput from '@/shared/ui/searchInput/search-input';
import HeaderLayout from './HeaderLayout';

export default function Header(): JSX.Element {
  const t = useTranslations('header');
  const locale = useLocale();
  return (
    <header className={cn(css.wrapper)}>
      <div className={css.header}>
        <div className={css.leftItems}>
          <Logotype style="light" />
          <Image
            src={'/assets/icons/BurgerMenu.svg'}
            className={css.hiddenBurger}
            alt="Burger Menu"
            width={38}
            height={38}
          />
        </div>
        <div className={css.rightItems}>
          <div className={css.searchInput}>
            <SearchInput placeholder={t('inputPlaceholder')} />
          </div>
          <HeaderLayout />
          <Image
            src={'/assets/icons/BurgerMenu.svg'}
            className={css.burger}
            alt="Burger Menu"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}
