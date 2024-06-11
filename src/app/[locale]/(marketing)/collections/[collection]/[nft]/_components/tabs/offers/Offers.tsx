import css from './offers.module.scss';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { offerItems } from './offersItems';

import { useTranslations } from 'next-intl';

export default function Offers(): JSX.Element {
  const t = useTranslations('nftCard.tabs.offers');
  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <div>
        <h3 className='text-1-text-white-100'>{t('title')}</h3>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className={css.scroll}>
        <div className={css.gridContainer}>
          <div className={css.textInfo}>
            <h5 className='text-1-text-white-100'>{t('price')}</h5>
            <h5 className='text-1-text-white-100'>{t('inRub')}</h5>
            <h5 className='text-1-text-white-100'>{t('expirationDate')}</h5>
            <h5 className='text-1-text-white-100'>{t('by')}</h5>
          </div>
          {offerItems.map((items, index) => (
            <div className={css.textData} key={index}>
              <h4 className='text-1-text-white-100'>{items.price}</h4>
              <h4 className='text-1-text-white-100'>{items.inRub}</h4>
              <h4 className='text-1-text-white-100'>{items.expirationDate}</h4>
              <h4 className={cn(css.colorBy, 'bg-1-gradient')}>{items.by}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
