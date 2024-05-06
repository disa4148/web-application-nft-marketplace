'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from './button';

export default function LocaleSwitcher(): JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  let currentLocale = Cookies.get('selectedLocale') || locale || 'ru';

  if (locale && locale !== currentLocale) {
    currentLocale = locale;
    Cookies.set('selectedLocale', currentLocale);
  }

  const Switcher = (nextLocale: string) => {
    if (!isPending) {
      startTransition(() => {
        const newLocale =
          nextLocale === currentLocale ? currentLocale : nextLocale;
        router.replace(`/${newLocale}`);
        Cookies.set('selectedLocale', newLocale);
      });
    }
  };

  const t = useTranslations('footer');
  return (
    <div>
      <Button
        onClick={() => Switcher('ru')}
        variant={'ghost'}
        disabled={currentLocale === 'ru'}
      >
        {t('items.language.rus')}
      </Button>
      <Button
        onClick={() => Switcher('en')}
        variant={'ghost'}
        disabled={currentLocale === 'en'}
      >
        {t('items.language.eng')}
      </Button>
    </div>
  );
}
