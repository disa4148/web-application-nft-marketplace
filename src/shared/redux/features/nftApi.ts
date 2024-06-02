import { apiSlice } from '../api/apiSlice';
import { MyCollectionResponse, NftResponse } from '@/shared/interfaces/Nft';

export const nftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNft: builder.query<NftResponse, { nftId: string }>({
      query: ({ nftId }) => ({
        url: `api/nft/${nftId}`,
        method: 'GET',
      }),
    }),
    buyNft: builder.mutation<void, { nftId: string }>({
      query: (data) => ({
        url: `api/marketplace/buy/${data.nftId}`,
        method: 'POST',
        body: data,
      }),
    }),
    getMyCollection: builder.query<MyCollectionResponse[], void>({
      query: () => ({
        url: `api/users/collection`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNftQuery, useBuyNftMutation, useGetMyCollectionQuery } = nftApi;
