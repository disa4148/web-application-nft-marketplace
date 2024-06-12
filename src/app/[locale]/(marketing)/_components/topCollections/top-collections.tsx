'use client';
import css from './topCollections.module.scss';
import ButtonLoadMore from '@/shared/ui/buttonLoadMore/button-load-more';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetCollectionsQuery } from '@/shared/redux/features/collectionsApi';

import dynamic from 'next/dynamic';

import SkeletonDropDown from '@/shared/ui/dropdown/skeleton';
import SkeletonSortingBar from '@/shared/ui/sortingBar/skeleton';
import SkeletonMiniNft from '@/shared/ui/miniNft/skeleton';

import { toast } from 'sonner';

import { Collection } from '@/shared/interfaces/Collection';
import { Button } from '@/shared/ui/button';
import { RootState } from '@/shared/redux/store';
import Link from 'next/link';

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
  const locale = useLocale();

  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [count, setCount] = useState<number>(12);
  const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<string>('market_cap');

  const { data, isError } = useGetCollectionsQuery({ offset, count, sort });
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

  useEffect(() => {
    if (data) {
      setTotal(data.total);
      setIsLoading(false);
    }
    if (isError) {
      setError(new Error('Failed to fetch collections'));
      setIsLoading(false);
    }
  }, [data, isError]);

  if (error) {
    console.error('Failed to fetch collections:', error);
  }

  const keys: string[] = ['select.marketCap','select.numOwners'];
  const mobileKeys: string[] = ['mobileSelect.sold','mobileSelect.active','mobileSelect.public'];
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
  };

  const handleSelect = (option: Option) => {
    setSort(option.value);
  };

  const handleMobileSelect = (option: Option) => {
    setSort(option.value);
  };

  const handleLoadMore = () => {
    if (data && count >= total) {
      toast.info(t('messages.over'));
    } else {
      setCount((prevCount) => prevCount + 12);
    }
  };

  return isSignedIn ? (
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
        {data?.data.map((item: Collection, index: number) => (
          <MiniNft
            id={item._id}
            key={index}
            name={item.name}
            totalPrice={item.totalNftPrice}
            lowestPrice={item.lowestNftPrice}
            image={item.image_url}
          />
        ))}
      </div>
      <div className={css.btnMore}>
        <ButtonLoadMore onClick={handleLoadMore} disabled={count >= total}>
          {t('cards.btn')}
        </ButtonLoadMore>
      </div>
    </div>
  ) : (
    <div className={css.message}>
      <p className='text-1-text-white-100'>{t('unauthenticated.title')}</p>
      <Link href={`/${locale}/signin`}>
        <Button className={'bg-1-gradient'} variant={'default'}>
          {t('unauthenticated.btn')}
        </Button>
      </Link>
    </div>
  );
}
