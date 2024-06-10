'use client';
import React, { useState } from 'react';
import css from './bank.module.scss'; 
import Image from 'next/image';

const banks = [
  { title: 'Bank(Russia)', name: "Интернет-банк оплата", img: '/assets/forTest/Bank.svg', value: 'card' },
  { title: 'Bank(Ukraine)', name: "Интернет-банк оплата", img: '/assets/forTest/Bank.svg', value: 'card_ua' },
  { title: 'Bank(Kazakhstan)', name: "Интернет-банк оплата", img: '/assets/forTest/Bank.svg', value: 'card_kz' },
  { title: 'Ethereum', name: "Ethereum", img: '/assets/forTest/Eth.svg', value: 'eth' },
  { title: 'USDT', name: "USDT", img: '/assets/forTest/Usdt.svg', value: 'usdt' },
  { title: 'Bitcoin', name: "Bitcoin", img: '/assets/forTest/Btc.svg', value: 'btc' }
];

export default function Bank() {
  const [selectedBank, setSelectedBank] = useState(null);

  const handleBankClick = (value: any) => {
    setSelectedBank(value);
  };

  return (
    <div className={css.bankSelector}>
      {banks.map((bank) => (
        <div
          key={bank.value}
          className={`${css.bankItem} ${selectedBank === bank.value ? css.selected : ''}`}
          onClick={() => handleBankClick(bank.value)}
        >
          <div className={css.bankHeader}>
            <span className='text-[14px]'>{bank.title}</span>
          </div>
          <div className={css.bankBody}>
            <Image src={bank.img} width={25} height={25} alt='bnk'/>
            <span className='text-[14px]'>{bank.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
