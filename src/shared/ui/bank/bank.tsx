'use client';
import React, { useEffect } from 'react';
import css from './bank.module.scss';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

export interface BankDetails {
  value: string;
  name: string;
  nameExamUp?: string;
  nameExamDw?: string;
}

interface Props {
  selectedBank: BankDetails | null;
  setSelectedBank: React.Dispatch<React.SetStateAction<BankDetails | null>>;
}

export default function Bank({ selectedBank, setSelectedBank }: Props) {
  const handleBankClick = (
    value: string,
    name: string,
    nameExamUp: string,
    nameExamDw: string,
  ) => {
    setSelectedBank({ value, name, nameExamUp, nameExamDw });
  };

  const t = useTranslations(
    'header.dropdown.walletMenu.modalReplenish.bankName',
  );

  const banks = [
    {
      title: 'Bank(Russia)',
      name: t('nameBank'),
      nameExamUp: t('nameExamUp'),
      nameExamDw: `${t('nameExamDw')}(Russia)`,
      img: '/assets/forTest/Bank.svg',
      value: 'card',
    },
    {
      title: 'Bank(Ukraine)',
      name: t('nameBank'),
      nameExamUp: t('nameExamUp'),
      nameExamDw: `${t('nameExamDw')}(Ukraine)`,
      img: '/assets/forTest/Bank.svg',
      value: 'card_ua',
    },
    {
      title: 'Bank(Kazakhstan)',
      name: t('nameBank'),
      nameExamUp: t('nameExamUp'),
      nameExamDw: `${t('nameExamDw')}(Kazakhstan)`,
      img: '/assets/forTest/Bank.svg',
      value: 'card_kz',
    },
    {
      title: 'Ethereum',
      name: 'Ethereum',
      nameExamUp: 'Ethereum',
      nameExamDw: '',
      img: '/assets/forTest/Eth.svg',
      value: 'eth',
    },
    {
      title: 'USDT',
      name: 'USDT',
      nameExamUp: 'USDT',
      nameExamDw: '',
      img: '/assets/forTest/Usdt.svg',
      value: 'usdt',
    },
    {
      title: 'Bitcoin',
      name: 'Bitcoin',
      nameExamUp: 'Bitcoin',
      nameExamDw: '',
      img: '/assets/forTest/Btc.svg',
      value: 'btc',
    },
  ];


  return (
    <div className={css.bankSelector}>
      {banks.map((bank) => (
        <div
          key={bank.value}
          className={`${cn(
            css.bankItem,
            'bg-1-bg-black-100 hover:bg-1-bg-black-80 transition-all',
          )} ${selectedBank?.value === bank.value ? css.selected : ''}`}
          onClick={() =>
            handleBankClick(
              bank.value,
              bank.name,
              bank.nameExamUp,
              bank.nameExamDw,
            )
          }
        >
          <div className={cn(css.bankHeader, 'bg-1-gradient')}>
            <span className={cn(css.text ,"text-sm text-1-text-white-100")}>{bank.title}</span>
          </div>
          <div className={css.bankBody}>
            <Image src={bank.img} width={25} height={25} alt="bnk" />
            <span className={cn(css.text ,"text-sm text-1-text-white-100")}>{bank.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
