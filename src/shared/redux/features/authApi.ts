import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `api/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSignUpMutation } = authApi;
