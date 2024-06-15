'use client';
import css from './header.module.scss';

import Link from 'next/link';

import ProfileDropdown from './_components/Dropdowns/ProfileDropdown';
import { Heart, MessageCircleMore } from 'lucide-react';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { UserData } from '@/shared/lib/localstorage';
import WalletDropdown from './_components/Dropdowns/WalletDropdown';
import { cn } from '@/shared/lib/utils';
import { useDispatch } from 'react-redux';
import { setUser } from '@/shared/redux/slices/authSlice';

type Props = {
  user: UserData;
};

export default function Authorized({ user }: Props): JSX.Element {
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className={css.authorizedWrapper}>
      <div className={css.leftItems}>
        <div
          className={`${cn(css.message, 'bg-1-text-black-80')} ${
            isActive(`/${locale}/messenger`) ? 'bg-1-gradient' : ''
          }`}
        >
          <Link href={`/${locale}/messenger`}>
            <MessageCircleMore width={24} height={24} />
          </Link>
        </div>
        <div
          className={`${cn(css.favorite, 'bg-1-text-black-80')} ${
            isActive(`/${locale}/favorites`) ? 'bg-1-gradient' : ''
          }`}
        >
          <Link href={`/${locale}/favorites`}>
            <Heart width={22} height={22} />
          </Link>
        </div>
        <div className={css.wallet}>
          <WalletDropdown balance={user.balance} />
        </div>
      </div>
      <ProfileDropdown emoji={user.emoji} />
    </div>
  );
}
