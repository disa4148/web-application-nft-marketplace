import css from './priceContainer.module.scss';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import ModalTrigger from '@/app/[locale]/_components/modalNFtPurchase/_components/ModalNftPurchaseTrigger';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/ui/skeleton';



export default function SkeletonPrice(): JSX.Element {
  const t = useTranslations('nftCard.priceBlock');
  return (
    <div className={css.priceContainer}>
      <div>
        <h5>{t('title')}</h5>
        <div className={css.price}>
          <Skeleton className='w-[230px] h-[25px]'/>
          <Skeleton className='w-[120px] h-[20px]'/>
        </div>
      </div>
      <div className={css.btns}>
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
