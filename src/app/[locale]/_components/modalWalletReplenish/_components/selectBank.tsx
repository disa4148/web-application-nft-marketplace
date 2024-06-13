import React, { useState } from 'react';
import css from './selectBank.module.scss';
import Bank, { BankDetails } from '@/shared/ui/bank/bank';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useCreateReplenishmentMutation } from '@/shared/redux/payment/replenishment';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface Props {
  changeTab: React.Dispatch<React.SetStateAction<string>>;
  selectedBank: BankDetails | null;
  setSelectedBank: React.Dispatch<React.SetStateAction<BankDetails | null>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectBank({
  changeTab,
  setSelectedBank,
  selectedBank,
  setId
}: Props) {
  const t = useTranslations('header.dropdown.walletMenu');

  const [createReplenishment, { isLoading }] = useCreateReplenishmentMutation();

  const [amount, setAmount] = useState('');

  const inputValue = (e: any) => {
    const inputValue = e.target.value;
    const onlyNumbers = inputValue.replace(/[^0-9]/g, '');
    if (onlyNumbers === '' || onlyNumbers.startsWith('0')) {
      setAmount('');
    } else {
      setAmount(onlyNumbers);
    }
  };

  const handleSubmit = async () => {
    if (!selectedBank) {
      return;
    }

    const amountValue = parseInt(amount, 10);

    if (amountValue < 1000) {
      toast.error(t('modalReplenish.toastMessage.errorValue'));
      return;
    }

    const data = {
      amount: amount,
      type: selectedBank.value,
    };

    try {
     const id = await createReplenishment(data).unwrap();
     setId(id._id)
      toast.success(t('modalReplenish.toastMessage.succesRep'));
      changeTab('examination');
    } catch (err) {
      toast.error(t('modalReplenish.toastMessage.errorSent'));
    }
  };

  return (
    <div className={css.page}>
      <h1>{t('replenish')}</h1>
      <div className={css.wrapper}>
        <Bank selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
        <div className={css.sending}>
          <Input
            className={css.input}
            value={amount}
            placeholder={t('modalReplenish.enterAmount')}
            onChange={inputValue}
          />
          <Button
            className={cn(css.button, 'bg-1-gradient')}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading
              ? t('modalReplenish.loadingButton')
              : t('modalReplenish.replenishButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}
