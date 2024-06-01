import css from './favoritesNft.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteFavoriteMutation } from '@/shared/redux/features/favoriteApi';

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
  imageCatalog: string;
  name: string;
  price: number;
  total: number;
  setNfts: Dispatch<SetStateAction<NftData[]>>,
  nfts: NftData[]
};

export default function FavoritesNft({
  name,
  price,
  total,
  imageCatalog,
  setNfts,
  nfts,
  id
}: Props): JSX.Element {
  const t = useTranslations('catalogNft.card');

  const [deleteFavorite] = useDeleteFavoriteMutation()

  const removeNft = async (id:string) => {
    setNfts(nfts.filter(nft => nft.id !== id));
    const deleteS = await deleteFavorite({nftId:id})
    console.log(deleteS)
  };


  return (
    <div className={css.wrapper}>
      <div>
        <Image
        className={css.imgNft}
          src={imageCatalog}
          alt="NFT"
          width={237}
          height={154}
        />
        <div className={css.heartBlock}>
          <Image
            src={`/assets/icons/blueHeart.svg`}
            alt="NFT"
            width={17}
            height={15}
            onClick={() => removeNft(id)}
          />
        </div>
      </div>
      <div className={css.fullBlock}>
        <div className={css.namePrice}>
          <div>
            <h3 className={css.nameNft}>{name}</h3>
          </div>
          <div className={css.priceBlock}>
            <h4>{price}</h4>
            <span>ETH</span>
          </div>
        </div>
        <div className={css.lastSale}>
          <span>{t('lastSale')}</span>
          <h4>{total}</h4>
          <span>ETH</span>
        </div>
      </div>
    </div>
  );
}
