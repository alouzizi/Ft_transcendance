"use client";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import Lottie from "lottie-react";
import loadingc from "../../assets/loading.json";
import { ImCross } from "react-icons/im";

enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

interface ContextProps {
  updateInfo: number;
  setUpdateInfo: Dispatch<SetStateAction<number>>;

  inviteData: any;
  setInviteData: Dispatch<SetStateAction<any>>;

  displayChat: boolean;
  setDisplayChat: Dispatch<SetStateAction<boolean>>;

  user: ownerDto;
  setUser: Dispatch<SetStateAction<ownerDto>>;

  geust: geustDto;
  setGeust: Dispatch<SetStateAction<geustDto>>;

  socket: Socket | null; // Add the socket property
}

const GlobalContext = createContext<ContextProps>({
  inviteData: {
    userId1: "-1",
    userId2: "-1",
    room: "-1",
    selectedMap: "isLeft",
    isLeft: true,
  },
  setInviteData: () => {},

  displayChat: false,
  setDisplayChat: () => {},

  updateInfo: 1,
  setUpdateInfo: () => {},

  user: {
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
    isTwoFactorAuthEnabled: true,
    status: Status.INACTIF,
    inGaming: false,
    level: "0.0",
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
    idUserOwner: "",
    inGaming: false,
  },
  setGeust: () => {},

  socket: null,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [displayChat, setDisplayChat] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<number>(1);

  const [user, setUser] = useState<ownerDto>({
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
    isTwoFactorAuthEnabled: true,
    level: "0.0",
    status: Status.INACTIF,
    inGaming: false,
  });

  const [inviteData, setInviteData] = useState<any>({
    userId1: "-1",
    userId2: "-1",
    room: "-1",
    selectedMap: "isLeft",
    isLeft: true,
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
    inGaming: false,
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user.id && user.id != "-1") {
      const socket = io(`${process.env.NEXT_PUBLIC_BACK}` || "localhost", {
        transports: ["websocket"],
        query: {
          senderId: user.id,
        },
      });
      setSocket(socket);
      socket.on("connect", () => {});
      socket.on("disconnect", () => {});
    }
  }, [user.id]);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const token = Cookies.get("access_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK}/user/intra/`, {
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
          router.push("/public/HomePage");
        }
      } catch (error) {
        router.push("/public/HomePage");
        //console.log(error);
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

  const [data, setData] = useState("");

  useEffect(() => {
    // socket here <<< ---------------------------------->>>
    if (socket) {
      socket.on("invite", (data) => {
        setData(data);
        setInviteData({
          userId1: data.userId1,
          userId2: data.userId2,
          room: data.userId1 + data.userId2,
          selectedMap: 2,
          isLeft: true,
        });
        setOpenConfirm(true);
        setInvitedName(data.nameInveted);
      });

      socket.on("startGame", (data) => {
        setInviteData({
          userId1: data.userId1,
          userId2: data.userId2,
          room: data.userId1 + data.userId2,
          selectedMap: 2,
          isLeft: data.userId1 == user.id ? false : true,
        });
        setOpenConfirm(false);
        router.push("/protected/GamePage/invite");
      });
      socket.on("declien", () => {
        setOpenConfirm(false);
      });
      // }
    }
  }, [socket, data]);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [inviterdName, setInvitedName] = useState("");

  if (user.id === "-1") return <div></div>;
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
        displayChat,
        setDisplayChat,
        inviteData,
        setInviteData,
      }}
    >
      <div>
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          open={openConfirm}
          // onClose={() => setOpenConfirm(false)}
          className=""
        >
          <div
            className="bg-[#010611be] w-fit sm:m-4 p-2 sm:p-4 md:m-8 md-6 rounded-2xl border-2 border-white "
            color="red"
          >
            <div
              onClick={() => {
                if (user.id === inviteData.userId1)
                  socket?.emit("decline", inviteData.userId2);
                else socket?.emit("decline", inviteData.userId1);
                setOpenConfirm(false);
              }}
              className="flex flex-row justify-end mb-2 text-sm md:text-md lg:text-lg"
            >
              <ImCross className="text-gray-400 hover:text-gray-300 cursor-pointer" />
            </div>
            <img
              src="/PongMaster.svg"
              alt=""
              className=" w-40 text-sm mx-auto"
            />
            {user.id !== inviteData.userId1 ? (
              <div>
                <DialogContent>
                  <div className="flex flex-col rounded-2xl my-4">
                    <p className="text-gray-300  text-center">
                      <span className="font-700 text-white hover:underline">
                        {inviterdName}
                      </span>{" "}
                      invite you to pongMaster match
                    </p>
                  </div>
                </DialogContent>
                <DialogActions>
                  <div className="flex flex-row items-center justify-center"></div>
                  <button
                    onClick={async () => {
                      socket?.emit("decline", inviteData.userId1);
                      setOpenConfirm(false);

                      // router.push("/protected/GamePage/invite");
                    }}
                    className="w-fit font-meduim  rounded-md   text-white bg-[#323C52] hover:bg-[#43516e]
                          text-xs  px-4 py-2 mx-2
                          md:text-sm lg:text-md lg:px-4"
                  >
                    Decline
                  </button>
                  <button
                    onClick={async () => {
                      socket?.emit("accept", data);
                      setOpenConfirm(false);
                      router.push("/protected/GamePage/invite");
                    }}
                    className="w-fit font-meduim  rounded-md   text-white bg-color-main-whith hover:bg-[#2d55e6]
              text-xs  px-4 py-2 mx-2
              md:text-sm lg:text-md lg:px-4"
                  >
                    Accept
                  </button>
                </DialogActions>
              </div>
            ) : (
              <div>
                <DialogContent>
                  <div className="flex flex-col rounded-2xl my-4 text-center">
                    <Lottie
                      animationData={loadingc}
                      loop={true}
                      className="h-20 w-20"
                    />
                  </div>
                </DialogContent>
              </div>
            )}
          </div>
        </Dialog>
      </div>

      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
