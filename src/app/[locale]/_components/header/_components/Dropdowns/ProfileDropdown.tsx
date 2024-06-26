'use client';
import css from './Dropdowns.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import useLogout from '@/shared/lib/hooks/useLogout';

import { cn } from '@/shared/lib/utils';

import Link from 'next/link';

import { Grid3X3, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

type Props = {
  emoji: string;
}

export default function ProfileDropdown({emoji}: Props): JSX.Element {
  const t = useTranslations('header.dropdown.profileMenu');
  const logout = useLogout();
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <div onClick={toggleMenu}>
        <Avatar>
          <AvatarImage
            className={isOpen ? 'opacity-50 transition-all' : ''}
            src=""
          />
          <AvatarFallback style={{fontSize: '25px'}}>{emoji}</AvatarFallback>
        </Avatar>
      </div>
      {isOpen && (
        <div className={cn(css.content, 'bg-1-text-black-80')}>
          <div className={css.item}>
            <div className={cn(css.icon, 'bg-1-bg-white-100')}>
              <Grid3X3 width={20} height={20} className="invert" />
            </div>
            <Link className='text-1-text-white-100' href={`/${locale}/myCollections`}>
              {t('myCollection.title')}
            </Link>
          </div>
          <div onClick={logout} className={css.item}>
            <div className={cn(css.icon, 'bg-1-bg-white-100')}>
              <LogOut color="#5763D0" width={20} height={20} />
            </div>
            <Button className={cn(css.exitBtn, 'hover:opacity-70 bg-1-gradient')} variant="ghost">
              {t('exit.title')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
