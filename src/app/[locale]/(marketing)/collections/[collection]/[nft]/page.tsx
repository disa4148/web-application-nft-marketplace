'use client';
import css from './nft.module.scss';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetNftQuery } from '@/shared/redux/features/nftApi';

import Page from '@/shared/containers/page';
import Image from 'next/image';

import PriceHistory from './_components/tabs/priceHistory/PriceHistory';
import dynamic from 'next/dynamic';
import SkeletonInfo from './_components/infoContainer/sekeletonInfo';
import SkeletonPrice from './_components/priceContainer/skeletonPrice';
import SkeletonOwner from './_components/ownerCard/skeletonOwner';
import SkeletonOffers from './_components/tabs/offers/skeletonOffers';

interface Tab {
  label: string;
  content: React.ReactNode;
}

export default function NftCard({ params }: { params: { nft: string } }) {
  const t = useTranslations('nftCard');

  const {
    data: nftData,
    isSuccess,
    isLoading,
  } = useGetNftQuery({ nftId: params.nft });

  const [activeTab, setActiveTab] = useState<number>(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  const Offers = dynamic(() => import ('./_components/tabs/offers/Offers'), {
    ssr: false,
    loading: () => <SkeletonOffers />
  })

  const tabs: Tab[] = [
    { label: t('tabs.offers.title'), content: <Offers /> },
    { label: t('tabs.historyPrice.title'), content: <PriceHistory /> },
  ];

  const InfoContainer = dynamic(() => import ('./_components/infoContainer/infoContainer'), {
    ssr: false,
    loading: () => <SkeletonInfo />
  })

  const PriceContainer = dynamic(() => import ('./_components/priceContainer/priceContainer'), {
    ssr: false,
    loading: () => <SkeletonPrice />
  })

  const OwnerCard = dynamic(() => import ('./_components/ownerCard/OwnerCard'), {
    ssr: false,
    loading: () => <SkeletonOwner />
  })

  if (isSuccess && nftData) {
    return (
      <Page padding>
        <div className={css.wrapper}>
          <div className={css.top}>
            <div className={css.leftItems}>
              <Image
                src={nftData.image_url}
                alt="nft"
                width={442}
                height={442}
              />
            </div>
            <div className={css.rightItems}>
              <InfoContainer
                title={nftData.name}
                description={nftData.description}
                nftId={nftData._id}
                isFavorite={nftData.isFavorite}
              />
              <PriceContainer
                modalTitle={nftData.name}
                modalDescription={nftData.description}
                modalImage={nftData.image_url}
                price={nftData.price}
              />
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
                  img={nftData.collectionId.image_url}
                  title={t('ownerBlock.collection')}
                  content={nftData.collectionId.name}
                  verified
                  idCollection={nftData.collectionId._id}
                />
                <OwnerCard
                  // img="owner.png"
                  title={t('ownerBlock.owner')}
                  content={nftData.owner.name}
                  verified={false}
                />
              </div>
            </div>
          </div>
          <div className={css.tabsContent}>{tabs[activeTab].content}</div>
        </div>
      </Page>
    );
  } 
}
