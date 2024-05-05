'use client';
import css from '../../signIn.module.scss';

import { useTranslations } from 'next-intl';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';

export default function SignInForm(): JSX.Element {
  const t = useTranslations('signIn');
  return (
    <div>
      <Input type="text" placeholder={t('input.login')} />
      <Input type="password" placeholder={t('input.password')} />
      <div>
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t('input.rememberMe')}
        </label>
      </div>
      <Button className={css.styleButton} variant={'default'}>
        {t('buttonSignIn.text')}{' '}
      </Button>
    </div>
  );
}
