'use client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BsFillSendFill, } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { useGlobalContext } from '../../../context/store';
import { checkIsMuted, checkUserIsInChannel } from '../api/fetch-channel';
import { getMessageTwoUsers, getMessagesChannel } from '../api/fetch-msg';
import { checkIsBlocked, getVueGeust } from '../api/fetch-users';
import { unBlockedUser } from '../api/send-Friend-req';
import { IsTypingMsg, ShowMessages } from './widgetMsg';


enum Status {
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",
}

const BoxChat = () => {

    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const [msg, setMsg] = useState('');
    const [Allmsg, setAllMessage] = useState<messageDto[]>([]);

    const { geust, user, socket, setGeust, updateInfo, setOpenAlertError, setUpdateInfo } = useGlobalContext();

    const [isTyping, setIsTyping] = useState<boolean>(false)

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    };
    scrollToBottom();

    useEffect(() => {
        scrollToBottom();
    }, [Allmsg, isTyping, user.id, geust.id])

    const getDataGeust = async (id: string, isUser: Boolean) => {
        const temp = await getVueGeust(id, isUser);
        if (temp !== undefined) setGeust(temp);
        else setOpenAlertError(true);
    };

    useEffect(() => {
        if (user.id !== "-1" && socket) {
            const handleReceivedMessage = (data: messageDto) => {
                if ((geust.isUser && (data.senderId === geust.id || data.senderId === user.id)) ||
                    ((!geust.isUser && (data.receivedId === geust.id || data.senderId === user.id)))) { // || !geust.isUser
                    setIsTyping(false);
                    setAllMessage((prevMessages) => [...prevMessages, data]);
                }
            };
            socket.on("findMsg2UsersResponse", handleReceivedMessage);
            return () => {
                socket.off("findMsg2UsersResponse", handleReceivedMessage);
            };
        }
    }, [geust.id, user.id]);



    useEffect(() => {
        console.log("object")
        async function getData() {
            let msgs;
            if (geust.isUser)
                msgs = await getMessageTwoUsers(user.id, geust.id);
            else
                msgs = await getMessagesChannel(user.id, geust.id);
            if (msgs !== undefined) setAllMessage(msgs);
            else setOpenAlertError(true);
        }
        if (geust.id !== "-1" && user.id !== "-1") {
            getData();
        }
    }, [geust.id, user.id, updateInfo]);


    useEffect(() => {
        if (user.id !== "-1 " && socket) {
            const upDateGeust = async () => {
                if (geust.id !== "-1") {
                    getDataGeust(geust.id, geust.isUser);
                    setIsTyping(false);
                }
            }
            upDateGeust();
        }
    }, [geust.id, user.id, updateInfo]);


    const [isBlocked, setIsBlocked] = useState<number>(0)
    const [showUnblockAlert, setUnblockAlert] = useState<boolean>(false)
    useEffect(() => {
        setIsMuted(false);
        if (user.id !== "-1" && geust.id !== "-1" && geust.isUser) {
            const upDateGeust = async () => {
                const check = await checkIsBlocked(user.id, geust.id);
                if (check !== undefined) setIsBlocked(check);
                else setOpenAlertError(true);

            }
            upDateGeust();
        }
    }, [geust.id, user.id, updateInfo]);

    useEffect(() => {
        if (msg != "" && socket) {
            socket.emit('isTyping', {
                content: '',
                senderId: user.id,
                receivedId: geust.id,
            });
        }
    }, [msg])

    useEffect(() => {
        if (user.id !== "-1" && socket) {
            const updateIsTyping = (data: messageDto) => {
                if (data.senderId === geust.id) {
                    setIsTyping(true);
                    // setMsg('');
                    setTimeout(() => {
                        setIsTyping(false);
                    }, 2000);
                }
            }
            socket.on("isTyping", updateIsTyping);
            return () => {
                socket.off("isTyping", updateIsTyping);
            };
        }
    }, [geust.id, user.id]);



    const [isMuted, setIsMuted] = useState(false);
    useEffect(() => {
        if (user.id !== "-1" && geust.id !== "-1"
            && !geust.isUser) {
            const checkUserIsMuted = async () => {
                const timer = await checkIsMuted(user.id, geust.id);
                if (timer !== undefined) {
                    if (timer !== -1) {
                        setMsg('');
                        setIsMuted(true);
                        const timeoutId = setTimeout(() => {
                            setIsMuted(false);
                        }, timer);
                        return () => clearTimeout(timeoutId);
                    }
                } else setOpenAlertError(true);
            }
            checkUserIsMuted();
        }
    }, [geust.id, user.id, updateInfo]);

    const handleSendMessage = () => {
        if (msg.trim() != '') {
            if (isBlocked === 1) {
                setUnblockAlert(true);
            } else {
                if (socket) {
                    socket.emit('createMessage', {
                        isDirectMessage: geust.isUser,
                        content: msg.trim(),
                        senderId: user.id,
                        receivedId: geust.id,
                    });
                }
                setMsg('');
            }
        }

    }


    return (geust.id != "-1") ? (
        <Box
            style={{
                width: 500, height: 600,
                borderRadius: 10, background: "#f1f3f9", marginLeft: 3
            }}>
            <div className="flex border-b items-center justify-between bg-white pl-2 pt-2 pb-2 rounded-t-lg">
                <div className="flex items-center pl-3">

                    <Avatar
                        size="3"
                        src={geust.profilePic}
                        radius="full"
                        fallback="T"
                    />
                    <Text className='absolute pt-6 pl-7'>
                        {geust.isUser ? <GoDotFill size={20}
                            color={(geust.status === 'ACTIF' && isBlocked === 0) ? "#15ff00" : "#9b9c9b"} /> : <></>}
                    </Text>
                    <Flex direction="column" className='flex' >
                        <Text size="2" weight="bold" className='pl-2'>
                            {geust.nickname}
                        </Text>
                        {
                            (geust.status === 'INACTIF') ?
                                <Text size="1" weight="light" className='pl-2'>
                                    {geust.isUser ?
                                        (isBlocked === 0) ?
                                            formatDistance(new Date(geust.lastSee), new Date(), { addSuffix: true }) : <p></p>
                                        : <>{geust.lenUser} members</>
                                    }
                                </Text>
                                : <></>
                        }
                    </Flex>
                </div>
                <div className="pr-3">
                    {!geust.isUser ? <Link href='ChatPage/channelSettings'>
                        <IoSettingsSharp size={20} />
                    </Link> :
                        <></>}
                </div>
            </div >

            <div   >
                <ScrollArea scrollbars="vertical" style={{ height: 500 }} ref={scrollAreaRef}>
                    <Box p="1" pr="3">
                        <ShowMessages messages={Allmsg} user={user} />
                        {isTyping ? <IsTypingMsg /> : <></>}
                    </Box>
                </ScrollArea>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}>
                    <TextField.Root className="ml-2 mr-2" style={{ width: 480 }} >
                        <TextField.Input radius="full"
                            placeholder={!isMuted ? "  Type your message" : " Your muted from this channel"}
                            size="2"
                            value={msg}
                            disabled={isMuted}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setMsg(event.target.value);
                            }} />
                        <TextField.Slot>
                            <BsFillSendFill color='blue'
                                onClick={() =>
                                    handleSendMessage()} />

                        </TextField.Slot>
                    </TextField.Root>

                </form>
            </div>


            <div>
                <Dialog open={showUnblockAlert} >
                    {/* <DialogTitle>Confirme Action</DialogTitle> */}
                    <DialogContent className='flex flex-col p-0'>
                        <div className='flex text-black text-sm rounded-lg pt-3 px-6'>
                            Unblock contact to send a message
                        </div>

                        <hr className="border-b-1 border-gray-100 mt-0.5" />
                    </DialogContent>
                    <DialogActions>
                        <div className='flex flex-col flex-grow items-center mt-3'>
                            <button onClick={async () => {
                                await unBlockedUser(user.id, geust.id);
                                setUnblockAlert(false);
                                setIsBlocked(0);
                            }}
                                className="w-[200px] mt-2 font-meduim  py-1 rounded-md text-white bg-[#4069ff] text-sm">
                                Unblock
                            </button>
                            <button onClick={async () => {
                                setUnblockAlert(false);
                            }}
                                className="w-[200px] mt-2 font-meduim  py-1 rounded-md text-white bg-[#4069ff] text-sm">
                                Cancel
                            </button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>


        </Box>
    ) : <></>
}

export default BoxChat
