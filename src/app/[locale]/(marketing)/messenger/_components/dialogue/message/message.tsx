import { cn } from '@/shared/lib/utils';
import css from './message.module.scss';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/store';

type Props = {
  id: string;
  text: string | undefined;
  isMine: boolean;
  ownerEmoji: string;
  myEmoji?: string;
};

export default function Message({
  isMine,
  id,
  text,
  ownerEmoji,
  myEmoji,
}: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={css.wrapper}>
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback className={css.avatarFallback} style={{ fontSize: '25px' }}>
          {isMine ? user?.emoji : ownerEmoji}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          css.message,
          isMine ? 'bg-1-bg-purple-100' : 'bg-1-bg-black-80',
        )}
      >
        <h2>{text}</h2>
      </div>
    </div>
  );
}
