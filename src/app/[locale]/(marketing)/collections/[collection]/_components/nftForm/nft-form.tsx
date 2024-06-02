import { useState, useEffect } from 'react';
import css from './nftForm.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { NftItems } from '@/shared/interfaces/Collection';
import dynamic from 'next/dynamic';
import NftCardSkeleton from '@/shared/ui/nft/skeleton';
import SkeletonSearchInputNft from '@/shared/ui/searchInputNft/skeleton-seatch-input-nft';
import SkeletonDropDown from '@/shared/ui/dropdown/skeleton';

const Nft = dynamic(() => import('@/shared/ui/nft/nft'), {
  ssr: false,
  loading: () => <NftCardSkeleton />,
});

const SearchInputNft = dynamic(() => import('@/shared/ui/searchInputNft/search-input-nft'), {
    ssr: false,
    loading: () => <SkeletonSearchInputNft />,
  });

const Dropdown = dynamic(() => import('@/shared/ui/dropdown/dropdown'), {
  ssr: false,
  loading: () => <SkeletonDropDown />,
});

interface Option {
  value: string;
  label: string;
}

type Props = {
  data?: NftItems[];
  idCollection?: string;
  handleSelect: (option: Option) => void;
};

export default function NftForm({
  data,
  idCollection,
  handleSelect,
}: Props): JSX.Element {
  const t = useTranslations('home.topCollections');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<NftItems[]>(data || []);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  const keys: string[] = ['select.marketCap', 'select.numOwners'];
  const selectItems: Option[] = keys.map((key) => ({
    value: t(`${key}.value`),
    label: t(`${key}.title`),
  }));

  return (
    <div className={css.blockNft}>
      <div className={css.searchDrop}>
        <SearchInputNft onSearch={setSearchTerm} />
        <div className={css.dropDown}>
          <Dropdown options={selectItems} onSelect={handleSelect} />
        </div>
      </div>
      {filteredData.length > 0 ? (
        <div className={css.cards}>
          {filteredData.map((item, index) => (
            <Nft
              key={index}
              href={`/${locale}/collections/${idCollection}/${item._id}`}
              name={item.name}
              price={item.price}
              total={item.price}
              image={item.image_url}
            />
          ))}
        </div>
      ) : (
        <div className={css.notFound}>
          <h1>{t('notFound')}</h1>
          <h2>{t('more')}</h2>
        </div>
      )}
    </div>
  );
}
