'use client';
import { cn } from '@/shared/lib/utils';
import css from './modalPromocode.module.scss';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useActivePromoMutation } from '@/shared/redux/features/promocodeApi';
import { toast } from 'sonner';
import { useState, useCallback } from 'react';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children?: React.ReactNode;
};

export default function ModalPromocode({ open, setIsOpen, children }: Props) {
  const t = useTranslations(
    'header.dropdown.walletMenu.promocode.modalPromocode',
  );
  const [active, { isLoading }] = useActivePromoMutation();
  const [promocode, setPromocode] = useState('');

  const handleActivePromo = useCallback(async () => {
    toast.loading(t('messages.loading'));
    try {
      await active({ promocode }).unwrap();
      toast.success(t('messages.success'));
      setIsOpen(false);
    } catch (e: any) {
      if (e.data && e.data.message) {
        toast.error(e.data.message);
      }
    } finally {
      toast.dismiss();
    }
  }, [active, promocode, t, setIsOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  }, []);

  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn(css.dialogContent, 'max-w-[581px]')}>
        <h1 className="text-1-text-white-100">{t('title')}</h1>
        <Input
          className={css.input}
          type="text"
          placeholder={t('placeholder')}
          value={promocode}
          onChange={handleChange}
        />
        <Button
          className="bg-1-gradient"
          onClick={handleActivePromo}
          disabled={isLoading}
        >
          {t('btn')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
