import css from './message.module.scss';
import Image from 'next/image';

type Props = {
  isMine: boolean;
};

export default function Message({ isMine }: Props) {
  const messageClass = isMine ? css.myMessageBlock : css.otherMessageBlock;
  return (
    <div className={css.wrapper}>
      <Image width={40} height={40} src={`/assets/forTest/avatar.png`} alt="" />
      <div className={messageClass}>
        <h2>Привет дружище, я бы хотел купить у тебя дозу бошек на раскумар, раскидай там вообще что как, грамчик сколько стоить будет? Ну и прояснить бы хотелось?</h2>
      </div>
    </div>
  );
}
