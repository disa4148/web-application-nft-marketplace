'use client'
import { useFetchFavoriteQuery } from '@/shared/redux/features/favoriteApi';
import { nftItems } from '../../../_components/topCollections/nftItems';
import css from './nftForm.module.scss';
import FavoritesNft, { NftData } from '@/shared/ui/favoritesNft/favoritesNft';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@/shared/lib/cookie';


export default function NftForm() {

 const {data, isLoading} = useFetchFavoriteQuery({})
 const [nfts, setNfts] = useState<NftData[]>([]);

const [dataS, setDataS] = useState<any[]>([]);
const [isLoadingS, setIsLoading] = useState<boolean>(true);

console.log(data)

const accessToken = getAccessToken()
  console.log(accessToken)
 
  useEffect(() => {
    fetch('https://nft.levpidoor.ru/api/users/favorite', {
      headers: {
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(dataS => {
        setDataS(dataS);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
  if (data) {
    setNfts(data as unknown as NftData[]);
  }
}, [data]);


  return (
    <div className={css.cards}>
    {isLoadingS && (
      <div className='absolute w-[100%] h-[100%] grid place-items-center'>
        <LoadingSpinner />
      </div>
    )}
    {data &&
      nfts.map((item: any, index: any) => (
        <FavoritesNft
          id={item._id}
          nfts={nfts}
          setNfts={setNfts}
          key={index}
          name={item.name}
          price={item.price}
          total={item.total}
          imageCatalog={item.image_url}
        />
      ))}
  </div>
  );
}
