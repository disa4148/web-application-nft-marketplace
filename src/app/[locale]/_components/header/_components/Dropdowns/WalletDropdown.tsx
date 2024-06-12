'use client';
import css from './Wallet.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';

import { Wallet } from 'lucide-react';
import Image from 'next/image';

import ModalReplenish from '../../../modalWalletReplenish/modalReplenish';
import ModalConclusion from '../../../modalWalletConclusion/modalConclusion';

type Props = {
  balance: number;
};

export default function WalletDropdown({ balance }: Props): JSX.Element {
  const t = useTranslations('header.dropdown.walletMenu');

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
        <div className={cn(css.wallet, 'bg-1-bg-black-80') }>
          <Wallet width={22} height={20} />
          <p>
            <span className='text-1-text-white-100'>{balance} ETH</span>
          </p>
        </div>
      </div>
      {isOpen && (
        <div className={cn(css.content, 'bg-1-bg-black-80')}>
          <div className={css.replenish} onClick={() => setIsModalReplenish(true)}>
            <div className={cn(css.backImg, 'bg-1-bg-white-100')}>
              <Image
                alt="wallet"
                src={'/assets/forTest/plWallet.svg'}
                width={22}
                height={24}
              />
            </div>
            <span className='text-1-text-white-100 cursor-pointer'>{t("replenish")}</span>
          </div>
          <div className={css.conclusion} onClick={() => setIsModalConclusion(true)}>
            <div className={cn(css.backImg, 'bg-1-bg-white-100')}>
              <Image
                alt="wallet"
                src={'/assets/forTest/mnWallet.svg'}
                width={22}
                height={20}
              />
            </div>
            <span className='text-1-text-white-100 cursor-pointer'>{t("withdraw")}</span>
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
