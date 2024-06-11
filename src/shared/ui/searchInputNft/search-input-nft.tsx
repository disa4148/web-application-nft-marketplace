import { useState, useEffect } from 'react';
import css from './searchInputNft.module.scss';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type SearchInputNftProps = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchInputNft({ onSearch }: SearchInputNftProps): JSX.Element {
  const t = useTranslations('header');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-80')}>
      <Image
        src={'/assets/icons/Loupe.svg'}
        width={18}
        height={18}
        alt="Loupe"
      />
      <input
        type="text"
        value={searchTerm}
        placeholder={t('inputPlaceholder')}
        onChange={handleInputChange}
        className='bg-1-bg-black-80 text-1-text-black-70'
      />
    </div>
  );
}
