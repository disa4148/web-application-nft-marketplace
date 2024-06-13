import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setToken = (accessToken: string, refreshToken: string) => {
  if (!refreshToken) {
    cookies.set('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  } else {
    cookies.set('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
    });
    cookies.set('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  }
};

export const getAccessToken = () => cookies.get('accessToken');

export const getRefreshToken = (): string | null => {
  return cookies.get('refreshToken') || null;
};

export const removeToken = () => {
  cookies.remove('accessToken', { path: '/', secure: true, sameSite: 'none' });
  cookies.remove('refreshToken', {
    path: '/',
    secure: true,
    sameSite: 'none',
  });
};

export const removeUserData = () =>
  cookies.remove('UserData', { path: '/', secure: true, sameSite: 'none' });
