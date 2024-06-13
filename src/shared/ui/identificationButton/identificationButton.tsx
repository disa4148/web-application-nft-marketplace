import { Button } from '../button';

type Props = {
  children: React.ReactNode;
};

export default function IdentificationButton({ children }: Props): JSX.Element {
  return (
    <Button className="bg-1-bg-blue-100 text-1-text-white-100">
      {children}
    </Button>
  );
}
