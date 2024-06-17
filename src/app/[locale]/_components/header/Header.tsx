import css from './header.module.scss';
import { cn } from '@/shared/lib/utils';

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import ServerLogotype from '@/shared/ui/serverLogotype';
import SearchInput from '@/shared/ui/searchInput/search-input';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

import BurgerDropdown from './_components/Dropdowns/BurgerDropdown';
import { ComboBox } from '@/shared/ui/comboBox/combo-box';

const HeaderLayout = dynamic(() => import('./HeaderLayout'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function Header(): JSX.Element {
  const t = useTranslations('header');
  return (
    <header className={cn(css.wrapper)}>
      <div className={css.header}>
        <div className={css.leftItems}>
          <ServerLogotype />
        </div>
        <div className={css.rightItems}>
          <div className={css.searchInput}>
            <ComboBox />
          </div>
          <HeaderLayout />
          <BurgerDropdown />
        </div>
      </div>
    </header>
  );
}
