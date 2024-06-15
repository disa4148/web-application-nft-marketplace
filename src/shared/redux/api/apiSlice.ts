import {
  getAccessToken,
  getRefreshToken,
  removeToken,
  setToken,
} from '@/shared/lib/cookie';
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import store from '../store';
import { logout } from '../slices/authSlice';
interface RefreshResultData {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://nft-jet.com/',

  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          console.error('No refresh token found');
          // store.dispatch(logout());
          removeToken();
          return result;
        }

        const refreshResult = await baseQuery(
          {
            url: 'api/auth/refresh',
            method: 'GET',
            headers: {
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          const data: RefreshResultData =
            refreshResult.data as RefreshResultData;

          setToken(data.tokens.accessToken, data.tokens.refreshToken);
          result = await baseQuery(args, api, extraOptions);
        } else {
          // store.dispatch(logout());

          console.error('ERROR REFRESH TOKEN');
          removeToken();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  tagTypes: ['Chats', 'Messages'],

  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
