'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { useEffect, useState } from 'react';
import SelectBank from './_components/selectBank';
import Examination from './_components/examination';
import { BankDetails } from '@/shared/ui/bank/bank';
import { useTranslations } from 'next-intl';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children?: React.ReactNode;
};

export default function ModalReplenish({ open, setIsOpen, children }: Props) {
  const b = useTranslations(
    'header.dropdown.walletMenu.modalReplenish.bankName',
  );

  const initialBank = {
    value: 'card',
    name: b('nameBank'),
    nameExamUp: b('nameExamUp'),
    nameExamDw: `${b('nameExamDw')}(Russia)`,
  };

  const [id, setId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('main');
  const [selectedBank, setSelectedBank] = useState<BankDetails | null>(
    initialBank,
  );

  interface ITabComponents {
    [key: string]: React.ReactNode;
  }

  useEffect(() => {
    if (!open) {
      setActiveTab('main');
    }
  }, [open]);

  const tabComponents: ITabComponents = {
    main: (
      <SelectBank
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
        changeTab={setActiveTab}
        setId={setId}
      />
    ),
    examination: (
      <Examination selectedBank={selectedBank} changeTab={setActiveTab} id={id}/>
    ),
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={activeTab === 'main' ? 'max-w-[583px]' : 'max-w-[383px]'}
      >
        {tabComponents[activeTab]}
      </DialogContent>
    </Dialog>
  );
}
