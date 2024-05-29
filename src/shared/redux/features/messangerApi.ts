import { apiSlice } from '../api/apiSlice';

export const messangerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any, void>({
      query: () => ({
        url: `api/chat`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetChatsQuery } = messangerApi;
