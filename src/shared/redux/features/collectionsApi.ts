import { apiSlice } from '../api/apiSlice';
import { CollectionResponse } from '@/shared/interfaces/Collection';

export const collectionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<CollectionResponse, { offset: number; count: number; sort: string }>({
      query: ({ offset, count, sort }) => ({
        url: `api/collection?offset=${offset}&count=${count}&sort=${sort}`,
        method: 'GET',
      }),
    }),    
  }),
});

export const { useGetCollectionsQuery } = collectionsApi;
