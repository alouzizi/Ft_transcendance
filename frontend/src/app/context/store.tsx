"use client";
import { Backend_URL } from "@/lib/Constants";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { io, Socket } from "Socket.IO-client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

interface ContextProps {
  user: ownerDto;
  setUser: Dispatch<SetStateAction<ownerDto>>;
  geust: geustDto;
  setGeust: Dispatch<SetStateAction<geustDto>>;
  socket: Socket | null; // Add the socket property
}

const GlobalContext = createContext<ContextProps>({
  user: {
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
  },
  setUser: () => {},

  geust: {
    isUser: true,
    id: "-1",
    nickname: "",
    profilePic: "",
    status: Status.INACTIF,
    lastSee: 0,
    lenUser: 0,
  },
  setGeust: () => {},

  socket: null, // Initialize socket as null
});

// id: string;
// intra_id: string;
// first_name: string;
// last_name: string;
// nickname: string;
// profilePic: string;

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [user, setUser] = useState<ownerDto>({
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
  });

  const [geust, setGeust] = useState<geustDto>({
    isUser: true,
    id: "-1",
    nickname: "",
    profilePic: "",
    status: Status.INACTIF,
    lastSee: 0,
    lenUser: 0,
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user.id && user.id != "-1") {
      console.log("socket ---------------------> ", user.id);
      const socket = io(Backend_URL, {
        transports: ["websocket"],
        query: {
          senderId: user.id,
        },
      });
      setSocket(socket);
      socket.on("connect", () => {
        console.log("socket --> user connected");
      });
      socket.on("disconnect", () => {
        console.log("socket --> user disconnected");
      });
    }

    return () => {
      // if (user.id !== - 1 && socket) {
      //     socket.disconnect();
      // }
    };
  }, [user.id]);

  useEffect(() => {
    const getDataUser = async () => {
      const id_intra = Cookies.get("intra_id");
      const token = Cookies.get("access_token");

      const res = await fetch(Backend_URL + `/user/intra/${id_intra}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const owner = await res.json();
        setUser(owner);
      } else {
        // router.push('/auth');
      }
    };
    if (user.id === "-1") getDataUser();
  }, []);
  return (
    <GlobalContext.Provider value={{ geust, setGeust, user, setUser, socket }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
