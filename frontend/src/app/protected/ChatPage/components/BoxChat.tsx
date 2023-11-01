'use client';
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
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const [msg, setMsg] = useState('');
    const [Allmsg, setAllMessage] = useState<messageDto[]>([]);

    const { geust, user, socket, setGeust } = useGlobalContext();

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
        setGeust(temp);
    };

    useEffect(() => {
        if (user.id !== "-1" && socket) {
            const handleReceivedMessage = (data: messageDto) => {
                if (data.senderId === geust.id || data.senderId === user.id || !geust.isUser) {
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
        async function getData() {
            let msgs;
            if (geust.isUser)
                msgs = await getMessageTwoUsers(user.id, geust.id);
            else
                msgs = await getMessagesChannel(user.id, geust.id);
            setAllMessage(msgs);
        }
        if (geust.id !== "-1" && user.id !== "-1") {
            getData();
        }
    }, [geust.id, user.id]);


    useEffect(() => {
        if (user.id !== "-1 " && socket) {
            const upDateGeust = async () => {
                if (geust.id !== "-1") {
                    getDataGeust(geust.id, geust.isUser);
                    setIsTyping(false);
                }
            }
            socket.on("updateData", upDateGeust);
            return () => {
                socket.off("updateData", upDateGeust);
            };
        }
    }, [geust.id, user.id]);

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
        </Box>
    ) : <></>
}

export default BoxChat
