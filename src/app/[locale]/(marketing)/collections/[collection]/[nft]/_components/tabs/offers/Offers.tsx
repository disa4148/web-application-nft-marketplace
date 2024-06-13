import css from './offers.module.scss';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { offerItems } from './offersItems';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Offers({ offers }: any): JSX.Element {
  const t = useTranslations('nftCard.tabs.offers');
  const offersPrice = offers;

  const [exchangeRates, setExchangeRates] = useState<{
    usd: number;
    rub: number;
  } | null>(null);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,rub',
        );
        const data = await response.json();

        const rates = data['ethereum'];
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchExchangeRates();
  }, []);

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

  const convertPriceToRub = (price: number): number | null => {
    if (exchangeRates) {
      const priceInRub = price * exchangeRates.rub;
      return Math.round(priceInRub);
    }
    return null;
  };

  const convertPriceToUsd = (price: number): number | null => {
    if (exchangeRates) {
      const priceInUsd = price * exchangeRates.usd;
      return Number(priceInUsd.toFixed(2));
    }
    return null;
  };

  const declineWord = (
    number: number,
    words: [string, string, string],
  ): string => {
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
                    : 'Loading...'}
                </h4>
                <h4 className="text-1-text-white-100">
                  {convertPriceToUsd(item.price) !== null
                    ? `${convertPriceToUsd(item.price)}`
                    : 'Loading...'}
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
