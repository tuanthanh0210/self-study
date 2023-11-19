import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_API || 'http://localhost:8000';

export const socket = io(URL, {
  transports: ['websocket'],
  query: {
    authorization: 'accessToken',
  },
});
