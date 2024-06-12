import React, { useState, ChangeEvent } from 'react';
import css from './selectBank.module.scss';
import Bank, { BankDetails } from '@/shared/ui/bank/bank';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useQueryConclusionMutation } from '@/shared/redux/payment/replenishment';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

export default function SelectBank() {
  const t = useTranslations('header.dropdown.walletMenu.modalWithdraw');
  const b = useTranslations(
    'header.dropdown.walletMenu.modalReplenish.bankName',
  );

  const initialBank = {
    value: 'card',
    name: b('nameBank'),
    nameExamUp: b('nameExamUp'),
    nameExamDw: `${b('nameExamDw')}(Russia)`,
  };

  const [selectedBank, setSelectedBank] = useState<BankDetails | null>(
    initialBank,
  );
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isWithdrawalImpossible, setIsWithdrawalImpossible] = useState(false);

  const [queryConclusion, { isLoading }] = useQueryConclusionMutation();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);

    if (e.target.value === '0') {
      toast.error(t('amountError'));
    }
  };

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleSubmit = async () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      return;
    }

    console.log(selectedBank);

    const data = {
      amount: amountNumber,
      type: selectedBank?.value,
      recipient: cardNumber,
    };

    try {
      await queryConclusion(data).unwrap();
      setAmount('');
      setCardNumber('');
      console.log(data);
      setIsWithdrawalImpossible(true);
    } catch (e: any) {
      if (e.data && e.data.message) {
        setIsWithdrawalImpossible(true);
        setAmount('');
        setCardNumber('');
      }
    }
  };

  return (
    <div className={css.page}>
      <h1 className="text-1-text-white-100">{t('withdraw')}</h1>
      <div className={css.wrapper}>
        <Bank selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
        <div className={css.sending}>
          <Input
            className={css.input}
            value={amount}
            onChange={handleAmountChange}
            placeholder={t('enterAmount')}
            type="number"
          />
          <Input
            onChange={handleCardChange}
            className={css.input}
            value={cardNumber}
            placeholder={t('accountNumber')}
          />
          <Button
            className={cn(css.button, 'bg-1-gradient')}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? t('loadingButton') : t('withdrawButton')}
          </Button>
          {isWithdrawalImpossible && (
            <p className={css.errorMessage}>{t('failedWith')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
