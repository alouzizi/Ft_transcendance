'use client';
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
import { FaRegStopCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaGamepad } from "react-icons/fa";
import PlayInvite from '../../GamePage/components/Invite';



const BoxChat = () => {

    const router = useRouter();

    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const [msg, setMsg] = useState('');
    const [Allmsg, setAllMessage] = useState<messageDto[]>([]);

    const { geust, user, socket, setGeust, updateInfo, displayChat, setDisplayChat } = useGlobalContext();

    const [isTyping, setIsTyping] = useState<boolean>(false)

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [Allmsg, isTyping, user.id, geust.id])



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
    }, [socket, user.id, geust.id]);

    // useEffect(() => {
    //     if (user.id !== "-1 ") {
    //         const upDateGeust = async () => {
    //             if (geust.id !== "-1") {
    //                 getDataGeust(geust.id, geust.isUser);
    //                 setIsTyping(false);
    //             }
    //         }
    //         upDateGeust();
    //     }
    // }, [geust.id, user.id, updateInfo]);


    const [isBlocked, setIsBlocked] = useState<number>(0)
    const [showUnblockAlert, setUnblockAlert] = useState<boolean>(false)
    useEffect(() => {
        if (socket && user.id !== "-1" && geust.id !== "-1" && geust.isUser) {
            const upDateGeust = async () => {
                const check = await checkIsBlocked(user.id, geust.id);
                if (check !== undefined) setIsBlocked(check);

            }
            upDateGeust();
            socket.on("blockUserToUser", upDateGeust);
            return () => {
                socket.off("blockUserToUser", upDateGeust);
            };
        }
    }, [socket, user.id, geust.id]);

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



    const [isMuted, setIsMuted] = useState(false);
    useEffect(() => {
        if (socket && user.id !== "-1" && geust.id !== "-1" && !geust.isUser) {
            const checkUserIsMuted = async () => {
                const timer = await checkIsMuted(user.id, geust.id);
                if (timer !== undefined && timer !== -1) {
                    setMsg('');
                    setIsMuted(true);
                    const timeoutId = setTimeout(() => {
                        setIsMuted(false);
                        socket?.emit('updateData', {
                            content: '',
                            senderId: user.id,
                            isDirectMessage: false,
                            receivedId: geust.id,
                        });
                    }, timer);
                    return () => clearTimeout(timeoutId);

                } else {
                    setIsMuted(false);
                }
            }
            checkUserIsMuted();
            socket.on("mutedUserInChannel", checkUserIsMuted);
            return () => {
                socket.off("mutedUserInChannel", checkUserIsMuted);
            };
        }
    }, [socket, geust.id, user.id, updateInfo]);

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


    async function getData() {
        let msgs;
        if (geust.isUser)
            msgs = await getMessageTwoUsers(user.id, geust.id);
        else
            msgs = await getMessagesChannel(user.id, geust.id);
        if (msgs !== undefined) setAllMessage(msgs);
    }
    useEffect(() => {
        if (socket && geust.id !== "-1" && user.id !== "-1") {
            getData();
            socket.on("updateMessageInChannel", getData);
            return () => {
                socket.off("updateMessageInChannel", getData);
            };
        }
    }, [socket, geust.id, user.id]);

    useEffect(() => {
        const getDataGeust = async (data: { idChannel: string }) => {
            if (geust.id == data.idChannel) {
                const temp = await getVueGeust(geust.id, false);
                setGeust(temp);
                getData();
            }
        };
        if (socket) {
            socket.on("updateChannel", getDataGeust);
            return () => {
                socket.off("updateChannel", getDataGeust);
            };
        }
    }, [socket, geust.id]);

    return (geust.id != "-1") ? (
        <Box
            className={`
        bg-[#F1F3F9] h-[800px] rounded-[15px] 
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
                            badgeContent=
                            {<div>
                                {geust.inGaming ? <FaGamepad /> : <></>}
                            </div>}
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: `${(geust.status === 'ACTIF' && isBlocked === 0) ? "#07F102" : "#B4B4B4"}`,
                                    width: 15,
                                    height: 15,
                                    borderRadius: 50,
                                    border: "2px solid #ffffff",
                                },
                            }}
                            variant={geust.inGaming ? "standard" : "dot"}
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
                        <Text onClick={() => {
                            if (geust.isUser) {
                                router.push(`/protected/DashboardPage/${geust.nickname}`);
                            }
                        }} size="2" weight="bold"

                            className={`${geust.isUser ? "hover:underline cursor-pointer pl-2" : "pl-2"}`}>
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
                            onClick={() => { PlayInvite({ userId1: user.id, userId2: geust.id, socket: socket }) }}
                        />}
                </div>
            </div >

            <div   >
                <ScrollArea scrollbars="vertical" style={{ height: 675 }} ref={scrollAreaRef} >
                    <Box p="1" pr="3">
                        <ShowMessages messages={Allmsg} user={user} />
                        {isTyping ? <IsTypingMsg /> : <></>}
                    </Box>
                </ScrollArea>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}>
                    {/* radius="large"  */}
                    <div className="flex bg-white mx-4  p-1 border rounded-[14px]" >
                        <input type={"text"} className="bg-white m-1 flex flex-grow w-px
                        text-black placeholder-gray-600 text-sm outline-none "
                            value={msg}
                            disabled={isMuted}
                            placeholder={!isMuted ? "  Type your message" : " Your muted from this channel"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setMsg(event.target.value);
                            }}
                        >
                        </input>

                        <div className={`flex items-center justify-center w-[30px] h-[30px] 
                rounded-[10px] bg-[#254BD6]  m-[1px] ${isMuted ? "" : "cursor-pointer"} `}>
                            {!isMuted ?
                                <BsFillSendFill color='white'
                                    onClick={() =>
                                        handleSendMessage()} /> :
                                <FaRegStopCircle color='white' />}
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
                                socket?.emit('blockUserToUser', geust.id);
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
    ) : <div></div>
}

export default BoxChat
