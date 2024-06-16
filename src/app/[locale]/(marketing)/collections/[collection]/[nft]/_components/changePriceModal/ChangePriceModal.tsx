'use client';
import css from './changePriceModal.module.scss';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';

import { useChangeNftPriceMutation } from '@/shared/redux/features/nftApi';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import { useEffect, useState } from 'react';

type Props = {
  nftId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchNftData: () => void;
  open: boolean;
  children: React.ReactNode;
  price: number;
};

export default function ChangePriceModal({
  open,
  setIsOpen,
  children,
  nftId,
  price,
  refetchNftData
}: Props): JSX.Element {
  const t = useTranslations('nftCard.modals.changePrice');
  const [rubPrice, setRubPrice] = useState<string>('');
  const [ethPrice, setEthPrice] = useState<string>('');
  const [ethToRubRate, setEthToRubRate] = useState<number>(0);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);

  const [changePrice, { isLoading }] = useChangeNftPriceMutation();

  useEffect(() => {
    async function fetchExchangeRates() {
      setIsLoadingRates(true);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=rub',
        );
        const data = await response.json();
        const rate = data['ethereum']['rub'];
        setEthToRubRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setIsLoadingRates(false);
      }
    }

    fetchExchangeRates();
  }, []);

  const handleChangePrice = async () => {
    const ethPriceNumber = parseFloat(ethPrice);
    if (isNaN(ethPriceNumber)) {
      toast.error(t('messages.invalidPrice'));
      return;
    }
    toast.loading(t('messages.loading'));
    try {
      await changePrice({ nftId, price: ethPriceNumber }).unwrap();
      toast.success(t('messages.success'));
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
    if (rubValue) {
      const ethValue = (parseFloat(rubValue) / ethToRubRate).toFixed(6);
      setEthPrice(ethValue);
    } else {
      setEthPrice('');
    }
  };

  const handleEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ethValue = event.target.value;
    setEthPrice(ethValue);
    if (ethValue) {
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
            <h1>{t('title')}</h1>
          </DialogTitle>
        </DialogHeader>
        {isLoadingRates ? (
          <div className={css.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={css.content}>
            <h2>{t('currentPrice')} {price} ETH</h2>
            <div className={css.inputs}>
              <Input
                placeholder={t('placeholders.inRub')}
                value={rubPrice}
                onChange={handleRubChange}
                onKeyPress={(event) => {
                  // Allow only numbers and comma
                  const allowedKeys = [
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',',
                  ];
                  if (!allowedKeys.includes(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <p>~</p>
              <Input
                placeholder={t('placeholders.inETH')}
                value={ethPrice}
                onChange={handleEthChange}
                onKeyPress={(event) => {
                  // Allow only numbers and comma
                  const allowedKeys = [
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',',
                  ];
                  if (!allowedKeys.includes(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <Button onClick={handleChangePrice} className={cn(css.btn, 'bg-1-gradient')}>
              {isLoading ? <LoadingSpinner /> : t('btn')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
