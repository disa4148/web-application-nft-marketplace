import Nft from '@/shared/ui/nft/nft';
import { nftItems } from '../../../_components/topCollections/nftItems';
import css from './nftForm.module.scss';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NftForm(): JSX.Element {
  const locale = useLocale();
  return (
    <div className={css.cards}>
      {nftItems.map((item, index) => (
        <Link key={index} href={`/${locale}/nftCard`}>
          <Nft
            name={item.name}
            price={item.price}
            total={item.total}
            imageCatalog={item.imageCatalog}
          />
        </Link>
      ))}
    </div>
  );
}
