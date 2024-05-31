'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import ModalNFtPurchase from '../ModalNFtPurchase';

type Props = {
  image: string;
  title: string;
  description: string;
  price: number;
};

export default function ModalTrigger({ image, title, description, price }: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <ModalNFtPurchase
      open={isOpenModal}
      setIsOpen={setIsModal}
      image={image}
      title={title}
      description={description}
      price={price}
    >
      <Button>{t('buyBtn')}</Button>
    </ModalNFtPurchase>
  );
}
