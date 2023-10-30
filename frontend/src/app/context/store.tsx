'use client';
import { Backend_URL } from "@/lib/Constants";
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { io, Socket } from 'Socket.IO-client';

enum Status {
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",
}

enum MessageStatus {
    NotReceived = "NotReceived",
    Received = "Received",
    Seen = "Seen"
}


// isUser: boolean;
// id: string;
// nickname: string;
// profilePic: string;
// status: Status;
// lastSee: number;
// lenUser: number;
// lenUserLive: number;

interface ContextProps {
    user: userDto,
    setUser: Dispatch<SetStateAction<userDto>>,
    geust: geustDto,
    setGeust: Dispatch<SetStateAction<geustDto>>,
    socket: Socket | null, // Add the socket property

}

const GlobalContext = createContext<ContextProps>({
    user: {
        id: '-1',
        email: '',
        nickname: '',
        profilePic: '',
        status: Status.INACTIF,
        lastSee: 0,
        friendship: -1,

    },
    setUser: () => { },

    geust: {
        isUser: true,
        id: '-1',
        nickname: '',
        profilePic: '',
        status: Status.INACTIF,
        lastSee: 0,
        lenUser: 0,
        lenUserLive: 0,
    },
    setGeust: () => { },

    socket: null, // Initialize socket as null


})



export const GlobalContextProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<userDto>({
        id: '-1',
        email: '',
        nickname: '',
        profilePic: '',
        status: Status.INACTIF,
        lastSee: 0,
        friendship: -1,

    })

    const [geust, setGeust] = useState<geustDto>({
        isUser: true,
        id: '-1',
        nickname: '',
        profilePic: '',
        status: Status.INACTIF,
        lastSee: 0,
        lenUser: 0,
        lenUserLive: 0,

    })

    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        // const socket = io('your-socket-server-url');

        if (user.id != '-1') {
            const socket = io(Backend_URL, {
                transports: ['websocket'],
                query: {
                    senderId: user.id,
                },
            });
            setSocket(socket);
            socket.on('connect', () => {
                console.log('socket --> user connected');
            });
            socket.on('disconnect', () => {
                console.log('socket --> user disconnected');
            });
        }

        return () => {
            // if (user.id !== - 1 && socket) {
            //     socket.disconnect();
            // }
        };
    }, [user.id]);

    return (
        <GlobalContext.Provider value={{ geust, setGeust, user, setUser, socket }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);