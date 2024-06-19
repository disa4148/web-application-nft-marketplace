import css from './priceContainer.module.scss';

import ModalTrigger from '@/app/[locale]/_components/modalNFtPurchase/_components/ModalNftPurchaseTrigger';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import SaleModalTrigger from '../saleModal/SaleModalTrigger';
import ChangePriceModalTrigger from '../changePriceModal/ChangePriceModalTrigger';
import DeregisterModalTrigger from '../../deregisterModal/DeregisterModalTrigger';
import { cn } from '@/shared/lib/utils';
import { useExchangeRate } from '@/shared/containers/exchangeRateContext';

type Props = {
  nftId: string;
  price: number;
  modalTitle: string;
  modalDescription: string;
  modalImage: string;
  isMine: boolean;
  onSale: boolean;
  onDeregisterSuccess: () => void;
  onSaleSuccess: () => void;
  refetchNftData: () => void;
};

export default function PriceContainer({
  modalImage,
  modalTitle,
  modalDescription,
  price,
  nftId,
  isMine,
  onSale,
  onSaleSuccess,
  onDeregisterSuccess,
  refetchNftData,
}: Props): JSX.Element {
  const t = useTranslations('nftCard.priceBlock');
  const [priceInRub, setPriceInRub] = useState<number | null>(null);
  const [priceInUsd, setPriceInUsd] = useState<number | null>(null);
  const { ethToRubRate, ethToUsdRate, isLoadingRates } = useExchangeRate();

  useEffect(() => {
    if (ethToRubRate !== null) {
      const calculatedPriceInRub = price * ethToRubRate;
      setPriceInRub(calculatedPriceInRub);
    }
  }, [ethToRubRate, price]);

  useEffect(() => {
    if (ethToUsdRate !== null) {
      const calculatedPriceInUsd = price * ethToUsdRate;
      setPriceInUsd(calculatedPriceInUsd);
    }
  }, [ethToUsdRate, price]);

  return (
    <div className={cn(css.priceContainer, 'bg-1-bg-black-90')}>
      <div>
        <h5 className="text-1-text-black-60">{t('title')}</h5>
        <div className={css.price}>
          <h2 className="text-1-text-white-100">{price} ETH</h2>
          {priceInUsd !== null && priceInRub !== null ? (
            <h5 className="text-1-text-black-60">
              {priceInUsd.toFixed(2)} $ ({priceInRub.toFixed(0)} ₽)
            </h5>
          ) : (
            <h5 className="text-1-text-black-60">Loading...</h5>
          )}
        </div>
      </div>
      <div className={css.btns}>
        {isMine ? (
          onSale ? (
            <>
              <ChangePriceModalTrigger
                refetchNftData={refetchNftData}
                price={price}
                nftId={nftId}
              />
              <DeregisterModalTrigger
                nftId={nftId}
                onDeregisterSuccess={onDeregisterSuccess}
                refetchNftData={refetchNftData}
              />
            </>
          ) : (
            <SaleModalTrigger
              refetchNftData={refetchNftData}
              onSaleSuccess={onSaleSuccess}
              nftId={nftId}
            />
          )
        ) : (
          onSale && (
            <ModalTrigger
              refetchNftData={refetchNftData}
              nftId={nftId}
              image={modalImage}
              title={modalTitle}
              description={modalDescription}
              price={price}
            />
          )
        )}
      </div>
    </div>
  );
}
