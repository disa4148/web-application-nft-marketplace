'use client';
import css from './underHeader.module.scss';

import { useTranslations, useLocale } from 'next-intl';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import IdentificationButton from '@/shared/ui/identificationButton/identificationButton';
import SearchInput from '@/shared/ui/searchInput/search-input';
import { RootState } from '@/shared/redux/store';

export default function UnderHeader() {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const t = useTranslations('header');
  const locale = useLocale();
  return isSignedIn ? null : (
    <div className={css.wrapper}>
      <Link href={`/${locale}/signin`}>
        <IdentificationButton>{t('IdentificationButton')}</IdentificationButton>
      </Link>
      <div className={css.searchInput}>
        <SearchInput placeholder={t('AbbreviatedPlaceholderName')} />
      </div>
    </div>
  );
}
