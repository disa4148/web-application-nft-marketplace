'use client';
import css from './deregisterModal.module.scss';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';
import { useDeregisterNftMutation } from '@/shared/redux/features/nftApi';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { cn } from '@/shared/lib/utils';

type Props = {
  nftId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onDeregisterSuccess: () => void; 
  refetchNftData: () => void; 
  children: React.ReactNode;
};

export default function DeregisterModal({
  open,
  setIsOpen,
  children,
  nftId,
  onDeregisterSuccess,
  refetchNftData, 
}: Props): JSX.Element {
  const t = useTranslations('nftCard.modals.deregister');
  const [deregister, { isLoading }] = useDeregisterNftMutation();

  const handleDeregisterNft = async () => {
    toast.loading(t('messages.loading'));
    try {
      await deregister({ nftId }).unwrap();
      toast.success(t('messages.success'));
      onDeregisterSuccess();
      refetchNftData(); 
      setIsOpen(false);
    } catch (e: any) {
      if (e.data && e.data.message) {
        toast.error(e.data.message);
      }
    } finally {
      toast.dismiss();
    }
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn(css.dialogContent)}>
        <DialogHeader>
          <DialogTitle className={css.title}>
            <h1>{t('title')}</h1>
          </DialogTitle>
        </DialogHeader>
        <div className={css.content}>
          <Button className={cn(css.coloredBtn, 'bg-1-gradient')} onClick={() => setIsOpen(false)}>
            {t('no')}
          </Button>
          <Button onClick={handleDeregisterNft} className={css.removeBtn}>
            {isLoading ? <LoadingSpinner /> : t('yes')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
