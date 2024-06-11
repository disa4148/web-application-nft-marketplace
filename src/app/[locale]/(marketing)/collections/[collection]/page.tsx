'use client';
import { useState } from 'react';
import css from './page.module.scss';
import Page from '@/shared/containers/page';
import { useTranslations } from 'next-intl';
import { useGetCollectionQuery } from '@/shared/redux/features/collectionsApi';
import { useFormatNumber } from '@/shared/lib/hooks/useFormatNumber';
import { useFormatDate } from '@/shared/lib/hooks/useFormatDate';

import ButtonLoadMore from '@/shared/ui/buttonLoadMore/button-load-more';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

import SkeletonAvatar from '@/shared/ui/avatar/skeleton';
import SkeletonBanner from '@/shared/ui/banner/skeleton';
import NftInfoSkeleton from './_components/skeletons/nftInfoSkeleton';
import NftStatsSkeleton from './_components/skeletons/nftStatsSkeleton';
import NftForm from './_components/nftForm/nft-form';

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
    loading: () => <SkeletonBanner />,
  });

  const NftInfo = dynamic(() => import('./_components/nftInfo'), {
    ssr: false,
    loading: () => <NftInfoSkeleton />,
  });
  const Avatar = dynamic(() => import('@/shared/ui/avatar/Avatar'), {
    ssr: false,
    loading: () => <SkeletonAvatar />,
  });
  const NftStats = dynamic(() => import('./_components/nftStats'), {
    ssr: false,
    loading: () => <NftStatsSkeleton />,
  });

  const t = useTranslations('home.topCollections');
  const [count, setCount] = useState<number>(10);
  const [sort, setSort] = useState<string>('market_cap');

  const { data } = useGetCollectionQuery({
    collectionId: params.collection,
    count: count,
    offset: 1,
  });

  const handleSelect = (option: Option) => {
    setSort(option.value);
  };

  const handleLoadMore = () => {
    if (data && count >= data.total) {
      toast.info(t('messages.over'));
    } else {
      setCount((prevCount) => prevCount + 10);
    }
  };

  const collection = data?.collection;
  const formatLowestPrice = useFormatNumber(collection?.lowestNftPrice);
  const formatOffers = useFormatNumber(collection?.totalNftPrice);
  const formatCount = useFormatNumber(collection?.totalNftCount);

  const formatDateCreate = useFormatDate(collection?.createdAt);
  const total = data?.total;

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
          <NftForm
            handleSelect={handleSelect}
            idCollection={collection?._id}
            data={data?.data}
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
    </Page>
  );
}
