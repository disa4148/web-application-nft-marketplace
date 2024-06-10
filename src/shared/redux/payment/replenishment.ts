import { apiSlice } from '../api/apiSlice';
import { Payment } from '@/shared/interfaces/payment';

export const Replenishment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReplenishment: builder.mutation({
      query: (data) => ({
        url: `api/payment`,
        method: 'POST',
        body: data,
      }),
    }),
    queryConclusion: builder.mutation({
      query: (data) => ({
        url: `api/payout`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateReplenishmentMutation, useQueryConclusionMutation } =
  Replenishment;
