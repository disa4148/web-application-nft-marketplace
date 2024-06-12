import React, { useState, ChangeEvent } from 'react';
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
}

export default function SelectBank({
  changeTab,
  setSelectedBank,
  selectedBank,
}: Props) {

const t = useTranslations("header.dropdown.walletMenu")

  const [amount, setAmount] = useState('');

  const [createReplenishment, { isLoading }] = useCreateReplenishmentMutation();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      console.error('Сумма должна быть числом');
      return;
    }

    if (!selectedBank) {
      console.error('Банк не выбран');
      return;
    }

    const data = {
      amount: amountNumber,
      type: selectedBank.value,
    };

   

    try {
      await createReplenishment(data).unwrap();
      toast.success('Успешно отправлено');
      console.log(data);
      changeTab('examination');
    } catch (err) {
      console.log("Ошибка:", err)
      toast.error('Ошибка при отправке');
    }
  };

  return (
    <div className={css.page}>
      <h1>{t("replenish")}</h1>
      <div className={css.wrapper}>
        <Bank selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
        <div className={css.sending}>
          <Input
            className={css.input}
            value={amount}
            onChange={handleAmountChange}
            placeholder={t("modalReplenish.enterAmount")}
            type="number"
          />
          <Button
            className={cn(css.button, 'bg-1-gradient')}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? t("modalReplenish.loadingButton") : t("modalReplenish.replenishButton")}
          </Button>
        </div>
      </div>
    </div>
  );
}
