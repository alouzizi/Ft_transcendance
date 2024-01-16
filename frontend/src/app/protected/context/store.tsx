'use client';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Cookies from 'js-cookie';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ImCross } from 'react-icons/im';
import { Socket, io } from 'socket.io-client';
import loadingc from '../../assets/loading.json';
import { usePathname } from 'next/navigation';

enum Status {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
}

interface ContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;

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
  isAuthenticated: false,
  setIsAuthenticated: () => { },

  inviteData: {
    userId1: '-1',
    userId2: '-1',
    room: '-1',
    selectedMap: 'isLeft',
    isLeft: true,
  },
  setInviteData: () => { },

  displayChat: false,
  setDisplayChat: () => { },

  updateInfo: 1,
  setUpdateInfo: () => { },

  user: {
    id: '-1',
    intra_id: '',
    first_name: '',
    last_name: '',
    nickname: '',
    profilePic: '',
    isTwoFactorAuthEnabled: true,
    status: Status.INACTIF,
    inGaming: false,
    level: '0.0',
    nbrNotifications: 0,
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
    idUserOwner: '',
    inGaming: false,
  },
  setGeust: () => { },

  socket: null,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [displayChat, setDisplayChat] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<number>(1);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [user, setUser] = useState<ownerDto>({
    id: '-1',
    intra_id: '',
    first_name: '',
    last_name: '',
    nickname: '',
    profilePic: '',
    isTwoFactorAuthEnabled: true,
    level: '0.0',
    status: Status.INACTIF,
    inGaming: false,
    nbrNotifications: 0,
  });

  const [inviteData, setInviteData] = useState<any>({
    userId1: '-1',
    userId2: '-1',
    room: '-1',
    selectedMap: 'isLeft',
    isLeft: true,
  });

  const [geust, setGeust] = useState<geustDto>({
    isUser: true,
    id: '-1',
    nickname: '',
    profilePic: '',
    status: Status.INACTIF,
    lastSee: 0,
    lenUser: 0,
    idUserOwner: '',
    inGaming: false,
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user.id && user.id != '-1') {
      const token = Cookies.get('access_token');
      const socket = io(`${process.env.NEXT_PUBLIC_BACK}` || 'localhost', {
        transports: ['websocket'],
        query: {
          senderId: user.id,
          token: `Bearer ${token}`,
        },
      });
      setSocket(socket);
    }
  }, [user.id]);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const token = Cookies.get('access_token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK}/user/intra`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const owner = await res.json();
          setIsAuthenticated(true);
          setUser(owner);
        } else {
          router.push('/public/HomePage');
        }
      } catch (error) {
        router.push('/public/HomePage');
      }
    };
    if (user.id === '-1') getDataUser();

    if (socket) {
      socket.on('sendNotification', getDataUser);
      return () => {
        socket.off('sendNotification', getDataUser);
      };
    }
  }, [socket]);

  useEffect(() => {
    const update = async () => {
      setUpdateInfo((preValue) => {
        return preValue + 1;
      });
    };
    if (socket) {
      socket.on('updateData', update);
    }
  }, [socket]);

  const [data, setData] = useState('');


  useEffect(() => {
    if (socket) {
      socket.on('invite', (data) => {
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
    }
    return () => {
      if (socket) socket.off("invite");
    }
  }, [socket, data]);

  useEffect(() => {
    if (socket) {
      socket.on('startGame', (data) => {
        setOpenConfirm(false);
        setInviteData({
          userId1: data.userId1,
          userId2: data.userId2,
          room: data.userId1 + data.userId2,
          selectedMap: 2,
          isLeft: data.userId1 == user.id ? false : true,
        });
        router.push('/protected/GamePage/invite');
      });
    }
    return () => {
      if (socket) socket.off("startGame");
    }
  }, [socket, data]);

  useEffect(() => {
    if (socket) {
      socket.on('declien', () => {
        setOpenConfirm(false);
      });
    }
    return () => {
      if (socket) socket.off("declien");
    }
  }, [socket, data]);

  useEffect(() => {
    console.log("openConfirm------>", openConfirm);
  }, [openConfirm]);


  const [inviterdName, setInvitedName] = useState('');

  console.log('---------- useContext Called ----------');
  if (socket === null) return <></>
  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
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
              backgroundColor: 'transparent',
              boxShadow: 'none',
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
                setOpenConfirm(false);
                if (user.id === inviteData.userId1)
                  socket?.emit('decline', inviteData.userId2);
                else socket?.emit('decline', inviteData.userId1);

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
                      </span>{' '}
                      invite you to pongMaster match
                    </p>
                  </div>
                </DialogContent>
                <DialogActions>
                  <div className="flex flex-row items-center justify-center"></div>
                  <button
                    onClick={async () => {
                      setOpenConfirm(false);
                      socket?.emit('decline', inviteData.userId1);

                    }}
                    className="w-fit font-meduim  rounded-md   text-white bg-[#323C52] hover:bg-[#43516e]
                          text-xs  px-4 py-2 mx-2
                          md:text-sm lg:text-md lg:px-4"
                  >
                    Decline
                  </button>
                  <button
                    onClick={async () => {
                      setOpenConfirm(false);
                      socket?.emit('accept', data);
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
