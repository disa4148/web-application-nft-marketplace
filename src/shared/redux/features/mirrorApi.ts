import { apiSlice } from '../api/apiSlice';

type Response = {
    logo: string;
    pattern: number;
}

export const mirrorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMirrors: builder.query<Response, void>({
      query: () => ({
        url: `api/mirror`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetMirrorsQuery } = mirrorApi;
