import { useState, useEffect } from 'react';
import css from './searchInputNft.module.scss';
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
    }, 300); // Debounce time of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={css.wrapper}>
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
      />
    </div>
  );
}
