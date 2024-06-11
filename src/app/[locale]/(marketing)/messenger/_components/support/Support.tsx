import css from './Support.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

export default function Support(): JSX.Element {
  const t = useTranslations('messenger.support');
  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-100')}>
      <div className={cn(css.avatarContainer, 'bg-1-gradient')}>
        <Image
          src={`/assets/icons/headphones.svg`}
          width={28}
          height={28}
          alt="Avatar"
        />
      </div>
      <div className={css.senderInfo}>
        <h1 className="text-1-text-white-100">{t('name')}</h1>
        <h2 className="text-1-text-black-60">{t('message')}</h2>
      </div>
    </div>
  );
}
