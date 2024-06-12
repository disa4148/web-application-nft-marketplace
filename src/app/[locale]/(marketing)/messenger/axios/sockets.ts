import { getAccessToken } from '@/shared/lib/cookie';
import { io } from 'socket.io-client';

const URL = 'http://107.23.115.186:3000';
const token = getAccessToken();
export const socket = io(URL, {
  auth: {
    token: `Bearer ${token}`,
  },
  transports: ['websocket'],
});
