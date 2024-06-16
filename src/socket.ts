import { io } from 'socket.io-client';
import { getAccessToken } from './shared/lib/cookie';

const URL = 'ws://socket.nft-jet.com';
const token = getAccessToken();
export const socket = io(URL, {
  auth: {
    token: `Bearer ${token}`,
  },
  transports: ['websocket'],
});
