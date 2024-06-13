import css from './aboutService.module.scss';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutService(): JSX.Element {
  const t = useTranslations('home.aboutOurService');
  const locale = useLocale();
  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <div className={css.content}>
        <div>
          <h3 className='text-1-text-white-100'>
            {t('description')}
          </h3>
          <Link href={`/${locale}`}>
            <Button className='bg-1-gradient'>{t('btn')}</Button>
          </Link>
        </div>
        <div>
          <Image
            src={'/assets/illustrations/homeIllustration.png'}
            alt="Home Illustration"
            width={750}
            height={450}
          />
        </div>
      </div>
    </div>
  );
}
