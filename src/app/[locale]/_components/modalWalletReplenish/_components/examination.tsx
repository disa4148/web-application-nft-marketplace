import { Button } from '@/shared/ui/button';
import css from './examination.module.scss';
import { Input } from '@/shared/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';
import { useQueryPaymentIdQuery } from '@/shared/redux/payment/replenishment';

interface BankDetails {
  value: string;
  name: string;
  nameExamUp?: string;
  nameExamDw?: string;
}

interface Props {
  changeTab: React.Dispatch<React.SetStateAction<string>>;
  selectedBank: BankDetails | null;
}

export default function Examination({ changeTab, selectedBank }: Props) {
  const { data } = useQueryPaymentIdQuery({ paymentId: '4j32h432h4u434' });

  console.log(data);

  const AAA = {
    amount: 0,
    type: 'card',
    details: {
      bank_name: 'Sberbank',
      card: '8394358383535',
      fio_card: 'Vasya',
      fio_sbp: 'Vasya',
      id: 'uh3u5h34ih54i3h5i3h44h',
      number: 83298394272,
      summ_pay: 34240,
      summ_real: 34240,
    },
    status: true,
  };

  const [paymentStatus, setPaymentStatus] = useState<{
    status: boolean;
    message: string;
  }>({ status: false, message: '' });

  const handleClick = () => {
    setPaymentStatus({
      status: AAA.status,
      message: AAA.status ? 'Средства зачислены!' : 'Средства еще не зачислены!',
    });
  };

  const bankImages: any = {
    card: '/assets/forTest/Bank.svg',
    card_ua: '/assets/forTest/Bank.svg',
    card_kz: '/assets/forTest/Bank.svg',
    eth: '/assets/forTest/Eth.svg',
    usdt: '/assets/forTest/Usdt.svg',
    btc: '/assets/forTest/Btc.svg',
  };

  const selectedBankImage = selectedBank
    ? bankImages[selectedBank.value]
    : '/assets/forTest/Bank.svg';

  const isCardType =
    selectedBank && ['card', 'card_ua', 'card_kz'].includes(selectedBank.value);

  return (
    <div className={css.page}>
      <h1>Пополнить</h1>
      <div className={css.wrapper}>
        <div className={css.bank}>
          <Image
            src={selectedBankImage}
            alt={selectedBank?.name || 'default'}
            width={35}
            height={35}
          />
          <div>
            <span>{selectedBank?.nameExamUp}</span>
            <span>{selectedBank?.nameExamDw}</span>
          </div>
        </div>
        <div className={css.form}>
          <div className={css.inputForm}>
            <p>К оплате</p>
            <div className={css.infoBlock}>{AAA.details.summ_real}</div>
          </div>
          {isCardType && (
            <>
              <div className={css.inputForm}>
                <p>Банк для СБП</p>
                <div className={css.infoBlock}>{AAA.details.fio_sbp}</div>
              </div>
              <div className={css.inputForm}>
                <p>Номер карты</p>
                <div className={css.infoBlock}>{AAA.details.card}</div>
              </div>
              <div className={css.inputForm}>
                <p>Номер телефона</p>
                <div className={css.infoBlock}>{AAA.details.number}</div>
              </div>
            </>
          )}
          {!isCardType && (
            <div className={css.inputForm}>
              <p>Номер счета</p>
              <div className={css.infoBlock}>{AAA.details.card}</div>
            </div>
          )}
          <Button className={css.button} onClick={handleClick}>
            Проверить платеж
          </Button>
          {paymentStatus.status !== null && (
            <div
              className={css.message}
              style={{ color: paymentStatus.status ? 'green' : 'red' }}
            >
              {paymentStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}