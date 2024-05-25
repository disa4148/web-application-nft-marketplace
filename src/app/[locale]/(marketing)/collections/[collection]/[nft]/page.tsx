'use client';
import css from './nft.module.scss';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetNftQuery } from '@/shared/redux/features/nftApi';

import Page from '@/shared/containers/page';
import Image from 'next/image';

import PriceContainer from './_components/priceContainer/priceContainer';
import InfoContainer from './_components/infoContainer/infoContainer';
import OwnerCard from './_components/ownerCard/OwnerCard';
import Offers from './_components/tabs/offers/Offers';
import PriceHistory from './_components/tabs/priceHistory/PriceHistory';

import { NftItem } from '@/shared/interfaces/Nft';

interface Tab {
  label: string;
  content: React.ReactNode;
}

export default function NftCard({ params }: { params: { collection: string } }) {
  const t = useTranslations('nftCard');

  const { data: nftData, isSuccess } = useGetNftQuery({
    nftId : params.collection
  });
  if (isSuccess) {
    console.log("НФТ Дата: ", nftData)
  }
  
  const [activeTab, setActiveTab] = useState<number>(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  const tabs: Tab[] = [
    { label: t('tabs.offers.title'), content: <Offers /> },
    { label: t('tabs.historyPrice.title'), content: <PriceHistory /> },
  ];


  // const data = nftData?.data
  // const data = nftData?.data.map((item: NftItem, index: number) => ())

  return (
    <Page padding>
      <div className={css.wrapper}>
     { nftData?.data.map((item: NftItem, index: number) => (
        <div className={css.top} key={index}>
          <div className={css.leftItems}>
            <Image
              src={item.image_url}
              alt="nft"
              width={442}
              height={442}
            />
          </div>
          <div className={css.rightItems}>
            <InfoContainer
              title={item.name}
              description={item.description}
            />
            <PriceContainer price={item.price} />
            <div className={css.tabsContainer}>
              <div className={css.tabs}>
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`${css.tabLabel} ${
                      index === activeTab ? css.activeTab : ''
                    }`}
                    onClick={() => changeTab(index)}
                  >
                    <h4>{tab.label}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className={css.ownerWrapper}>
              <OwnerCard
                img="tgNft.png"
                title={t('ownerBlock.collection')}
                content="Telegram Usernames"
                verified
              />
              <OwnerCard
                img={item.owner.emoji}
                title={t('ownerBlock.owner')}
                content={item.owner.name}
                verified={false}
              />
            </div>
          </div>
        </div>
))}
        <div className={css.tabsContent}>{tabs[activeTab].content}</div>
      </div>
    </Page>
  );
}
