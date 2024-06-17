import { getAccessToken } from '@/shared/lib/cookie';
import { io } from 'socket.io-client';

const URL = 'wss://socket.nft-jet.com';
const token = getAccessToken();
export const socket = io(URL, {
  auth: {
    token: `Bearer ${token}`,
  },
  transports: ['websocket'],
});
