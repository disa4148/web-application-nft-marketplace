'use client'
import css from './sortingBar.module.scss';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SortingBarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export default function SortingBar({
  activeItem,
  onItemClick,
}: SortingBarProps): JSX.Element {
  const t = useTranslations('home.topCollections.sortingBar');

  const handleClick = (item: string) => {
    onItemClick(item);
  };

const [aaa, setAaa] = useState()

  return (
    <div className={css.wrapper}>
      <div
        className={activeItem === '1day' ? css.active : ''}
        onClick={() => handleClick('1day')}
      >
        <p>{t('1day')}</p>
      </div>
      <div
        className={activeItem === '7days' ? css.active : ''}
        onClick={() => handleClick('7days')}
      >
        <p>{t('7days')}</p>
      </div>
      <div
        className={activeItem === '30days' ? css.active : ''}
        onClick={() => handleClick('30days')}
      >
        <p>{t('30days')}</p>
      </div>
      <div
        className={activeItem === 'allTime' ? css.active : ''}
        onClick={() => handleClick('allTime')}
      >
        <p>{t('allTime')}</p>
      </div>
    </div>
  );
}
