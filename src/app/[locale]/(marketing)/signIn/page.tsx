'use client';
import { Input } from '@/shared/ui/input';
import css from './signIn.module.scss';
import { useTranslations } from 'next-intl';
import Page from '@/shared/containers/page';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import SignImage from '@/shared/ui/signImage/signImage';

export default function SignUp() {
  const t = useTranslations('signIn');
  return (
    <Page>
      <div className={css.wrapper}>
        <div className={css.signIn}>
          <div>
            <p>{t('header.title')}</p>
            <p>{t('header.description')}</p>
          </div>
          <div>
            <Input type="email" placeholder={t('input.login')} />
            <Input type="email" placeholder={t('input.password')} />
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
              {t('buttonSiUp.text')}{' '}
            </Button>
          </div>
        </div>
        <div className={css.signRight}>
          <SignImage style="light" />
        </div>
      </div>
    </Page>
  );
}
