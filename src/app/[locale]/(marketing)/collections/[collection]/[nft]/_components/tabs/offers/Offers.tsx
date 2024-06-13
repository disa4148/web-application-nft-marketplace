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

  console.log(offersPrice);
  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <div>
        <h3 className="text-1-text-white-100">{t('title')}</h3>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className={css.scroll}>
        <div className={css.gridContainer}>
          <div className={css.textInfo}>
            <h5 className="text-1-text-white-100">{t('price')}</h5>
            <h5 className="text-1-text-white-100">{t('inRub')}</h5>
            <h5 className="text-1-text-white-100">{t('expirationDate')}</h5>
            <h5 className="text-1-text-white-100">{t('by')}</h5>
          </div>
          {offersPrice.map((items: any, index: any) => (
            <div className={css.textData} key={index}>
              <h4 className="text-1-text-white-100">
                {items.price.toFixed(10)}
              </h4>

              <h4 className="text-1-text-white-100">
                {convertPriceToRub(items.price) !== null
                  ? `${convertPriceToRub(items.price)}`
                  : 'Loading...'}
              </h4>
              <h4 className="text-1-text-white-100">
                {dateConvert(items.expires)}
              </h4>
              <h4 className={cn(css.colorBy, 'bg-1-gradient')}>
                {items.owner.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
