'use client';
import css from './saleModal.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import SaleModal from './SaleModal';
import { cn } from '@/shared/lib/utils';

type Props = {
  nftId: string;
  onSaleSuccess: () => void; 
  refetchNftData: () => void; 
};

export default function SaleModalTrigger({ nftId, onSaleSuccess, refetchNftData }: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <SaleModal onSaleSuccess={onSaleSuccess} refetchNftData={refetchNftData} nftId={nftId} open={isOpenModal} setIsOpen={setIsModal}>
      <Button
        className={cn(
          css.listForSaleBtn,
          'bg-1-gradient text-1-text-white-100',
        )}
      >
        {t('listForSaleBtn')}
      </Button>
    </SaleModal>
  );
}
