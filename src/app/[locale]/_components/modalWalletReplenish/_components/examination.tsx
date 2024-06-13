import { Button } from '@/shared/ui/button';
import css from './examination.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { useQueryPaymentIdQuery } from '@/shared/redux/payment/replenishment';
import { useTranslations } from 'next-intl';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

interface BankDetails {
  value: string;
  name: string;
  nameExamUp?: string;
  nameExamDw?: string;
}

interface Props {
  changeTab: React.Dispatch<React.SetStateAction<string>>;
  selectedBank: BankDetails | null;
  id: string;
}

export default function Examination({ changeTab, selectedBank, id }: Props) {
  const t = useTranslations(
    'header.dropdown.walletMenu.modalReplenish.checkReplenish',
  );

  const { data, isLoading } = useQueryPaymentIdQuery({ paymentId: id });

  const [paymentStatus, setPaymentStatus] = useState<{
    status: boolean | undefined;
    message: string;
  }>({ status: false, message: '' });

  const handleClick = () => {
    setPaymentStatus({
      status: data?.status,
      message: data?.status ? t('successfulRep') : t('failedRep'),
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
            <div className={css.infoBlock}>
              {isLoading ? <div className='w-full flex items-center justify-center'><LoadingSpinner /></div> : data?.details.summ_real}
            </div>
          </div>
          {isCardType && (
            <>
              <div className={css.inputForm}>
                <p>{t('bankSBP')}</p>
                <div className={css.infoBlock}>{isLoading ? <div className='w-full flex items-center justify-center'><LoadingSpinner /></div> : data?.details.fio_sbp}</div>
              </div>
              <div className={css.inputForm}>
                <p>{t('cardNumber')}</p>
                <div className={css.infoBlock}>{isLoading ? <div className='w-full flex items-center justify-center'><LoadingSpinner /></div> : data?.details.card}</div>
              </div>
              <div className={css.inputForm}>
                <p>{t('phoneNumber')}</p>
                <div className={css.infoBlock}>{isLoading ? <div className='w-full flex items-center justify-center'><LoadingSpinner /></div> : data?.details.number}</div>
              </div>
            </>
          )}
          {!isCardType && (
            <div className={css.inputForm}>
              <p>{t('accountNumber')}</p>
              <div className={css.infoBlock}>{isLoading ? <div className='w-full flex items-center justify-center'><LoadingSpinner /></div> : data?.details.card}</div>
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
