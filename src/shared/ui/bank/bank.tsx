'use client';
import React, { useEffect } from 'react';
import css from './bank.module.scss'; 
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

const banks = [
  { title: 'Bank(Russia)', name: "Интернет-банк оплата", img: '/assets/forTest/Bank.svg', value: 'card' },
  { title: 'Bank(Ukraine)', name: "Интернет-банк оплата", img: '/assets/forTest/Bank.svg', value: 'card_ua' },
  { title: 'Bank(Kazakhstan)', name: "Интернет-банк оплата", img: '/assets/forTest/Bank.svg', value: 'card_kz' },
  { title: 'Ethereum', name: "Ethereum", img: '/assets/forTest/Eth.svg', value: 'eth' },
  { title: 'USDT', name: "USDT", img: '/assets/forTest/Usdt.svg', value: 'usdt' },
  { title: 'Bitcoin', name: "Bitcoin", img: '/assets/forTest/Btc.svg', value: 'btc' }
];

interface Props {
  selectedBank: string;
  setSelectedBank: any;
}

export default function Bank({ selectedBank, setSelectedBank }: Props) {
  const handleBankClick = (value: String) => {
    setSelectedBank(value);
  };

  useEffect(() => {
    console.log("Банк:", selectedBank);
  }, [selectedBank]);

  return (
    <div className={css.bankSelector}>
      {banks.map((bank) => (
        <div
          key={bank.value}
          className={`${cn(css.bankItem, 'bg-1-bg-black-100 hover:bg-1-bg-black-80 transition-all')} ${selectedBank === bank.value ? css.selected : ''}`}
          onClick={() => handleBankClick(bank.value)}
        >
          <div className={cn(css.bankHeader, 'bg-1-gradient')}>
            <span className='text-sm text-1-text-white-100'>{bank.title}</span>
          </div>
          <div className={css.bankBody}>
            <Image src={bank.img} width={25} height={25} alt='bnk'/>
            <span className='text-sm text-1-text-white-100'>{bank.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
