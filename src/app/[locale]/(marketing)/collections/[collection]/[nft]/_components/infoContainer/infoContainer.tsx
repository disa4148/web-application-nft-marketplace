import css from './infoContainer.module.scss';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '@/shared/redux/features/favoriteApi';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';

type Props = {
  title: string;
  description: string | null;
  nftId: string;
  isFavorite: boolean;
  onSale: boolean;
  isMine: boolean;
};

export default function InfoContainer({
  title,
  description,
  nftId,
  isFavorite,
  onSale,
  isMine,
}: Props): JSX.Element {
  const t = useTranslations('nftCard.infoBlock');

  const [favorite, setFavorite] = useState(isFavorite);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async () => {
    if (favorite) {
      setLoading(true);
      setFavorite(false);
      await deleteFavorite({ nftId });
      setLoading(false);
    } else {
      setLoading(true);
      setFavorite(true);
      await addFavorite({ nftId });
      setLoading(false);
    }
  };

  const status = isMine ? t('status.your') : onSale ? t('status.onSale') : t('status.sold');

  return (
    <div className={css.infoContainer}>
      <div className={css.topItems}>
        <div className={css.gradientText}>
          <p className='bg-1-gradient before:bg-1-gradient'>{status}</p>
        </div>
        {isMine ? ('') : loading ? (
          <LoadingSpinner />
        ) : (
          <Heart
            onClick={handleFavoriteClick}
            color={favorite ? 'red' : 'white'}
            width={22}
            height={22}
          />
        )}
      </div>
      <div className={css.title}>
        <h1 className='text-1-text-white-100'>{title}</h1>
        <h4 className='text-1-text-white-100'>{description}</h4>
      </div>
    </div>
  );
}
