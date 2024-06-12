import css from './favoritesNft.module.scss';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useDeleteFavoriteMutation } from '@/shared/redux/features/favoriteApi';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { toast } from 'sonner';

export interface NftData {
  _id: string;
  name: string;
  description: string | null;
  image_url: string;
  collectionId: string;
  price: number;
  owner: {
    _id: string;
    name: string;
    emoji: string;
    __v: number;
  };
  id: string;
}

type Props = {
  id: string;
  collectionId: string;
  imageCatalog: string;
  name: string;
  price: number;
  total: number;
  nfts: NftData[];
  refetchNftData: () => void;
};

export default function FavoritesNft({
  name,
  price,
  total,
  imageCatalog,
  id,
  collectionId,
  refetchNftData,
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.card');
  const locale = useLocale();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const removeNft = async (id: string) => {
    toast.loading(t('messages.loading'))
    try {
      const deleteS = await deleteFavorite({ nftId: id }).unwrap();
      toast.success(t('messages.success'));
      refetchNftData();
    } catch {
      toast.error(t('messages.error'))
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <div>
        <Link href={`/${locale}/collections/${collectionId}/${id}`}>
          <Image
            className={css.imgNft}
            src={imageCatalog}
            alt="NFT"
            width={237}
            height={154}
          />
        </Link>
        <div className={cn(css.heartBlock, 'bg-1-bg-black-100')}>
          <Image
            src={`/assets/icons/blueHeart.svg`}
            alt="NFT"
            width={17}
            height={15}
            onClick={() => removeNft(id)}
          />
        </div>
      </div>
      <Link
        href={`/${locale}/collections/${collectionId}/${id}`}
        className={css.fullBlock}
      >
        <div className={css.namePrice}>
          <div>
            <h3 className={cn(css.nameNft, 'text-1-text-white-100')}>{name}</h3>
          </div>
          <div className={css.priceBlock}>
            <h4 className="text-1-text-white-100">{price}</h4>
            <span className="text-1-text-white-100">ETH</span>
          </div>
        </div>
        <div className={css.lastSale}>
          <span className="text-1-text-white-100">{t('lastSale')}</span>
          <h4 className="text-1-text-white-100">{total}</h4>
          <span className="text-1-text-white-100">ETH</span>
        </div>
      </Link>
    </div>
  );
}
