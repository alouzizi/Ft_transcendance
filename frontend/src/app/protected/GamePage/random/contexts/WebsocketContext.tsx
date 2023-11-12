import { createContext } from 'react';
import { io, Socket } from 'Socket.IO-client';

export const socket: Socket = io('http://localhost:4001');
export const WebsocketContext = createContext<Socket>(socket);

export const WebsocketProvider = WebsocketContext.Provider;