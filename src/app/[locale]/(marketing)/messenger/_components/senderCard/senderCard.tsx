import Link from 'next/link';
import css from './senderCard.module.scss';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { cn } from '@/shared/lib/utils';

type Props = {
  avatar?: string;
  name?: string;
  lastMessage: string;
  idChat: string;
  isActive?: boolean;
  onClick?: () => void;
  emoji?: string;
};

export default function SenderCard({
  avatar,
  name,
  lastMessage,
  isActive,
  idChat,
  onClick,
  emoji,
}: Props): JSX.Element {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/messenger/${idChat}`}
      className={`${css.wrapper} ${
        isActive
          ? 'bg-1-bg-black-80 transition-all'
          : 'bg-1-bg-black-100 hover:bg-1-text-black-80 transition-all'
      }`}
      onClick={onClick}
    >
      <div className={cn(css.avatar, "w-[52px] h-[52px] flex justify-center items-center rounded-[9999px]")}>
        <p style={{ fontSize: '30px' }}>{emoji}</p>
      </div>

      <div className={css.senderInfo}>
        <h1 className='text-1-text-white-100'>{name}</h1>
        <h2 className='text-1-text-black-60'>{lastMessage}</h2>
      </div>
    </Link>
  );
}
