import { cn } from '@/shared/lib/utils';
import css from './message.module.scss';
import Image from 'next/image';

type Props = {

    id: string;
    text: string | undefined;
    isMine: boolean;
    // read: boolean;
  
};

export default function Message({ isMine,id,text }: Props) {
  const messageClass = isMine ? css.myMessageBlock : css.otherMessageBlock;
  return (
    <div className={css.wrapper}>
      <Image width={40} height={40} src={`/assets/forTest/avatar.png`} alt="" />
      <div className={messageClass}>
        <h2>{text}</h2>
      </div>
    </div>
  );
}
