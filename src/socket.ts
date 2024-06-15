import { io } from 'socket.io-client';
import { getAccessToken } from './shared/lib/cookie';

const URL = 'https://wsnft.xyz/';
const token = getAccessToken()
export const socket = io(URL, {
    auth: {
        token
      }
});