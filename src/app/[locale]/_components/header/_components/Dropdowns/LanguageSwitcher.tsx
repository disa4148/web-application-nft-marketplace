'use client';
import css from './Dropdowns.module.scss';

import { Button } from '@/shared/ui/button';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import Cookies from 'js-cookie';
import { cn } from '@/shared/lib/utils';

export default function LanguageSwitcher(): JSX.Element {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const currentLocale = Cookies.get('selectedLocale') || locale || 'ru';

  const switchLocale = () => {
    if (!isPending) {
      startTransition(() => {
        const newLocale = currentLocale === 'ru' ? 'en' : 'ru';
        const newPath = pathname.startsWith(`/${currentLocale}`)
          ? pathname.replace(`/${currentLocale}`, `/${newLocale}`)
          : `/${newLocale}${pathname}`;
        router.replace(newPath);
        Cookies.set('selectedLocale', newLocale);
      });
    }
  };

  return (
    <Button
      onClick={switchLocale}
      variant={'ghost'}
      className={cn(
        css.switcher,
        'text-1-text-black-60 hover:text-1-text-black-70',
      )}
    >
      {currentLocale === 'ru'
        ? t('items.language.eng')
        : t('items.language.rus')}
    </Button>
  );
}
