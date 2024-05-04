import css from './aboutService.module.scss';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

export default function AboutService(): JSX.Element {
  const t = useTranslations('home.aboutOurService')
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <div>
          <h3>
            {t('description')}
          </h3>
          <Button>{t('btn')}</Button>
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
