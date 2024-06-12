import { Button } from '@/shared/ui/button';
import css from './examination.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { useQueryPaymentIdQuery } from '@/shared/redux/payment/replenishment';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations(
    'header.dropdown.walletMenu.modalReplenish.checkReplenish',
  );

  const { data } = useQueryPaymentIdQuery({ paymentId: '4j32h432h4u434' });


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
      message: AAA.status ? t('successfulRep') : t('failedRep'),
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
      <h1>{t('replenish')}</h1>
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
            <p>{t('toPay')}</p>
            <div className={css.infoBlock}>{AAA.details.summ_real}</div>
          </div>
          {isCardType && (
            <>
              <div className={css.inputForm}>
                <p>{t('bankSBP')}</p>
                <div className={css.infoBlock}>{AAA.details.fio_sbp}</div>
              </div>
              <div className={css.inputForm}>
                <p>{t('cardNumber')}</p>
                <div className={css.infoBlock}>{AAA.details.card}</div>
              </div>
              <div className={css.inputForm}>
                <p>{t('phoneNumber')}</p>
                <div className={css.infoBlock}>{AAA.details.number}</div>
              </div>
            </>
          )}
          {!isCardType && (
            <div className={css.inputForm}>
              <p>{t('accountNumber')}</p>
              <div className={css.infoBlock}>{AAA.details.card}</div>
            </div>
          )}
          <Button className={css.button} onClick={handleClick}>
            {t('button')}
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
