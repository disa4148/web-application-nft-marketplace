import ProfileDropdown from './_components/Dropdowns/ProfileDropdown';
import css from './header.module.scss';

import { Heart, MessageCircleMore, Wallet } from 'lucide-react';

export default function Authorized(): JSX.Element {
  return (
    <div className={css.authorizedWrapper}>
      <div className={css.leftItems}>
        <div className={css.message}>
          <MessageCircleMore width={24} height={24} />
        </div>
        <div className={css.favorite}>
          <Heart width={22} height={22} />
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
