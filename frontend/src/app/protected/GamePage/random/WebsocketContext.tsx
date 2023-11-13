import { createContext } from 'react';
import { io, Socket } from 'Socket.IO-client';

export const socket: Socket = io('http://localhost:4000/game');
export const WebsocketContext = createContext<Socket>(socket);

export const WebsocketProvider = WebsocketContext.Provider;