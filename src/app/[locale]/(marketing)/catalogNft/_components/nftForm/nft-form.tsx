import Nft from '@/shared/ui/nft/nft';
import { nftItems } from '../../../_components/topCollections/nftItems';
import css from './nftForm.module.scss';

export default function NftForm() {
  return (
    <div className={css.cards}>
      {nftItems.map((item, index) => (
        <Nft
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
