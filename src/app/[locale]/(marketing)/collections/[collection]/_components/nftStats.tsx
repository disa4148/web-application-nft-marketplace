import css from '../page.module.scss';
import { useTranslations } from 'next-intl';


type Props = {
    volume: number
    minPrice: number
    bestOffer: number
    owners: number;
}
 
export default function NftStats({ volume, minPrice, owners, bestOffer }: Props): JSX.Element {
  const t = useTranslations('catalogNft');
  return (
    <div className={css.fullInfo}>
      <div className={css.volume}>
        <p>{volume} ETH</p>
        <p className='text-1-text-black-60'>{t('volume')}</p>
      </div>
      <div className={css.price}>
        <p>{minPrice} ETH</p>
        <p className='text-1-text-black-60'>{t('minPrice')}</p>
      </div>
      <div className={css.offer}>
        <p>{bestOffer} ETH</p>
        <p className='text-1-text-black-60'>{t('offer')}</p>
      </div>
      <div className={css.owners}>
        <p>{owners}</p>
        <p className='text-1-text-black-60'>{t('owners')}</p>
      </div>
    </div>
  );
}
