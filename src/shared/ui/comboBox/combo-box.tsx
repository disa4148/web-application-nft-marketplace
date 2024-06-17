'use client'

import * as React from 'react';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useGetCollectionsQuery } from '@/shared/redux/features/collectionsApi';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Image from 'next/image';

import { cn } from '../../lib/utils';
import css from './comboBox.module.scss';

import { Button } from '../button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/store';

export function ComboBox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [count, setCount] = useState<number>(76);
  const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<string>('market_cap');

  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const isCollectionsPath = pathname.startsWith(`/${locale}/collections`);

  const { data } = useGetCollectionsQuery({
    offset,
    count,
    sort,
  });
  const collections = data?.data;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className={cn(css.wrapper, 'bg-1-text-black-80 text-1-text-black-70')}
        >
          <Image
            src={'/assets/icons/Loupe.svg'}
            width={18}
            height={18}
            alt="Loupe"
          />
          {t('header.inputPlaceholder')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-1-bg-black-80">
        <Command className="bg-1-text-black-80">
          <CommandInput
            className="bg-1-bg-black-80"
            placeholder={t('header.searchPlaceholder')}
          />
          <CommandList>
            {isSignedIn ? (
              <>
               <CommandEmpty>{t('header.notFound')}</CommandEmpty>
               <CommandGroup className="bg-1-bg-black-100">
                 {collections?.map((collection) => (
                   <Link href={`/${locale}/collections/${collection._id}`} key={collection._id}>
                   <CommandItem
                     value={collection.name}
                     onSelect={(currentValue: any) => {
                       setValue(currentValue === value ? '' : currentValue);
                       setOpen(false);
                     }}
                     className="hover:bg-1-bg-black-80 transition-all"
                   >
                      {isCollectionsPath && (
                         <Check
                           className={cn(
                             'mr-2 h-4 w-4',
                             value === collection.name ? 'opacity-100' : 'opacity-0',
                           )}
                         />
                       )}
                     {collection.name}
                   </CommandItem>
                   </Link>
                 ))}
               </CommandGroup>
               </>
            ) : (
              <div className="flex text-center items-center justify-center p-3">
                <p className='text-1-text-black-70'>{t('header.unauthorized')}</p>
              </div>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
