import React, { useState, ChangeEvent } from 'react';
import css from './selectBank.module.scss';
import Bank from '@/shared/ui/bank/bank';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useQueryConclusionMutation } from '@/shared/redux/payment/replenishment';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';

export default function SelectBank() {
  const [selectedBank, setSelectedBank] = useState('card');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const [queryConclusion, { isLoading }] = useQueryConclusionMutation();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleSubmit = async () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      toast.error('Сумма должна быть числом');
      return;
    }

    const data = {
      amount: amountNumber,
      type: selectedBank,
      recipient: cardNumber,
    };

    try {
      await queryConclusion(data).unwrap();
      toast.success('Успешно отправлено');
      console.log(data);
    } catch (e: any) {
      if (e.data && e.data.message) {
        toast.error(e.data.message);
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <Bank selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
      <div className={css.sending}>
        <Input
          className={css.input}
          value={amount}
          onChange={handleAmountChange}
          placeholder="Введите сумму"
          type="number"
        />
        <Input
          className={css.input}
          value={cardNumber}
          onChange={handleCardChange}
          placeholder="Номер счета"
          type="number"
        />
        <Button
          className={cn(css.button, 'bg-1-gradient')}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Отправка...' : 'Пополнить'}
        </Button>
      </div>
    </div>
  );
}
