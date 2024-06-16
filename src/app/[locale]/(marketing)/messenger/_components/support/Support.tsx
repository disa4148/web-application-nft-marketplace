import css from './Support.module.scss';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

type Props = {
  isActive?: boolean;
  onClick?: () => void;
};

export default function Support({ isActive, onClick }: Props): JSX.Element {
  const t = useTranslations('messenger.support');
  const locale = useLocale();
  return (
    <Link
      href={'https://t.me/nft_support_238'}
      className={`${css.wrapper} ${
        isActive
          ? 'bg-1-bg-black-80 transition-all'
          : 'bg-1-bg-black-100 hover:bg-1-text-black-80 transition-all'
      }`}
      onClick={onClick}
    >
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
        {/* <h2 className="text-1-text-black-60">{t('message')}</h2> */}
      </div>
    </Link>
  );
}
