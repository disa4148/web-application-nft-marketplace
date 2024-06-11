import React, { useState, ChangeEvent } from 'react';
import css from './selectBank.module.scss';
import Bank from "@/shared/ui/bank/bank";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useCreateReplenishmentMutation } from '@/shared/redux/payment/replenishment'; 
import { cn } from '@/shared/lib/utils';

export default function SelectBank() {
  const [selectedBank, setSelectedBank] = useState('');
  const [amount, setAmount] = useState('');
  
  const [createReplenishment, { isLoading }] = useCreateReplenishmentMutation();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      console.error("Сумма должна быть числом");
      return;
    }

    const data = {
      amount: amountNumber,
      type: selectedBank,
    };

    try {
      await createReplenishment(data).unwrap();
      console.log("Успешно отправлено");
      console.log(data)
    } catch (err) {
      console.error("Ошибка при отправке:", err);
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
        <Button className={cn(css.button, 'bg-1-gradient')} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Отправка..." : "Пополнить"}
        </Button>
      </div>
    </div>
  );
}
