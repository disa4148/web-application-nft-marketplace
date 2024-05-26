import { cn } from '../lib/utils';
import css from './page.module.scss';

type Props = {
  children: React.ReactNode;
  padding?: boolean;
};

export default function Page({ children, padding, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'bg-light-main-bg-main dark:bg-dark-main-bg-main',
        'flex justify-center',
        padding ? css.padding : '',
      )}
    >
      {children}
    </div>
  );
}
