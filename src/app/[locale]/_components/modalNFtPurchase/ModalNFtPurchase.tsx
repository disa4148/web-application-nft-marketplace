import css from './ModalNFtPurchase.module.scss';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import ModalNftCard from './_components/ModalNftCard';
import ModalNftStats from './_components/ModalNftStats';
import { Button } from '@/shared/ui/button';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;
  image: string;
  title: string;
  description: string;
  price: number;
};

export default function ModalNFtPurchase({
  open,
  setIsOpen,
  children,
  title,
  description,
  image,
  price
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.modal');
  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={css.dialogContent}>
        <DialogHeader>
          <DialogTitle className={css.title}>
            <h1>{t('title')}</h1>
          </DialogTitle>
        </DialogHeader>
        <ModalNftCard image={image} title={title} description={description} />
        <ModalNftStats price={price} networkCommission={0.2} />
        <DialogFooter className={css.footer}>
          <Button className={css.button}>{t('button')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
