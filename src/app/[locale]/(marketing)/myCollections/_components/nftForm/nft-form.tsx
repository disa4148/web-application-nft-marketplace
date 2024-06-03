'use client'
import css from './nftForm.module.scss';
import MyCollections from '@/shared/ui/myNft/myNft';

import { useGetMyCollectionQuery } from '@/shared/redux/features/nftApi';

export default function NftForm(): JSX.Element {
  const { data: myCollection, error, isLoading } = useGetMyCollectionQuery();
  return (
    <div className={css.cards}>
      {myCollection?.map((item, index) => (
        <MyCollections
          key={index}
          nftId={item.nft._id}
          collectionId={item.nft.collectionId}
          name={item.nft.name}
          price={item.nft.price}
          image={item.nft.image_url}
        />
      ))}
    </div>
  );
}