import css from './ModalNFtPurchase.module.scss';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';
import { useTranslations } from 'next-intl';
import ModalNftCard from './_components/ModalNftCard';
import { Button } from '@/shared/ui/button';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;
};

export default function ModalNFtPurchase({
  open,
  setIsOpen,
  children,
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
        <ModalNftCard />
        <div className={css.stats}>
          <div className={css.statsItem}>
            <div>
              <h2>{t('price.title')}</h2>
              <h2>1000 ETH</h2>
            </div>
            <div>
              <h4>{t('price.description')}</h4>
            </div>
          </div>
          <div className={css.statsItem}>
            <div>
              <h2>{t('networkCommission.title')}</h2>
              <h2>0,02 ETH</h2>
            </div>
            <div>
              <h4>{t('networkCommission.description')}</h4>
            </div>
          </div>
        </div>
        <div className={css.separator}>
          <Separator orientation="horizontal" decorative />
        </div>
        <div className={css.total}>
          <h2>{t('total')}</h2>
          <h2>1000,02 ETH</h2>
        </div>
        <DialogFooter className={css.footer}>
          <Button className={css.button}>{t('button')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
