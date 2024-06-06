'use client';
import css from './deregisterModal.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import DeregisterModal from './DeregisterModal';

type Props = {
  nftId: string;
};

export default function DeregisterModalTrigger({ nftId }: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <DeregisterModal nftId={nftId} open={isOpenModal} setIsOpen={setIsModal}>
      <Button className={css.removeBtn}>{t('removeBtn')}</Button>
    </DeregisterModal>
  );
}
