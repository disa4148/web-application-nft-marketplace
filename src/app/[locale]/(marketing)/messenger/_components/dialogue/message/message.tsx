import css from './message.module.scss';
import Image from 'next/image';

type Props = {
  isMine: boolean;
};

export default function Message({ isMine }: Props) {
  const messageClass = isMine ? css.myMessageBlock : css.otherMessageBlock;
  return (
    <div className={css.wrapper}>
      <div className={css.message}>
        <Image
          width={40}
          height={40}
          src={`/assets/forTest/avatar.png`}
          alt=""
        />
        <div className={messageClass}>
          <h2 >ПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПокПок</h2>
        </div>
      </div>
    </div>
  );
}
