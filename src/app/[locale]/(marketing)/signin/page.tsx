import css from './signIn.module.scss';
import { cn } from '@/shared/lib/utils';

import { useTranslations } from 'next-intl';
import Page from '@/shared/containers/page';

import SignImage from '@/shared/ui/signImage/SignImage';
import SignInSkeleton from './_components/skeleton';

import dynamic from 'next/dynamic';

const SignInForm = dynamic(() => import('./_components/form/SignInForm'), {
  ssr: false,
  loading: () => <SignInSkeleton />
});

export default function SignUp(): JSX.Element {
  const t = useTranslations('signIn');
  return (
    <Page padding>
      <div className={css.wrapper}>
        <div className={cn(css.signIn, 'bg-1-bg-black-100')}>
          <div>
            <p className='text-1-text-white-100'>{t('header.title')}</p>
            <p className='text-1-text-white-100'>{t('header.description')}</p>
          </div>
          <SignInForm />
        </div>
        <div className={css.signRight}>
          <SignImage style="light" />
        </div>
      </div>
    </Page>
  );
}
