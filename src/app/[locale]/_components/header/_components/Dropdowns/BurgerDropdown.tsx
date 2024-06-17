'use client';
import css from './Dropdowns.module.scss';

import {
  useState,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { useTranslations, useLocale } from 'next-intl';

import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

import { Globe, Headset, Menu, X, Heart } from 'lucide-react';

export default function BurgerDropdown(): JSX.Element {
  const t = useTranslations('header.dropdown.burgerMenu');
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setTimeout(() => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }, 0);
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
  }, [isOpen]);

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <div
        className={cn(css.trigger, 'bg-1-bg-white-100')}
        onClick={toggleMenu}
      >
        {isOpen ? (
          <X width={26} height={26} className="invert" />
        ) : (
          <Menu width={26} height={26} className="invert" />
        )}
      </div>
      {isOpen && (
        <div className={cn(css.content, 'bg-1-text-black-80')}>
          <div className={css.favorites}>
            <div className={css.item}>
              <div className={cn(css.icon, 'bg-1-text-white-100')}>
                <Heart width={20} height={20} className="invert" />
              </div>
              <Link
                className="text-1-text-white-100"
                href={`/${locale}/favorites`}
              >
                {t('favorites.title')}
              </Link>
            </div>
          </div>
          <Link
            href={'https://t.me/nft_support_238'}
            passHref
            target="_blank"
            className={css.item}
          >
            <div className={cn(css.icon, 'bg-1-bg-white-100')}>
              <Headset width={20} height={20} className="invert" />
            </div>
            <Link
              href={'https://t.me/nft_support_238'}
              passHref
              target="_blank"
              className="text-1-text-white-100"
            >
              {t('support.title')}
            </Link>
          </Link>
          <div className={css.languageSwitcher}>
            <div className={css.item}>
              <div className={cn(css.icon, 'bg-1-bg-white-100')}>
                <Globe width={20} height={20} className="invert" />
              </div>
              <p className="text-1-text-white-100">{t('language.title')}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
}
