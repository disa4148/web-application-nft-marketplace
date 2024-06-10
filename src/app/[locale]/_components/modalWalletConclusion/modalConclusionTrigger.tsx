'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import ModalConclusion from './modalConclusion';


type Props = {
  nftId: string;
};

export default function ModalConclusionTrigger({
  nftId,
}: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <ModalConclusion
      open={isOpenModal}
      setIsOpen={setIsModal}
    >
      <Button >{t('listForSaleBtn')}</Button>
    </ModalConclusion>
  );
}
