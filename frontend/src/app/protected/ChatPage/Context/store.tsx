'use client';
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

enum Status {
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",
}

enum MessageStatus {
    NotReceived = "NotReceived",
    Received = "Received",
    Seen = "Seen"
}

interface ContextProps {
    user: userDto,
    setUser: Dispatch<SetStateAction<userDto>>,

    geust: userDto,
    setGeust: Dispatch<SetStateAction<userDto>>,

    valueNav: number,
    setValueNav: Dispatch<SetStateAction<number>>

}

const GlobalContext = createContext<ContextProps>({
    user: {
        id: -1,
        email: '',
        username: '',
        avatar: '',
        status: Status.INACTIF,
        lastSee: 0,
        friendship: -1,

    },
    setUser: () => { },

    geust: {
        id: -1,
        email: '',
        username: '',
        avatar: '',
        status: Status.INACTIF,
        lastSee: 0,
        friendship: -1,
    },
    setGeust: () => { },

    valueNav: 0,
    setValueNav: () => { },


})



export const GlobalContextProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<userDto>({
        id: -1,
        email: '',
        username: '',
        avatar: '',
        status: Status.INACTIF,
        lastSee: 0,
        friendship: -1,

    })

    const [geust, setGeust] = useState<userDto>({
        id: -1,
        email: '',
        username: '',
        avatar: '',
        status: Status.INACTIF,
        lastSee: 0,
        friendship: -1,

    })



    const [valueNav, setValueNav] = useState<number>(0);

    return (
        <GlobalContext.Provider value={{ geust, setGeust, user, setUser, valueNav, setValueNav }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);