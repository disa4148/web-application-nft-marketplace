import Nft from '@/shared/ui/nft/nft';
import css from './nftForm.module.scss';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { NftItems } from '@/shared/interfaces/Collection';


type Props = {
  data: NftItems[];
};

export default function NftForm({ data }: Props): JSX.Element {
  const locale = useLocale();
  return (
    <div className={css.cards}>
      {data.map((item: NftItems, index) => (
        <Link key={index} href={`/${locale}/nftCard`}>
          <Nft
            name={item.name}
            price={item.price}
            total={item.price}
            image={item.image_url}
          />
        </Link>
      ))}
    </div>
  );
}
