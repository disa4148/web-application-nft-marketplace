import axios from 'axios';
import { getAccessToken, setToken, removeToken, getRefreshToken } from '@/shared/lib/cookie';

const axiosInstance = axios.create({
  baseURL: 'https://nft.levpidoor.ru/api',
});

const refreshTokenRequest = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    // Я СРАТЬ
    const response = await axios.post(
      'https://nft.levpidoor.ru/api/auth/refresh', // Замените на ваш endpoint обновления токена
      null,
      {
        headers: {
          'refresh-token': `Bearer ${refreshToken}`, 
        },
      }
    );

    return response.data.tokens; // Верните новые токены из ответа
  } catch (error) {
    console.error('Refresh token request failed:', error);
    throw error; 
  }
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await refreshTokenRequest();
        setToken(tokens.accessToken, tokens.refreshToken); // Обновите токены в хранилище
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        processQueue(null, tokens.accessToken); 
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        removeToken();
        window.location.href = '/signin'; // Или другая логика выхода
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const getChats = async () => {
  try {
    const response = await axiosInstance.get('/chat');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении чатов:', error);
    throw error;
  }
};

export const getMessages = async (chatId: string) => {
  try {
    const response = await axiosInstance.get(`/message/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении сообщений:', error);
    throw error;
  }
};

export const sendMessage = async (ownerId: string, text: string) => {
  try {
    const response = await axiosInstance.post('/message', { ownerId, text });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};

export default axiosInstance;