'use client';
import css from './changePriceModal.module.scss';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import ChangePriceModal from './ChangePriceModal';

type Props = {
  nftId: string;
  price: number;
};

export default function ChangePriceModalTrigger({
  nftId,
  price
}: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <ChangePriceModal
      nftId={nftId}
      open={isOpenModal}
      setIsOpen={setIsModal}
      price={price}
    >
      <Button className={cn(css.listForSaleBtn, 'bg-1-gradient text-1-text-white-100')}>{t('changePriceBtn')}</Button>
    </ChangePriceModal>
  );
}
