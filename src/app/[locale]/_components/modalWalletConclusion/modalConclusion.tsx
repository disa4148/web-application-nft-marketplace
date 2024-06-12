'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
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
      </DialogContent>
    </Dialog>
  );
}
