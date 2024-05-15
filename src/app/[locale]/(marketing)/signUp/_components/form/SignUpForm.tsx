'use client';
import css from '../../signUp.module.scss';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function SignUpForm(): JSX.Element {
  const t = useTranslations('signUp');
  const locale = useLocale();
  return (
    <div>
      <Input type="text" placeholder={t('input.login')} />
      <Input type="email" placeholder={t('input.mail')} />
      <div>
        <Input
          className={css.passwordInput}
          type="password"
          placeholder={t('input.password')}
        />
        <Input
          className={css.repeatPassword}
          type="password"
          placeholder={t('input.repeatPassword')}
        />
      </div>
      <Input type="text" placeholder={t('input.promocode')} />
      <Button className={css.styleButton} variant={'default'}>
        {t('buttonSignUp.text')}{' '}
      </Button>
      <div className={css.linkSignIn}>
        <h1>{t('linkSignIn.text')}</h1>
        <Link className={css.link} href={`/${locale}/signIn`}>{t('linkSignIn.button')}</Link>
      </div>
    </div>
  );
}
