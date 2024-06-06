'use client';
import css from './saleModal.module.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';

import { useSaleNftMutation } from '@/shared/redux/features/nftApi';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import { useEffect, useState } from 'react';

type Props = {
  nftId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;
};

export default function SaleModal({
  open,
  setIsOpen,
  children,
  nftId,
}: Props): JSX.Element {
  const t = useTranslations('nftCard.modals.sale');
  const [rubPrice, setRubPrice] = useState<string>('');
  const [ethPrice, setEthPrice] = useState<string>('');
  const [ethToRubRate, setEthToRubRate] = useState<number>(0);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);

  const [saleNft, { isLoading }] = useSaleNftMutation();

  useEffect(() => {
    async function fetchExchangeRates() {
      setIsLoadingRates(true);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=rub'
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
            <LoadingSpinner />
        ) : (
          <div className={css.content}>
            <div className={css.inputs}>
              <Input
                type="number"
                placeholder={t('placeholders.inRub')}
                value={rubPrice}
                onChange={handleRubChange}
              />
              <p>~</p>
              <Input
                type="number"
                placeholder={t('placeholders.inETH')}
                value={ethPrice}
                onChange={handleEthChange}
              />
            </div>
            <Button onClick={handleSaleNft} className={css.btn}>
              {isLoading ? <LoadingSpinner /> : t('btn')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
