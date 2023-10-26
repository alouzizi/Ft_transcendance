import { Backend_URL } from '@/lib/Constants';
import { io, Socket } from 'Socket.IO-client';
export let socket: Socket;

export const socketInitializer = async (user: userDto) => {
    socket = io(Backend_URL, {
        transports: ['websocket'],
        query: {
            senderId: user.id,
        },
    });
    socket.on('connect', () => {
        console.log('--------------------------------------- user connected');
    });
    socket.on('disconnect', () => {
        console.log('++++++++++++++++++++++++++++++++++++++++ user connected');
    });
};

export const emitMessage = (event: string, message: any) => {
    socket.emit(event, message);
};

