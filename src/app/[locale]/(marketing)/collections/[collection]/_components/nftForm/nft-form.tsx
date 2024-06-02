import css from './nftForm.module.scss';
import { useLocale } from 'next-intl';
import { NftItems } from '@/shared/interfaces/Collection';
import dynamic from 'next/dynamic';
import NftCardSkeleton from '@/shared/ui/nft/skeleton';

const Nft = dynamic(() => import('@/shared/ui/nft/nft'), {
  ssr: false,
  loading: () => <NftCardSkeleton />,
});

type Props = {
  data?: NftItems[];
  idCollection?: string;
};

export default function NftForm({ data, idCollection }: Props): JSX.Element {
  const locale = useLocale();
  return (
    <div className={css.cards}>
      {data?.map((item: NftItems, index: number) => (
        <Nft
          key={index}
          href={`/${locale}/collections/${idCollection}/${item._id}`}
          name={item.name}
          price={item.price}
          total={item.price}
          image={item.image_url}
        />
      ))}
    </div>
  );
}
