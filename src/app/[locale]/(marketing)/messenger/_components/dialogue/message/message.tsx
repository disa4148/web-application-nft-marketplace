import { cn } from '@/shared/lib/utils';
import css from './message.module.scss';
import Image from 'next/image';

type Props = {
  isMine: boolean;
};

export default function Message({ isMine }: Props) {
  const messageClass = isMine
    ? cn(css.message, 'bg-1-bg-purple-100')
    : cn(css.message, 'bg-1-bg-black-80');
  return (
    <div className={css.wrapper}>
      <Image width={40} height={40} src={`/assets/forTest/avatar.png`} alt="" />
      <div className={messageClass}>
        <h2 className='text-1-text-white-100'>
          Привет дружище, как дела купить хочу!Привет дружище, как дела купить
          хочу!Привет дружище, как дела купить хочу!Привет дружище, как дела
          купить хочу!Привет дружище, как дела купить хочу!
        </h2>
      </div>
    </div>
  );
}
