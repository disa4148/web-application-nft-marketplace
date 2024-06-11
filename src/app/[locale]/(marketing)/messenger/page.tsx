import css from './messenger.module.scss';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

export default function Messenger(): JSX.Element {
  const t = useTranslations('messenger');
  return (
    <div className={cn(css.welcomeWrapper, 'bg-1-bg-black-100')}>
      <div className={cn(css.welcome, 'bg-1-gradient')}>
        <h1 className='text-1-text-white-100'>{t('welcome')}</h1>
      </div>
    </div>
  );
}
