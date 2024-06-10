'use client';
import css from './Wallet.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { cn } from '@/shared/lib/utils';

import Link from 'next/link';

import { Wallet } from 'lucide-react';
import Image from 'next/image';
import ModalReplenish from '../../../modalWalletReplenish/modalReplenish';
import ModalConclusion from '../../../modalWalletConclusion/modalConclusion';

type Props = {
  balance: number;
};

export default function WalletDropdown({ balance }: Props): JSX.Element {
  const t = useTranslations('header.dropdown.profileMenu');
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalReplenish, setIsModalReplenish] = useState<boolean>(false);
  const [isModalConclusion, setIsModalConclusion] = useState<boolean>(false);
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
      <div className={css.wallet} onClick={toggleMenu}>
        <div className={css.wallet}>
          <Wallet width={22} height={20} />
          <p>
            <span>{balance} ETH</span>
          </p>
        </div>
      </div>
      {isOpen && (
        <div className={cn(css.content)}>
          <div className={css.replenish} onClick={() => setIsModalReplenish(true)}>
            <div className={css.backImg}>
              <Image
                alt="wallet"
                src={'/assets/forTest/plWallet.svg'}
                width={22}
                height={24}
              />
            </div>
            <span>Пополнить</span>
          </div>
          <div className={css.conclusion} onClick={() => setIsModalConclusion(true)}>
            <div className={css.backImg}>
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
        open={isModalReplenish}
        setIsOpen={setIsModalReplenish}
      ></ModalReplenish>

      <ModalConclusion
        open={isModalConclusion}
        setIsOpen={setIsModalConclusion}
      ></ModalConclusion>
      <div />
    </div>
  );
}
