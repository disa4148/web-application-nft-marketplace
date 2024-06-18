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
      toast.error(t('onlyNumber'));
      return;
    }

    const cardNumberNumber = parseFloat(cardNumber);

    if (isNaN(cardNumberNumber)) {
      toast.error(t('onlyNumber'));
      return;
    }

    const data = {
      amount: amountNumber,
      type: selectedBank?.value,
      recipient: cardNumber,
    };

    try {
      const response = await queryConclusion(data);
      const { status, message } = response.data;

      if (status === false) {
        setIsWithdrawalImpossible(true);
      } else {
        toast.success(message);
        setAmount('');
        setCardNumber('');
        setIsWithdrawalImpossible(false);
      }
    } catch (e: any) {
      if (!e.response) {
        toast.error(t('errorMoney'));
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
            onKeyPress={(event) => {
              const allowedKeys = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                ',',
              ];
              if (!allowedKeys.includes(event.key)) {
                event.preventDefault();
              }
            }}
            className={css.input}
            value={amount}
            onChange={handleAmountChange}
            placeholder={t('enterAmount')}
          />
          <Input
            onKeyPress={(event) => {
              const allowedKeys = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                ',',
              ];
              if (!allowedKeys.includes(event.key)) {
                event.preventDefault();
              }
            }}
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
