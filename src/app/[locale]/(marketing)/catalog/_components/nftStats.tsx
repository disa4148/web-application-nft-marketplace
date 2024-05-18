import css from '../page.module.scss';
import { useTranslations } from 'next-intl';

type Owners = {
    owners: number;
    percentage: number
}

type Props = {
    volume: number
    minPrice: number
    owners: Owners
}

export default function NftStats({ volume, minPrice, owners }: Props): JSX.Element {
  const t = useTranslations('catalogNft');
  return (
    <div className={css.fullInfo}>
      <div className={css.volume}>
        <p>{volume} ETH</p>
        <p>{t('volume')}</p>
      </div>
      <div className={css.price}>
        <p>{minPrice} ETH</p>
        <p>{t('minPrice')}</p>
      </div>
      <div className={css.offer}>
        <p>0.0236 ETH</p>
        <p>{t('offer')}</p>
      </div>
      <div className={css.owners}>
        <p>{owners.owners} ({owners.percentage}%)</p>
        <p>{t('owners')}</p>
      </div>
    </div>
  );
}
