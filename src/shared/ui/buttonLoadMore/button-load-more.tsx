import css from './buttonLoadMore.module.scss';
import Image from 'next/image';
import { Button } from '../button';
import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ButtonLoadMore({
  children,
  onClick,
  disabled,
}: Props): JSX.Element {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant={'outline'}
      className={cn(css.wrapper, 'text-1-text-white-100')}
    >
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
