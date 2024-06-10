'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import ModalReplenish from './modalReplenish';


type Props = {
  nftId: string;
};

export default function ModalReplenishTrigger({
  nftId,
}: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <ModalReplenish
      open={isOpenModal}
      setIsOpen={setIsModal}
    >
      <Button >{t('listForSaleBtn')}</Button>
    </ModalReplenish>
  );
}
