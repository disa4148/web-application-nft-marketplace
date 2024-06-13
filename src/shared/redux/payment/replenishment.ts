import { apiSlice } from "../api/apiSlice";
import { Payment, PaymentResponse } from "@/shared/interfaces/payment";

export const Replenishment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReplenishment: builder.mutation({
      query: (data) => ({
        url: `api/payment`,
        method: "POST",
        body: data,
      }),
    }),
    queryConclusion: builder.mutation({
      query: (data) => ({
        url: `api/payout`,
        method: "POST",
        body: data,
      }),
    }),
    queryPaymentId: builder.query<PaymentResponse, { paymentId: string }>({
      query: ({ paymentId }) => ({
        url: `api/payment/${paymentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateReplenishmentMutation,
  useQueryConclusionMutation,
  useQueryPaymentIdQuery,
} = Replenishment;
