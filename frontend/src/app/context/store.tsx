"use client";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { io, Socket } from "Socket.IO-client";

enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

enum MessageStatus {
  NotReceived = "NotReceived",
  Received = "Received",
  Seen = "Seen",
}

interface ContextProps {
  user: userDto;
  setUser: Dispatch<SetStateAction<userDto>>;
  geust: userDto;
  setGeust: Dispatch<SetStateAction<userDto>>;
  socket: Socket | null; // Add the socket property
}

const GlobalContext = createContext<ContextProps>({
  user: {
    id: "-1",
    email: "",
    username: "",
    avatar: "",
    status: Status.INACTIF,
    lastSee: 0,
    friendship: -1,
  },
  setUser: () => {},

  geust: {
    id: "-1",
    email: "",
    username: "",
    avatar: "",
    status: Status.INACTIF,
    lastSee: 0,
    friendship: -1,
  },
  setGeust: () => {},

  socket: null, // Initialize socket as null
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<userDto>({
    id: "-1",
    email: "",
    username: "",
    avatar: "",
    status: Status.INACTIF,
    lastSee: 0,
    friendship: -1,
  });

  const [geust, setGeust] = useState<userDto>({
    id: "-1",
    email: "",
    username: "",
    avatar: "",
    status: Status.INACTIF,
    lastSee: 0,
    friendship: -1,
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    // const socket = io('your-socket-server-url');

    if (user.id != "-1") {
      const socket = io(Backend_URL, {
        transports: ["websocket"],
        query: {
          senderId: user.id,
        },
      });
      setSocket(socket);
      socket.on("connect", () => {});
      socket.on("disconnect", () => {});
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
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
