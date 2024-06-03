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
};

export default function InfoContainer({
  title,
  description,
  nftId,
  isFavorite,
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

  return (
    <div className={css.infoContainer}>
      <div className={css.topItems}>
        <div className={css.gradientText}>
          <p>{t('status')}</p>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Heart
            onClick={handleFavoriteClick}
            color={favorite ? 'red' : 'blue'}
            width={22}
            height={22}
          />
        )}
      </div>
      <div className={css.title}>
        <h1>{title}</h1>
        <h4>{description}</h4>
      </div>
    </div>
  );
}
