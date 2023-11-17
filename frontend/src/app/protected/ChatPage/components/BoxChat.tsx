'use client';
<<<<<<< HEAD
import { TextField, Avatar, ScrollArea, Box, Text, Flex } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { BsFillSendFill } from "react-icons/bs";
import { useGlobalContext } from '../../../context/store';
import { IsTypingMsg, ShowMessages } from './widgetMsg';
import { getMessageTwoUsers, getMessagesChannel } from '../api/fetch-msg';
import { GoDotFill } from "react-icons/go";
import { getColorStatus } from './ListUser';
import { formatDistance } from 'date-fns'
import { getVueGeust } from '../api/fetch-users';

const BoxChat = () => {
=======
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BsFillSendFill, } from "react-icons/bs";
import { RiPingPongFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGlobalContext } from '../../context/store';
import { checkIsMuted } from '../api/fetch-channel';
import { getMessageTwoUsers, getMessagesChannel } from '../api/fetch-msg';
import { checkIsBlocked, getVueGeust } from '../api/fetch-users';
import { unBlockedUser } from '../api/send-Friend-req';
import { IsTypingMsg, ShowMessages } from './widgetMsg';
import Badge from "@mui/material/Badge";


enum Status {
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",
}

const BoxChat = () => {

>>>>>>> origin/lhoussin
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const [msg, setMsg] = useState('');
    const [Allmsg, setAllMessage] = useState<messageDto[]>([]);

<<<<<<< HEAD
    const { geust, user, socket, setGeust } = useGlobalContext();
=======
    const { geust, user, socket, setGeust, updateInfo, setOpenAlertError, displayChat, setDisplayChat } = useGlobalContext();
>>>>>>> origin/lhoussin

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
<<<<<<< HEAD
        setGeust(temp);
=======
        if (temp !== undefined) setGeust(temp);
        else setOpenAlertError(true);
>>>>>>> origin/lhoussin
    };

    useEffect(() => {
        if (user.id !== "-1" && socket) {
            const handleReceivedMessage = (data: messageDto) => {
<<<<<<< HEAD
                if (data.senderId === geust.id || data.senderId === user.id || !geust.isUser) {
=======
                if ((geust.isUser && (data.senderId === geust.id || data.senderId === user.id)) ||
                    ((!geust.isUser && (data.receivedId === geust.id || data.senderId === user.id)))) { // || !geust.isUser
>>>>>>> origin/lhoussin
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

<<<<<<< HEAD
=======


>>>>>>> origin/lhoussin
    useEffect(() => {
        async function getData() {
            let msgs;
            if (geust.isUser)
                msgs = await getMessageTwoUsers(user.id, geust.id);
            else
                msgs = await getMessagesChannel(user.id, geust.id);
<<<<<<< HEAD
            setAllMessage(msgs);
=======
            if (msgs !== undefined) setAllMessage(msgs);
            else setOpenAlertError(true);
>>>>>>> origin/lhoussin
        }
        if (geust.id !== "-1" && user.id !== "-1") {
            getData();
        }
<<<<<<< HEAD
    }, [geust.id, user.id]);
=======
    }, [geust.id, user.id, updateInfo]);
>>>>>>> origin/lhoussin


    useEffect(() => {
        if (user.id !== "-1 " && socket) {
            const upDateGeust = async () => {
                if (geust.id !== "-1") {
                    getDataGeust(geust.id, geust.isUser);
                    setIsTyping(false);
                }
            }
<<<<<<< HEAD
            socket.on("updateData", upDateGeust);
            return () => {
                socket.off("updateData", upDateGeust);
            };
        }
    }, [geust.id, user.id]);
=======
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
>>>>>>> origin/lhoussin

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

<<<<<<< HEAD
    const handleSendMessage = () => {
        if (msg.trim() != '' && socket) {
            socket.emit('createMessage', {
                isDirectMessage: geust.isUser,
                content: msg.trim(),
                senderId: user.id,
                receivedId: geust.id,
            });
        }
        setMsg('');
    }


    return (geust.id != "-1") ? (
        <Box
            style={{
                width: 500, height: 600,
                borderRadius: 10, background: "#f1f3f9", marginLeft: 3
            }}>

            <div className="flex border-b items-center justify-start  bg-white pl-2 pt-2 pb-2 rounded-t-lg">
                <Avatar
                    size="3"
                    src={geust.profilePic}
                    radius="full"
                    fallback="T"
                />
                <Text className='absolute pt-6 pl-7'>
                    {geust.isUser ? <GoDotFill size={20} color={getColorStatus(geust.status)} /> : <></>}
                </Text>
                <Flex direction="column" className='flex' >
                    <Text size="2" weight="bold" className='pl-2'>
                        {geust.nickname}
                    </Text>
                    {
                        (geust.status === 'INACTIF') ?
                            <Text size="1" weight="light" className='pl-2'>
                                {geust.isUser ?
                                    formatDistance(new Date(geust.lastSee), new Date(), { addSuffix: true }) :
                                    <>{geust.lenUser} members</>}
                            </Text> :
                            <></>
                    }
                </Flex>
            </div >

            <div   >
                <ScrollArea scrollbars="vertical" style={{ height: 500 }} ref={scrollAreaRef}>
=======


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

    // 
    return (geust.id != "-1") ? (
        <Box
            className={`
        bg-[#F1F3F9] h-[900px] rounded-[15px] 
        ${displayChat ? '' : 'hidden'}
        md:ml-[15px]
        md:block
        md:w-[50%]
        w-[90%]
        max-w-4xl
        `}

        >
            <div className="flex border-b items-center justify-between bg-white p-4 rounded-t-[15px]">
                <div className="flex items-center ">
                    <div className='block md:hidden'>
                        <IoMdArrowRoundBack size={25} onClick={() => {
                            setDisplayChat(false)
                        }} />
                    </div>
                    {geust.isUser ?
                        <Badge
                            badgeContent={4}
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: `${(geust.status === 'ACTIF' && isBlocked === 0) ? "#07F102" : "#B4B4B4"}`,
                                    width: 15,
                                    height: 15,
                                    borderRadius: 50,
                                    border: "2px solid #ffffff",
                                },
                            }}
                            variant="dot"
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                        >
                            <Avatar
                                size="3"
                                src={geust.profilePic}
                                radius="full"
                                fallback="T"
                            />
                        </Badge>
                        :
                        <Avatar
                            size="3"
                            src={geust.profilePic}
                            radius="full"
                            fallback="T"
                        />
                    }

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
                        <IoSettingsSharp size={16} />
                    </Link> :
                        <RiPingPongFill size={20} className='cursor-pointer'
                            onClick={() => { console.log("ali ali") }}
                        />}
                </div>
            </div >

            <div   >
                <ScrollArea scrollbars="vertical" style={{ height: 775 }} ref={scrollAreaRef} >
>>>>>>> origin/lhoussin
                    <Box p="1" pr="3">
                        <ShowMessages messages={Allmsg} user={user} />
                        {isTyping ? <IsTypingMsg /> : <></>}
                    </Box>
                </ScrollArea>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}>
<<<<<<< HEAD
                    <TextField.Root className="ml-2 mr-2" style={{ width: 480 }} >
                        <TextField.Input radius="full" placeholder="  Type your message" size="2"
                            value={msg}

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
=======
                    {/* radius="large"  */}
                    <div className="flex bg-white mx-4  p-1 border rounded-[14px]" >
                        <input type={"text"} className="bg-white m-1 flex flex-grow w-px
                        text-black placeholder-gray-600 text-sm outline-none "
                            value={msg}
                            placeholder={!isMuted ? "  Type your message" : " Your muted from this channel"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setMsg(event.target.value);
                            }}
                        >
                        </input>


                        <div className='flex items-center justify-center w-[30px] h-[30px] 
                rounded-[10px] bg-[#254BD6] cursor-pointer m-[1px]'>
                            <BsFillSendFill color='white'
                                onClick={() =>
                                    handleSendMessage()} />
                        </div>

                    </div >

                </form>
            </div>


            <div>
                <Dialog open={showUnblockAlert} >
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


>>>>>>> origin/lhoussin
        </Box>
    ) : <></>
}

export default BoxChat
