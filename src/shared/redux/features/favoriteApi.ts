import { apiSlice } from '../api/apiSlice';
import { FavoriteNft } from '@/shared/interfaces/Favorite';

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFavorite: builder.mutation({
      query: (data) => ({
        url: `api/users/favorite`,
        method: 'POST',
        body: data,
      }),
    }),
    getFavorites: builder.query<any, void>({
      query: () => ({
        url: `api/users/favorite`,
        method: 'GET',
      }),
    }),
    deleteFavorite: builder.mutation<FavoriteNft, {nftId: string}>({
      query: (data) => ({
        url: `api/users/favorite/${data.nftId}`,
        method: 'DELETE',
      })
    })
  }),
});

export const { useAddFavoriteMutation, useGetFavoritesQuery, useDeleteFavoriteMutation } = favoriteApi;
