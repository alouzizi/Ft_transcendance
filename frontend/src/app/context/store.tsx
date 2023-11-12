"use client";
<<<<<<< HEAD
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
=======
import { Backend_URL } from "../../../lib/Constants";
>>>>>>> implement the sockets successfully
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { io, Socket } from "Socket.IO-client";
<<<<<<< HEAD
=======
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
>>>>>>> implement the sockets successfully

enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

<<<<<<< HEAD
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
=======
interface ContextProps {
  updateInfo: number;
  setUpdateInfo: Dispatch<SetStateAction<number>>;

  user: ownerDto;
  setUser: Dispatch<SetStateAction<ownerDto>>;

  geust: geustDto;
  setGeust: Dispatch<SetStateAction<geustDto>>;

  socket: Socket | null; // Add the socket property

  saveChanges: number;
  setSaveChanges: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<ContextProps>({
  updateInfo: 1,
  setUpdateInfo: () => {},

  saveChanges: 1,
  setSaveChanges: () => {},

  user: {
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
>>>>>>> implement the sockets successfully
  },
  setUser: () => {},

  geust: {
<<<<<<< HEAD
    id: "-1",
    email: "",
    username: "",
    avatar: "",
    status: Status.INACTIF,
    lastSee: 0,
    friendship: -1,
=======
    isUser: true,
    id: "-1",
    nickname: "",
    profilePic: "",
    status: Status.INACTIF,
    lastSee: 0,
    lenUser: 0,
    idUserOwner: "",
>>>>>>> implement the sockets successfully
  },
  setGeust: () => {},

  socket: null, // Initialize socket as null
});

<<<<<<< HEAD
=======
// id: string;
// intra_id: string;
// first_name: string;
// last_name: string;
// nickname: string;
// profilePic: string;

>>>>>>> implement the sockets successfully
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
<<<<<<< HEAD
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
=======
  const router = useRouter();

  const [updateInfo, setUpdateInfo] = useState<number>(1);
  const [saveChanges, setSaveChanges] = useState<number>(1);

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
    idUserOwner: "",
>>>>>>> implement the sockets successfully
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    // const socket = io('your-socket-server-url');

    if (user.id != "-1") {
=======
    if (user.id && user.id != "-1") {
      console.log("socket ---------------------> ", user.id);
>>>>>>> implement the sockets successfully
      const socket = io(Backend_URL, {
        transports: ["websocket"],
        query: {
          senderId: user.id,
        },
      });
      setSocket(socket);
<<<<<<< HEAD
      socket.on("connect", () => {});
      socket.on("disconnect", () => {});
=======
      socket.on("connect", () => {
        console.log("socket --> user connected");
      });
      socket.on("disconnect", () => {
        console.log("socket --> user disconnected");
      });
>>>>>>> implement the sockets successfully
    }

    return () => {
      // if (user.id !== - 1 && socket) {
      //     socket.disconnect();
      // }
    };
  }, [user.id]);

<<<<<<< HEAD
  return (
    <GlobalContext.Provider value={{ geust, setGeust, user, setUser, socket }}>
=======
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
        router.push("/auth");
      }
    };
    if (user.id === "-1") getDataUser();
  }, []);

  useEffect(() => {
    const update = async () => {
      setUpdateInfo((preValue) => {
        return preValue + 1;
      });
    };
    if (socket) {
      socket.on("updateData", update);
    }
  }, [socket]);
  console.log("----------------------------> ", updateInfo);
  return (
    <GlobalContext.Provider
      value={{
        geust,
        setGeust,
        user,
        setUser,
        socket,
        updateInfo,
        setUpdateInfo,
        saveChanges,
        setSaveChanges,
      }}
    >
>>>>>>> implement the sockets successfully
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
