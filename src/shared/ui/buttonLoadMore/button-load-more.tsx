import css from './buttonLoadMore.module.scss';
import Image from 'next/image';
import { Button } from '../button';

type Props = {
  children: React.ReactNode;
};

export default function ButtonLoadMore({ children }: Props): JSX.Element {
  return (
    <Button variant={'outline'} className={css.wrapper}>
      {children}
      <Image
        src={'/assets/arrows/top-right-arrow.svg'}
        width={12}
        height={12}
        alt="Arrow"
      />
    </Button>
  );
}
