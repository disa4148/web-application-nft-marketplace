'use client';
import css from './deregisterModal.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import DeregisterModal from './DeregisterModal';
import { cn } from '@/shared/lib/utils';

type Props = {
  nftId: string;
};

export default function DeregisterModalTrigger({ nftId }: Props): JSX.Element {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations('nftCard.priceBlock');
  return (
    <DeregisterModal nftId={nftId} open={isOpenModal} setIsOpen={setIsModal}>
      <Button className={cn(css.removeBtn, 'bg-1-grey-gradient text-1-text-white-100')}>{t('removeBtn')}</Button>
    </DeregisterModal>
  );
}
