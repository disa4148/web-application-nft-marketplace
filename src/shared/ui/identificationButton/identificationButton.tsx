import css from './identificationButton.module.scss';
import { Button } from '../button';
import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
};

export default function IdentificationButton({ children }: Props): JSX.Element {
  return (
    <Button className={cn(css.button, 'bg-1-bg-blue-100 text-1-text-white-100')}>
      {children}
    </Button>
  );
}
