import css from './sortingBar.module.scss';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

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

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-80')}>
      <div
        className={activeItem === '1day' ? 'bg-1-bg-active_b-100 transition-all' : ''}
        onClick={() => handleClick('1day')}
      >
        <p className='text-1-text-white-100'>{t('1day')}</p>
      </div>
      <div
        className={activeItem === '7days' ? 'bg-1-bg-active_b-100 transition-all' : ''}
        onClick={() => handleClick('7days')}
      >
        <p className='text-1-text-white-100'>{t('7days')}</p>
      </div>
      <div
        className={activeItem === '30days' ? 'bg-1-bg-active_b-100 transition-all' : ''}
        onClick={() => handleClick('30days')}
      >
        <p className='text-1-text-white-100'>{t('30days')}</p>
      </div>
      <div
        className={activeItem === 'allTime' ? 'bg-1-bg-active_b-100 transition-all' : ''}
        onClick={() => handleClick('allTime')}
      >
        <p className='text-1-text-white-100'>{t('allTime')}</p>
      </div>
    </div>
  );
}
