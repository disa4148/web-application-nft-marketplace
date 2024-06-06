'use client';
import css from './priceContainer.module.scss';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import ModalTrigger from '@/app/[locale]/_components/modalNFtPurchase/_components/ModalNftPurchaseTrigger';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import SaleModalTrigger from '../saleModal/SaleModalTrigger';
import ChangePriceModalTrigger from '../changePriceModal/ChangePriceModalTrigger';
import DeregisterModalTrigger from '../../deregisterModal/DeregisterModalTrigger';

type Props = {
  nftId: string;
  price: number;
  modalTitle: string;
  modalDescription: string;
  modalImage: string;
  isMine: boolean;
  onSale: boolean;
};

export default function PriceContainer({
  modalImage,
  modalTitle,
  modalDescription,
  price,
  nftId,
  isMine,
  onSale
}: Props): JSX.Element {
  const t = useTranslations('nftCard.priceBlock');

  const [priceInUsd, setPriceInUsd] = useState<number | null>(null);
  const [priceInRub, setPriceInRub] = useState<number | null>(null);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,rub',
        );
        const data = await response.json();

        const rates = data['ethereum'];

        const usdToEthRate = rates.usd;
        const usdToRubRate = rates.rub;

        const calculatedPriceInUsd = price * usdToEthRate;
        const calculatedPriceInRub = price * usdToRubRate;

        setPriceInUsd(calculatedPriceInUsd);
        setPriceInRub(calculatedPriceInRub);
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
          {priceInUsd !== null && priceInRub !== null ? (
            <h5>
              {priceInUsd.toFixed(2)} $ ({priceInRub.toFixed(0)} ₽)
            </h5>
          ) : (
            <h5>Loading...</h5>
          )}
        </div>
      </div>
      <div className={css.btns}>
        {isMine ? (
          onSale ? (
            <>
            <ChangePriceModalTrigger price={price} nftId={nftId}/>
            <DeregisterModalTrigger nftId={nftId}/>
            </>
          ) : (
            <SaleModalTrigger nftId={nftId}/>
          )
        ) : (
          onSale && (
            <>
              <ModalTrigger
                nftId={nftId}
                image={modalImage}
                title={modalTitle}
                description={modalDescription}
                price={price}
              />
              <Button className={css.offerBtn}>
                <Image
                  src={'/assets/icons/label.svg'}
                  alt=""
                  width={15}
                  height={15}
                />
                {t('offerBtn')}
              </Button>
            </>
          )
        )}
      </div>
    </div>
  );
}
