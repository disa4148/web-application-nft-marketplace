import css from './header.module.scss';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Heart, MessageCircleMore, Wallet } from 'lucide-react';

export default function Authorized(): JSX.Element {
  return (
    <div className={css.authorizedWrapper}>
      <div className={css.leftItems}>
        <div>
          <MessageCircleMore width={24} height={24} />
        </div>
        <div>
          <Heart width={22} height={22} />
        </div>
        <div className={css.wallet}>
          <Wallet width={22} height={20} />
          <p>
            123 <span>ETH</span>
          </p>
        </div>
      </div>
        <Avatar>
          <AvatarImage src="/assets/forTest/cardNft.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
  );
}
