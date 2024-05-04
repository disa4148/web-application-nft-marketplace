import css from './header.module.scss';
import { cn } from '@/shared/lib/utils';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Logotype from '@/shared/ui/logotype';
import SearchInput from '@/shared/ui/searchInput/search-input';
import { Button } from '@/shared/ui/button';

export default function Header(): JSX.Element {
  const t = useTranslations('header');
  return (
    <header className={cn(css.wrapper)}>
      <div className={css.header}>
        <div className={css.leftItems}>
          <Logotype style="light" />
        </div>
        <div className={css.rightItems}>
          <SearchInput />
          <Button variant={'ghost'}>{t('signUpBtn')}</Button>
          <Button className={css.coloredBtn} variant={'default'}>
            {t('signInBtn')}
          </Button>
          <Image
            src={'/assets/icons/BurgerMenu.svg'}
            alt="Burger Menu"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}
