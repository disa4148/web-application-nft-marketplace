import css from '../page.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

type Props = {
  collectionName?: string;
  owner?: string;
  description?: string;
  items?: number;
  dateOfCreation?: string;
  network?: string;
};

export default function NftInfo({
  collectionName,
  owner,
  description,
  items,
  dateOfCreation,
  network,
}: Props): JSX.Element {
  const t = useTranslations('catalogNft');
  return (
    <div className={css.users}>
      <div>
        <div>
          <p className='text-1-text-white-100'>{collectionName}</p>
          <Image
            src={'/assets/icons/verified.svg'}
            alt="Verified"
            width={16}
            height={16}
          />
        </div>
        <div>
          <p className='text-1-text-black-60'>{owner}</p>
          <Image
            src={'/assets/icons/verified.svg'}
            alt="Verified"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div>
        <p className='text-1-text-white-100'>{description}</p>
        <div className={css.underInfo}>
          <div className={cn(css.items, 'text-1-text-black-60')}>
            <p>{t('items')}</p>
            <p>{items}</p>
          </div>
          <div className={cn(css.dateCreate, 'text-1-text-black-60')}>
            <p>{t('dateCreated')}</p>
            <p>{dateOfCreation}</p>
          </div>
          <div className={cn(css.network, 'text-1-text-black-60')}>
            <p>{t('network')}</p>
            <p>{network}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
