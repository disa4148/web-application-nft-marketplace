import MaxNft from '@/shared/ui/maxNft/max-nft';
import { nftItems } from '../../../_components/topCollections/nftItems';
import css from './nftForm.module.scss';

interface Props {}

export default function NftForm() {
  return (
    <div className={css.cards}>
      {nftItems.map((item, index) => (
        <MaxNft
          key={index}
          name={item.name}
          price={item.price}
          total={item.total}
          imageCatalog={item.imageCatalog}
        />
      ))}
    </div>
  );
}