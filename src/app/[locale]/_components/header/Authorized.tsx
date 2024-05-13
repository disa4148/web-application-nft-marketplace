import css from './header.module.scss';

import Link from 'next/link';

import ProfileDropdown from './_components/Dropdowns/ProfileDropdown';
import { Heart, MessageCircleMore, Wallet } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function Authorized(): JSX.Element {
  const locale = useLocale();
  return (
    <div className={css.authorizedWrapper}>
      <div className={css.leftItems}>
        <div className={css.message}>
          <MessageCircleMore width={24} height={24} />
        </div>
        <div className={css.favorite}>
          <Link href={`/${locale}/favoritesNft`}>
            <Heart width={22} height={22} />
          </Link>
        </div>
        <div className={css.wallet}>
          <Wallet width={22} height={20} />
          <p>
            123 <span>ETH</span>
          </p>
        </div>
      </div>
      <ProfileDropdown />
    </div>
  );
}
