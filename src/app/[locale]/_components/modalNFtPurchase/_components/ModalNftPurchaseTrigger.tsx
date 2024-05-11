'use client';
import { useState } from 'react';
import ModalNFtPurchase from '../ModalNFtPurchase';
import { Button } from '@/shared/ui/button';

export default function ModalTrigger(): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  return (
    <ModalNFtPurchase open={isOpenModal} setIsOpen={setIsModal}>
      <Button>Купить</Button>
    </ModalNFtPurchase>
  );
}
