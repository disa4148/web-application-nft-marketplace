'use client';
import css from './Dropdowns.module.scss'
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import LanguageSwitcher from './LanguageSwitcher';

import Link from 'next/link';

import { Globe, Headset, Menu, X, Heart } from 'lucide-react';

export default function BurgerDropdown(): JSX.Element {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('header.dropdown.burgerMenu');

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={css.dropdown}>
      <div className={css.trigger} onClick={toggleMenu}>
        {isOpen ? (
          <X width={26} height={26} className="invert" />
        ) : (
          <Menu width={26} height={26} className="invert" />
        )}
      </div>
      {isOpen && (
        <div className={css.content}>
          <div className={css.favorites}>
            <div className={css.item}>
              <div className={css.icon}>
                <Heart width={20} height={20} className="invert" />
              </div>
              <Link href={`/${locale}/favoritesNft`}>{t('favorites.title')}</Link>
            </div>
          </div>
          <div className={css.item}>
            <div className={css.icon}>
              <Headset width={20} height={20} className="invert" />
            </div>
            <Link href={'/'}>{t('support.title')}</Link>
          </div>
          <div className={css.languageSwitcher}>
            <div className={css.item}>
              <div className={css.icon}>
                <Globe width={20} height={20} className="invert" />
              </div>
              <p>{t('language.title')}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
}
