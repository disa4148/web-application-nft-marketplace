'use client';
import css from './saleModal.module.scss';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';

import { useSaleNftMutation } from '@/shared/redux/features/nftApi';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { useExchangeRate } from '@/shared/containers/exchangeRateContext';

type Props = {
  nftId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaleSuccess: () => void; 
  refetchNftData: () => void; 
  open: boolean;
  children: React.ReactNode;
};

export default function SaleModal({
  open,
  setIsOpen,
  children,
  nftId,
  onSaleSuccess,
  refetchNftData
}: Props): JSX.Element {
  const t = useTranslations('nftCard.modals.sale');
  const [rubPrice, setRubPrice] = useState<string>('');
  const [ethPrice, setEthPrice] = useState<string>('');
  const { ethToRubRate, isLoadingRates } = useExchangeRate();

  const [saleNft, { isLoading }] = useSaleNftMutation();

  const handleSaleNft = async () => {
    const ethPriceNumber = parseFloat(ethPrice);
    if (isNaN(ethPriceNumber)) {
      toast.error(t('messages.invalidPrice'));
      return;
    }
    toast.loading(t('messages.loading'));
    try {
      await saleNft({ nftId, price: ethPriceNumber }).unwrap();
      toast.success(t('messages.success'));
      onSaleSuccess();
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

  const handleRubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rubValue = event.target.value;
    setRubPrice(rubValue);
    if (rubValue && ethToRubRate !== null) {
      const ethValue = (parseFloat(rubValue) / ethToRubRate).toFixed(6);
      setEthPrice(ethValue);
    } else {
      setEthPrice('');
    }
  };

  const handleEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ethValue = event.target.value;
    setEthPrice(ethValue);
    if (ethValue && ethToRubRate !== null) {
      const rubValue = (parseFloat(ethValue) * ethToRubRate).toFixed(2);
      setRubPrice(rubValue);
    } else {
      setRubPrice('');
    }
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn(css.dialogContent)}>
        <DialogHeader>
          <DialogTitle className={css.title}>
            <h1 className="text-1-text-white-100">{t('title')}</h1>
          </DialogTitle>
        </DialogHeader>
        {isLoadingRates || ethToRubRate === null ? (
          <div className={css.spinner}>
           <p>{t('messages.curseLoading')}</p>
           <LoadingSpinner />
         </div>
        ) : (
          <div className={css.content}>
            <div className={css.inputs}>
              <Input
                 onKeyPress={(event) => {
                  // Allow only numbers and comma
                  const allowedKeys = [
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
                  ];
                  if (!allowedKeys.includes(event.key)) {
                    event.preventDefault();
                  }
                }}
                placeholder={t('placeholders.inRub')}
                value={rubPrice}
                onChange={handleRubChange}
              />
              <p className="text-1-text-white-100">~</p>
              <Input
                 onKeyPress={(event) => {
                  // Allow only numbers and comma
                  const allowedKeys = [
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
                  ];
                  if (!allowedKeys.includes(event.key)) {
                    event.preventDefault();
                  }
                }}
                placeholder={t('placeholders.inETH')}
                value={ethPrice}
                onChange={handleEthChange}
              />
            </div>
            <Button
              onClick={handleSaleNft}
              className={cn(css.btn, 'bg-1-gradient text-1-text-white-100')}
            >
              {isLoading ? <LoadingSpinner /> : t('btn')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
