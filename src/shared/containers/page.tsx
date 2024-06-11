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
        '',
        'flex justify-center',
        padding ? css.padding : '',
      )}
    >
      {children}
    </div>
  );
}
