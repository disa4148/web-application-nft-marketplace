'use client';
import css from './page.module.scss';
import Page from '@/shared/containers/page';
import { useTranslations } from 'next-intl';
import SearchInputNft from '@/shared/ui/searchInputNft/search-input-nft';
import Dropdown from '@/shared/ui/dropdown/dropdown';
import { useGetCollectionQuery } from '@/shared/redux/features/collectionsApi';
import { useState } from 'react';
import { useFormatNumber } from '@/shared/lib/hooks/useFormatNumber';
import { useFormatDate } from '@/shared/lib/hooks/useFormatDate';
import ButtonLoadMore from '@/shared/ui/buttonLoadMore/button-load-more';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
type Option = {
  value: string;
  label: string;
};

export default function CatalogNft({
  params,
}: {
  params: { collection: string };
}) {
  const Banner = dynamic(() => import('@/shared/ui/banner/Banner'), {
    ssr: false,
  });
  const NftForm = dynamic(() => import('./_components/nftForm/nft-form'), {
    ssr: false,
  });
  const NftInfo = dynamic(() => import('./_components/nftInfo'), {
    ssr: false,
  });
  const Avatar = dynamic(() => import('@/shared/ui/avatar/Avatar'), {
    ssr: false,
  });
  const NftStats = dynamic(() => import('./_components/nftStats'), {
    ssr: false,
  });
  const t = useTranslations('home.topCollections');
  const [count, setCount] = useState<number>(10);

  const { data: collectionData, isLoading } = useGetCollectionQuery({
    collectionId: params.collection,
    count: count,
    offset: 1,
  });
  console.log('НФТ Коллекция:', collectionData);
  const keys: string[] = ['select.marketCap', 'select.numOwners'];
  const selectItems: Option[] = keys.map((key) => ({
    value: t(`${key}.value`),
    label: t(`${key}.title`),
  }));

  const handleSelect = (option: Option) => {
    console.log('Selected option:', option);
  };

  const handleLoadMore = () => {
    if (collectionData && count >= collectionData.total) {
      toast.info(t('messages.over'));
    } else {
      setCount((prevCount) => prevCount + 10);
    }
  };

  const collection = collectionData?.collection;
  const formatLowestPrice = useFormatNumber(collection?.lowestNftPrice);
  const formatOffers = useFormatNumber(collection?.totalNftPrice);
  const formatCount = useFormatNumber(collection?.totalNftCount);

  const formatDateCreate = useFormatDate(collection?.createdAt);
  const total = collectionData?.total;
  return (
    <Page>
      <div className={css.wrapper}>
        <Banner bannerUrl={collection?.banner_image_url} />

        <div className={css.blockInfo}>
          <Avatar AvatarUrl={collection?.image_url} />
          <div className={css.infoUs}>
            <NftInfo
              collectionName={collection?.name}
              owner={collection?.collection}
              description={collection?.description}
              items={collection?.totalNftCount}
              dateOfCreation={formatDateCreate}
              network="Ethereum"
            />
            <div className={css.line}></div>
            <NftStats
              owners={formatCount}
              volume={formatOffers}
              minPrice={formatLowestPrice}
              bestOffer={formatOffers}
            />
          </div>
          <div className={css.blockNft}>
            <div className={css.searchDrop}>
              <SearchInputNft />
              <div className={css.dropDown}>
                <Dropdown options={selectItems} onSelect={handleSelect} />
              </div>
            </div>
            <NftForm
              idCollection={collection?._id}
              data={collectionData?.data}
            />
          </div>
          <div className={css.btnMore}>
            <ButtonLoadMore
              onClick={handleLoadMore}
              disabled={count >= (total as number)}
            >
              {t('cards.btn')}
            </ButtonLoadMore>
          </div>
        </div>
      </div>
    </Page>
  );
}
