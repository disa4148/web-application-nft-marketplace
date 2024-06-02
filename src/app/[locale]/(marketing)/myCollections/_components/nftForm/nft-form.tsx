import { nftItems } from '../../../_components/topCollections/nftItems';
import css from './nftForm.module.scss';
import MyCollections from '@/shared/ui/myNft/myNft';

// import { useGetMyCollectionQuery } from '@/shared/redux/features/nftApi';

export default function NftForm(): JSX.Element {
  // const { data: myCollection, error, isLoading } = useGetMyCollectionQuery();
  return (
    <div className={css.cards}>
      {nftItems.map((item, index) => (
        <MyCollections
          key={index}
          name={item.name}
          price={item.price}
          imageCatalog={item.imageCatalog}
        />
      ))}
    </div>
  );
}