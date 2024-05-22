'use client';
import css from './page.module.scss';
import Page from '@/shared/containers/page';
import { useTranslations } from 'next-intl';

import SearchInputNft from '@/shared/ui/searchInputNft/search-input-nft';
import Dropdown from '@/shared/ui/dropdown/dropdown';

import Banner from '@/shared/ui/banner/Banner';
import Avatar from '@/shared/ui/avatar/Avatar';

import NftForm from './_components/nftForm/nft-form';
import NftInfo from './_components/nftInfo';
import NftStats from './_components/nftStats';

type Option = {
  value: string;
  label: string;
};



export default function CatalogNft(): JSX.Element {
  const t = useTranslations('home.topCollections');
  const keys: string[] = [
    'select.popular',
    'select.inTime',
    'select.alphabetically',
  ];
  const selectItems: Option[] = keys.map((key) => ({
    value: t(`${key}.value`),
    label: t(`${key}.title`),
  }));

  const handleSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  return (
    <Page>
      <div className={css.wrapper}>
        <Banner bannerUrl="/assets/forTest/banner.png" />
        <div className={css.blockInfo}>
          <Avatar AvatarUrl="/assets/forTest/Avatar2.png" />
          <div className={css.infoUs}>
            <NftInfo
              collectionName="Telegram Usernames"
              owner="Telegram"
              description="Telegram Usernames - NFT посвященные аватаркам в телеграмме. Вы можете сделать свою уникальную аватарку, купив ее на NFTJET"
              items={9999}
              dateOfCreation={'18.05.2022'}
              network="Ethereum"
            />
            <div className={css.line}></div>
            <NftStats
              owners={{ owners: 1828, percentage: 18 }}
              volume={961}
              minPrice={0.0297}
            />
          </div>
          <div className={css.blockNft}>
            <div className={css.searchDrop}>
              <SearchInputNft />
              <div className={css.dropDown}>
                <Dropdown options={selectItems} onSelect={handleSelect} />
              </div>
            </div>
            <NftForm />
          </div>
        </div>
      </div>
    </Page>
  );
}
