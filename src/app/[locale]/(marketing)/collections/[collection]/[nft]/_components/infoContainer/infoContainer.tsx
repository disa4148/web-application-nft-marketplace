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
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
  const [deleteFavorite, { isLoading: isDeleting }] = useDeleteFavoriteMutation();
  const loading = isAdding || isDeleting;

  const handleFavoriteClick = async () => {
    if (favorite) {
      try {
        setFavorite(false);
        await deleteFavorite({ nftId }).unwrap();
      } catch (error) {
        setFavorite(true);
        console.error('Error deleting favorite:', error);
      }
    } else {
      try {
        setFavorite(true);
        await addFavorite({ nftId }).unwrap();
      } catch (error) {
        setFavorite(false);
        console.error('Error adding favorite:', error);
      }
    }
  };

  const status = isMine ? t('status.your') : onSale ? t('status.onSale') : t('status.sold');

  return (
    <div className={css.infoContainer}>
      <div className={css.topItems}>
        <div className={css.gradientText}>
          <p className='bg-1-gradient before:bg-1-gradient'>{status}</p>
        </div>
        {isMine ? null : loading ? (
          <LoadingSpinner />
        ) : (
          <Heart
            onClick={handleFavoriteClick}
            color={favorite ? '#4592f7' : 'white'}
            fill={favorite ? '#4592f7' : ''}
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
