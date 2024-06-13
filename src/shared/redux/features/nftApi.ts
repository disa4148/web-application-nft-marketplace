import { apiSlice } from '../api/apiSlice';
import { NftResponse } from '@/shared/interfaces/Nft';
import { MyCollectionResponse } from '@/shared/interfaces/Marketplace';

export const nftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNft: builder.query<NftResponse, { nftId: string }>({
      query: ({ nftId }) => ({
        url: `api/nft/${nftId}`,
        method: 'GET',
      }),
    }),
    buyNft: builder.mutation<any, { nftId: string }>({
      query: (data) => ({
        url: `api/marketplace/buy/${data.nftId}`,
        method: 'POST',
        body: data,
      }),
    }),
    saleNft: builder.mutation<any, { nftId: string; price: number }>({
      query: (data) => ({
        url: `api/marketplace/sale`,
        method: 'POST',
        body: data,
      }),
    }),
    changeNftPrice: builder.mutation<void, { nftId: string; price: number }>({
      query: (data) => ({
        url: `api/marketplace/update-price`,
        method: 'PUT',
        body: data,
      }),
    }),
    deregisterNft: builder.mutation<void, { nftId: string }>({
      query: (data) => ({
        url: `api/marketplace/remove-sale/${data.nftId}`,
        method: 'DELETE',
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

export const {
  useGetNftQuery,
  useBuyNftMutation,
  useGetMyCollectionQuery,
  useSaleNftMutation,
  useChangeNftPriceMutation,
  useDeregisterNftMutation,
} = nftApi;
