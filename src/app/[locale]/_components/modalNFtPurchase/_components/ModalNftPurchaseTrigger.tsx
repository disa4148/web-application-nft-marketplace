'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import ModalNFtPurchase from '../ModalNFtPurchase';

type Props = {
  nftId: string;
  image: string;
  title: string;
  description: string;
  price: number;
  refetchNftData: () => void;
};

export default function ModalTrigger({
  image,
  title,
  description,
  price,
  nftId,
  refetchNftData,
}: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <ModalNFtPurchase
      refetchNftData={refetchNftData}
      nftId={nftId}
      open={isOpenModal}
      setIsOpen={setIsModal}
      image={image}
      title={title}
      description={description}
      price={price}
    >
      <Button className="bg-1-gradient text-1-text-white-100">
        {t('buyBtn')}
      </Button>
    </ModalNFtPurchase>
  );
}
