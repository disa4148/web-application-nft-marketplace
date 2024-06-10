'use client';
import css from './Dropdowns.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { cn } from '@/shared/lib/utils';

import Link from 'next/link';

import { Wallet } from 'lucide-react';
import Image from 'next/image';
import ModalReplenish from '../../../modalWalletReplenish/modalReplenish';

type Props = {
  balance: number
}

export default function WalletDropdown({ balance }: Props): JSX.Element {
  const t = useTranslations('header.dropdown.profileMenu');
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        <div className={css.wallet}>
          <Wallet width={22} height={20} />
          <p>
            <span>{balance}</span>
          </p>
        </div>
      </div>
      {isOpen && (
        <div className={cn(css.content)}>
          <div onClick={() => setIsModalOpen(true)}>
            <div>
              <Image
                alt="wallet"
                src={'/assets/forTest/plWallet.svg'}
                width={22}
                height={24}
              />
            </div>
            <span>Пополнить</span>
          </div>
          <div onClick={() => console.log('fefeffefef')}>
            <div>
              <Image
                alt="wallet"
                src={'/assets/forTest/mnWallet.svg'}
                width={22}
                height={20}
              />
            </div>
            <span>Вывести</span>
          </div>
        </div>
      )}
      <ModalReplenish
        open={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div />
      </ModalReplenish>
    </div>
  );
}
