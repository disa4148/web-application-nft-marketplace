'use client';
import css from './topCollections.module.scss';

import ButtonLoadMore from '@/shared/ui/buttonLoadMore/button-load-more';

import { nftItems } from './nftItems';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import SkeletonDropDown from './_components/skeletonDropDown';
import SkeletonSortingBar from './_components/skeletonSortingBar';
import SkeletonMiniNft from './_components/skeletonMiniNft';

type Option = {
  value: string;
  label: string;
};

const Dropdown = dynamic(() => import('@/shared/ui/dropdown/dropdown'), {
  ssr: false,
  loading: () => <SkeletonDropDown />,
});

const SortingBar = dynamic(() => import('@/shared/ui/sortingBar/sorting-bar'), {
  ssr: false,
  loading: () => <SkeletonSortingBar />,
});

const MiniNft = dynamic(() => import('@/shared/ui/miniNft/mini-nft'), {
  ssr: false,
  loading: () => <SkeletonMiniNft />,
});

export default function TopCollections(): JSX.Element {
  const t = useTranslations('home.topCollections');
  const keys: string[] = [
    'select.popular',
    'select.inTime',
    'select.alphabetically',
  ];
  const mobileKeys: string[] = [
    'mobileSelect.sold',
    'mobileSelect.active',
    'mobileSelect.public',
  ];
  const [selectedDateSort, setSelectedDateSort] = useState<string>('1day');

  const selectItems: Option[] = keys.map((key) => ({
    value: t(`${key}.value`),
    label: t(`${key}.title`),
  }));

  const mobileSelectItems: Option[] = mobileKeys.map((key) => ({
    value: t(`${key}.value`),
    label: t(`${key}.title`),
  }));

  const handleSortDateClick = (selectedItem: string): void => {
    setSelectedDateSort(selectedItem);
    console.log('selectedDateSort:', selectedItem);
  };

  const handleSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  const handleMobileSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.backgroundImage}></div>
      <div className={css.header}>
        <div className={css.select}>
          <Dropdown options={selectItems} onSelect={handleSelect} />
        </div>
        <div className={css.sortingBar}>
          <SortingBar
            activeItem={selectedDateSort}
            onItemClick={handleSortDateClick}
          />
        </div>
        <div className={css.mobileSelect}>
          <Dropdown options={mobileSelectItems} onSelect={handleMobileSelect} />
        </div>
      </div>
      <div className={css.cards}>
        {nftItems.map((item, index: number) => (
          <MiniNft
            key={index}
            name={item.name}
            percentage={item.percentage}
            price={item.price}
            total={item.total}
            image={item.image}
          />
        ))}
      </div>
      <div className={css.btnMore}>
        <ButtonLoadMore>{t('cards.btn')}</ButtonLoadMore>
      </div>
    </div>
  );
}
