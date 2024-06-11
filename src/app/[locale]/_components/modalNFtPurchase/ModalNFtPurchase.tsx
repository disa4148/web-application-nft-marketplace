'use client';
import css from './ModalNFtPurchase.module.scss';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';
import dynamic from 'next/dynamic';
import SkeletonNftCard from './_components/skeletons/skeletonNftCard';

import { useBuyNftMutation } from '@/shared/redux/features/nftApi';
import { toast } from 'sonner';
import ModalNftStats from './_components/ModalNftStats';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { cn } from '@/shared/lib/utils';

type Props = {
  nftId: string;
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
  price,
  nftId,
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.modal');

  const ModalNftCard = dynamic(() => import('./_components/ModalNftCard'), {
    ssr: false,
    loading: () => <SkeletonNftCard />,
  });

  const [buyNft, { isLoading }] = useBuyNftMutation();

  const handleBuyNft = async () => {
    toast.loading(t('messages.loading'));
    try {
      await buyNft({ nftId }).unwrap();
      toast.success(t('messages.success'));
      setIsOpen(false)
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
      <DialogContent className={css.dialogContent}>
        <DialogHeader>
          <DialogTitle className={css.title}>
            <h1 className='text-1-text-white-100'>{t('title')}</h1>
          </DialogTitle>
        </DialogHeader>
        <ModalNftCard image={image} title={title} description={description} />
        <ModalNftStats price={price} networkCommission={0.2} />
        <DialogFooter className={css.footer}>
          <Button onClick={handleBuyNft} className={cn(css.button, 'bg-1-gradient')}>
            {isLoading ? <LoadingSpinner /> : t('button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
