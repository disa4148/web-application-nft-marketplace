'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';
import dynamic from 'next/dynamic';

import { useBuyNftMutation } from '@/shared/redux/features/nftApi';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import Bank from '@/shared/ui/bank/bank';
import SelectBank from './_components/selectBank';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children?: React.ReactNode;
};

export default function ModalConclusion({ open, setIsOpen, children }: Props) {
  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-[581px]'>
        <SelectBank />
          {/* Компонент с кнопками и полями */}
      </DialogContent>
    </Dialog>
  );
}
