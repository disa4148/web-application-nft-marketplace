'use client';
import css from './topCollections.module.scss';
import ButtonLoadMore from '@/shared/ui/buttonLoadMore/button-load-more';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SkeletonDropDown from '@/shared/ui/dropdown/skeleton';
import SkeletonSortingBar from '@/shared/ui/sortingBar/skeleton';
import SkeletonMiniNft from '@/shared/ui/miniNft/skeleton';
import { toast } from 'sonner';
import { Collection, CollectionResponse } from '@/shared/interfaces/Collection';

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
  const [data, setData] = useState<Collection[] | null>(null);
  const [total, setTotal] = useState<number>(0); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [count, setCount] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://nft.levpidoor.ru/api/collection?offset=1&count=${count}&sort=one_day_change`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: CollectionResponse = await response.json();
        setData(result.data);
        setTotal(result.total);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [count]);

  if (error) {
    console.error('Failed to fetch collections:', error);
    toast.error('Failed to fetch collections');
  }

  if (data) {
    console.log('Fetched data:', data);
  } else {
    console.log('No data fetched');
  }

  const keys: string[] = ['select.popular','select.inTime','select.alphabetically'];
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
    console.log('selectedDateSort:', selectedItem);
  };

  const handleSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  const handleMobileSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  const handleLoadMore = () => {
    if (data && count >= total) {
      toast.info("Вы отобразили все доступные коллекции");
    } else {
      setCount((prevCount) => prevCount + 12);
    }
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
        {data?.map((item: Collection, index: number) => (
          <MiniNft
            key={index}
            name={item.name}
            percentage={0} 
            price={0} 
            total={0} 
            image={item.image_url}
          />
        ))}
      </div>
      <div className={css.btnMore}>
        <ButtonLoadMore onClick={handleLoadMore}>{t('cards.btn')}</ButtonLoadMore>
      </div>
    </div>
  );
}
