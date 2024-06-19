'use client'
import css from './offers.module.scss';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useExchangeRate } from '@/shared/containers/exchangeRateContext';

export default function Offers({ offers }: any): JSX.Element {
  const { ethToRubRate, ethToUsdRate, isLoadingRates, fetchExchangeRates } = useExchangeRate();
  const t = useTranslations('nftCard.tabs.offers');
  const offersPrice = offers;

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  const convertPriceToRub = (price: number): number | null => {
    if (ethToRubRate !== null) {
      const priceInRub = price * ethToRubRate;
      return Math.round(priceInRub);
    }
    return null;
  };

  const convertPriceToUsd = (price: number): number | null => {
    if (ethToUsdRate !== null) {
      const priceInUsd = price * ethToUsdRate;
      return Number(priceInUsd.toFixed(2));
    }
    return null;
  };

  const dateConvert = (expires: string) => {
    const date = new Date(expires);
    const nowDate = new Date();
    const timeLeft = Math.abs(date.getTime() - nowDate.getTime());
    const hours = Math.ceil(timeLeft / (1000 * 60 * 60));
    return `${hours} ${declineWord(hours, [
      t('hour'),
      t('hours'),
      t('hourss'),
    ])}`;
  };

  const declineWord = (number: number, words: [string, string, string]): string => {
    let cases = [2, 0, 1, 1, 1, 2];
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <div>
        <h3 className="text-1-text-white-100">{t('title')}</h3>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className={css.scroll}>
        {offersPrice.length > 0 ? (
          <div className={css.gridContainer}>
            <div className={css.textInfo}>
              <h5 className="text-1-text-white-100">{t('price')}</h5>
              <h5 className="text-1-text-white-100">{t('inRub')}</h5>
              <h5 className="text-1-text-white-100">{t('inUsd')}</h5>
              <h5 className="text-1-text-white-100">{t('expirationDate')}</h5>
              <h5 className="text-1-text-white-100">{t('by')}</h5>
            </div>

            {offersPrice.map((item: any, index: number) => (
              <div className={css.textData} key={index}>
                <h4 className="text-1-text-white-100">
                  {item.price.toFixed(10)}
                </h4>
                <h4 className="text-1-text-white-100">
                  {convertPriceToRub(item.price) !== null
                    ? `${convertPriceToRub(item.price)}`
                    : isLoadingRates
                    ? 'Loading...'
                    : 'Error'}
                </h4>
                <h4 className="text-1-text-white-100">
                  {convertPriceToUsd(item.price) !== null
                    ? `${convertPriceToUsd(item.price)}`
                    : isLoadingRates
                    ? 'Loading...'
                    : 'Error'}
                </h4>
                <h4 className="text-1-text-white-100">
                  {dateConvert(item.expires)}
                </h4>
                <h4 className={cn(css.colorBy, 'bg-1-gradient')}>
                  {item.owner.name}
                </h4>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full p-4">
            <p>{t('offer')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
