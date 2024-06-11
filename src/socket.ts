import { io } from 'socket.io-client';
import { getAccessToken } from './shared/lib/cookie';

const URL = 'http://107.23.115.186:3000';
const token = getAccessToken()
export const socket = io(URL, {
    auth: {
        token
      }
});