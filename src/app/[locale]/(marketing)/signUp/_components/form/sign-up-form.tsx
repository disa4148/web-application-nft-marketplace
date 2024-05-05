'use client';
import css from '../../signUp.module.scss';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useTranslations } from 'next-intl';

export default function SignUpForm(): JSX.Element {
  const t = useTranslations('signUp');
  return (
    <div>
      <Input type="text" placeholder={t('input.login')} />
      <Input type="email" placeholder={t('input.mail')} />
      <div>
        <Input
          className="w-[190px]"
          type="password"
          placeholder={t('input.password')}
        />
        <Input
          className="w-[190px]"
          type="password"
          placeholder={t('input.repeatPassword')}
        />
      </div>
      <Input type="text" placeholder={t('input.promocode')} />
      <Button className={css.styleButton} variant={'default'}>
        {t('buttonSignUp.text')}{' '}
      </Button>
    </div>
  );
}
