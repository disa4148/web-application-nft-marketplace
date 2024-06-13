import { apiSlice } from '../api/apiSlice';
import { MyCollectionResponse } from '@/shared/interfaces/Marketplace';

export const promocodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    activePromo: builder.mutation<void, { promocode: string }>({
      query: (data) => ({
        url: `api/promocode/${data.promocode}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useActivePromoMutation } = promocodeApi;
