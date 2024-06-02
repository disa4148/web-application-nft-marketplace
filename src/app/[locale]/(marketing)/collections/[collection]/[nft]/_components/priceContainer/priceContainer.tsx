'use client'
import css from './priceContainer.module.scss';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import ModalTrigger from '@/app/[locale]/_components/modalNFtPurchase/_components/ModalNftPurchaseTrigger';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  price: number;
  modalTitle: string;
  modalDescription: string;
  modalImage: string;
};

export default function PriceContainer({ modalImage, modalTitle, modalDescription, price }: Props): JSX.Element {
  const t = useTranslations('nftCard.priceBlock');
  
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [rubPrice, setRubPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();

        console.log(data)
        
        const usdToEthRate = data.rates.USD; //1 доллар

        console.log(usdToEthRate) 

        const usdToRubRate = data.rates.RUB; //курс рубля

        console.log(usdToRubRate)

        const priceInUsd = price / usdToEthRate;
        const priceInRub = priceInUsd * usdToRubRate;

        setUsdPrice(priceInUsd);
        setRubPrice(priceInRub);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchExchangeRates();
  }, [price]);


  return (
    <div className={css.priceContainer}>
      <div>
        <h5>{t('title')}</h5>
        <div className={css.price}>
          <h2>{price} ETH</h2>
          {usdPrice !== null && rubPrice !== null ? (
            <h5>{usdPrice.toFixed(2)} $ ({rubPrice.toFixed(0)} ₽)</h5>
          ) : (
            <h5>Loading...</h5>
          )}
        </div>
      </div>
      <div className={css.btns}>
        <ModalTrigger
          image={modalImage}
          title={modalTitle}
          description={modalDescription}
          price={price}
        />
        <Button>
          <Image
            src={'/assets/icons/label.svg'}
            alt=""
            width={15}
            height={15}
          />
          {t('offerBtn')}
        </Button>
      </div>
    </div>
  );
}
