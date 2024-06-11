import css from './title.module.scss';
import { cn } from '@/shared/lib/utils';

type Props = {
  title: string;
};

export default function Title({ title }: Props): JSX.Element {
  return (
    <h1 className={cn(css.title, 'text-1-text-white-100')}>{title}</h1>
  );
}
