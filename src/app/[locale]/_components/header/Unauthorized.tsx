import css from './header.module.scss';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';

import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/shared/lib/utils';

export default function Unauthorized(): JSX.Element {
  const t = useTranslations('header');
  const locale = useLocale();
  return (
    <>
      <Link
        className={cn(css.btnLink, 'text-1-text-white-100')}
        href={`/${locale}/signup`}
      >
        <Button className="text-1-text-white-100" variant={'ghost'}>
          {t('signUpBtn')}
        </Button>
      </Link>
      <Link
        className={cn(css.coloredBtnLink, 'text-1-text-white-100')}
        href={`/${locale}/signin`}
      >
        <Button
          className={cn(css.coloredBtn, 'bg-1-gradient')}
          variant={'default'}
        >
          {t('signInBtn')}
        </Button>
      </Link>
    </>
  );
}
