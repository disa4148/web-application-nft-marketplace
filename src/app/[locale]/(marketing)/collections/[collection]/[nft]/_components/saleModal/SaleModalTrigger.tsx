'use client';
import css from './saleModal.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import SaleModal from './SaleModal';

type Props = {
  nftId: string;
};

export default function SaleModalTrigger({
  nftId,
}: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <SaleModal
      nftId={nftId}
      open={isOpenModal}
      setIsOpen={setIsModal}
    >
      <Button className={css.listForSaleBtn}>{t('listForSaleBtn')}</Button>
    </SaleModal>
  );
}
