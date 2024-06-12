'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useState } from 'react';
import SelectBank from './_components/selectBank';
import Examination from './_components/examination';
import { BankDetails } from '@/shared/ui/bank/bank';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children?: React.ReactNode;
};

const initialBank = {
  value: 'card',
  name: "Интернет-банк\nОплата",
  nameExamUp: "Интернет-банк",
  nameExamDw: "Оплата(Russia)"
};

export default function ModalReplenish({ open, setIsOpen, children }: Props) {
  const [activeTab, setActiveTab] = useState<string>('main');
  const [selectedBank, setSelectedBank] = useState<BankDetails | null>(initialBank);

  interface ITabComponents {
    [key: string]: React.ReactNode;
  }

  const tabComponents: ITabComponents = {
    main: <SelectBank selectedBank={selectedBank} setSelectedBank={setSelectedBank} changeTab={setActiveTab} />,
    examination: <Examination selectedBank={selectedBank} changeTab={setActiveTab} />,
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={activeTab === 'main' ? 'max-w-[583px]' : 'max-w-[383px]'}>
        {tabComponents[activeTab]}
      </DialogContent>
    </Dialog>
  );
}
