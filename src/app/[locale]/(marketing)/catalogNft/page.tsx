'use client';
import Page from '@/shared/containers/page';
import css from './page.module.scss';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import NftForm from './_components/nftForm/nft-form';
import SearchInputNft from '@/shared/ui/searchInputNft/search-input-nft';
import Dropdown from '@/shared/ui/dropdown/dropdown';

type Option = {
  value: string;
  label: string;
};

export default function CatalogNft(): JSX.Element {
  const t = useTranslations('catalogNft');
  const locale = useLocale();

  const drop = useTranslations('home.topCollections');
  const keys: string[] = [
    'select.popular',
    'select.inTime',
    'select.alphabetically',
  ];
  const selectItems: Option[] = keys.map((key) => ({
    value: drop(`${key}.value`),
    label: drop(`${key}.title`),
  }));

  const handleSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  return (
    <Page>
      <div className={css.blockInfo}>
        <div className={css.infoUs}>
          <div className={css.users}>
            <div>
              <div>
                <p>Telegram Usernames</p>
                <Image
                  src={'/assets/icons/verified.svg'}
                  alt="Verified"
                  width={16}
                  height={16}
                />
              </div>
              <div>
                <p>Telegram</p>
                <Image
                  src={'/assets/icons/verified.svg'}
                  alt="Verified"
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <div>
              <p>{t('description')}</p>
              <div className={css.underInfo}>
                <div className={css.items}>
                  <p>{t('items')}</p>
                  <p>9 999</p>
                </div>
                <div className={css.dateCreate}>
                  <p>{t('dateCreated')}</p>
                  <p>30 июля 2023</p>
                </div>
                <div className={css.network}>
                  <p>{t('network')}</p>
                  <p>Ethereum</p>
                </div>
              </div>
            </div>
          </div>
          <div className={css.line}></div>
          <div className={css.fullInfo}>
            <div className={css.volume}>
              <p>961 ETH</p>
              <p>{t('volume')}</p>
            </div>
            <div className={css.price}>
              <p>0,0297 ETH</p>
              <p>{t('minPrice')}</p>
            </div>
            <div className={css.offer}>
              <p>0,0236 ETH</p>
              <p>{t('offer')}</p>
            </div>
            <div className={css.owners}>
              <p>1 828 (18%)</p>
              <p>{t('owners')}</p>
            </div>
          </div>
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
    </Page>
  );
}
