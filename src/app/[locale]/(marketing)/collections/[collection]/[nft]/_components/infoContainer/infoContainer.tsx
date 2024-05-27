import css from './infoContainer.module.scss';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAddFavoriteMutation, useFetchFavoriteQuery, useDeleteFavoriteMutation } from '@/shared/redux/features/favoriteApi';

type Props = {
  title: string;
  description: string | null;
  nftId: string
};

export default function InfoContainer({
  title,
  description,
  nftId
}: Props): JSX.Element {
  const t = useTranslations('nftCard.infoBlock');

  const [favorite, setFavorite] = useState(false);
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
  const { data: favoriteData } = useFetchFavoriteQuery({ nftId });

  useEffect(() => {
    setFavorite(!!favoriteData); 
  }, [favoriteData]);

  const handleFavoriteClick = async () => {
    if (isAdding) return; 

    setFavorite(!favorite);

    if (!favorite) {
      await addFavorite({ nftId });
      console.log(favoriteData)
    } else {

    }
  };


  return (
    <div className={css.infoContainer}>
      <div className={css.topItems}>
        <div className={css.gradientText}>
          <p>{t('status')}</p>
        </div>
        <Heart
          onClick={handleFavoriteClick}
          color={favorite ? 'red' : 'blue'}
          width={22}
          height={22}
        />
      </div>
      <div className={css.title}>
        <h1>{title}</h1>
        <h4>{description}</h4>
      </div>
    </div>
  );
}
