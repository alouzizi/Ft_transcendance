'use client'
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Flex, Text, Box, ScrollArea } from '@radix-ui/themes';
import TextField from '@mui/material/TextField';
import { useGlobalContext } from '../../../context/store';
import { AiFillMessage } from "react-icons/ai";
import { BsPersonFillAdd, } from "react-icons/bs";
import { FaUserTimes, } from "react-icons/fa";
import { BiUserCheck } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from 'react';
import { getValideChannels, getValideUsers, getVueGeust } from '../api/fetch-users';
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { accepteRequistFriend, removeRequistFriend, sendRequistFriend } from '../api/send-Friend-req';
import { getColorStatus } from './ListUser';
import { IoMdAddCircle } from "react-icons/io";
import { joinChannel } from '../api/fetch-channel';




export default function AlertDialogFind() {
    const { user, setGeust, socket, updateInfo } = useGlobalContext();

    const [open, setOpen] = React.useState(false);

    const [searsh, setSearsh] = useState('');

    const [valideUsers, setValideUsers] = useState<userDto[]>([]);
    const [usersFilter, setUsersFilter] = useState<userDto[]>([]);


    const [valideChannels, setValideChannels] = useState<validChannelDto[]>([]);
    const [channelsFilter, setChannelsFilter] = useState<validChannelDto[]>([]);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getData() {
            if (user.id !== "-1") {
                const temp = await getValideUsers(user.id);
                setValideUsers(temp);
            }
            if (user.id !== "-1") {
                const temp = await getValideChannels(user.id);
                setValideChannels(temp);
            }
        }
        getData();
    }, [open, updateInfo, user.id]);

    useEffect(() => {
        const tmp: userDto[] = valideUsers.filter((elm) => {
            const username = elm.nickname;
            return ((username.includes(searsh) && searsh != '') || searsh === "*");
        })
        setUsersFilter(tmp);

        const chnls: validChannelDto[] = valideChannels.filter((elm: validChannelDto) => {
            const username = elm.channelName;
            return ((username.includes(searsh) && searsh != '') || searsh === "*");
        })
        setChannelsFilter(chnls);
    }, [searsh, valideUsers])


    const getDataGeust = async (id: string, isUser: Boolean) => {
        const temp = await getVueGeust(id, isUser);
        setGeust(temp);
    };

    const widgetItemUser = (usersFilter.length !== 0) ? usersFilter.map((elm, index) => {
        return <Box p="1" pr="3" key={index} className='mx-5'>
            <Flex align="center" justify="between" className='pt-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.profilePic}
                        fallback="T"
                        style={{ height: '40px', borderRadius: '40px', cursor: 'pointer' }}
                    />
                    <div className='absolute pt-7 pl-7'>
                        <GoDotFill size={15} color={getColorStatus(elm.status)} />
                    </div>
                    <Text size="3" weight="bold" className='pl-2'>
                        {elm.nickname}
                    </Text>
                </div>
                <div className='flex items-center'>
                    {/* send friends requist */}
                    {(elm.friendship === 0) ? <BsPersonFillAdd color="blue" size='20' className="mr-4" style={{ cursor: 'pointer' }}
                        onClick={async () => {
                            await sendRequistFriend(user.id, elm.id);
                            elm.friendship = 3;
                            socket?.emit('updateData', {
                                content: '',
                                senderId: user.id,
                                receivedId: elm.id,
                            });
                        }} /> : <></>}

                    {/* accept friends requist */}
                    {(elm.friendship === 2) ? <BiUserCheck color="green" size='20' className="mr-4" style={{ cursor: 'pointer' }}
                        onClick={async () => {
                            await accepteRequistFriend(user.id, elm.id);
                            elm.friendship = 1;
                            socket?.emit('updateData', {
                                content: '',
                                senderId: user.id,
                                receivedId: elm.id,
                            });
                        }} /> : <></>}

                    {/* remove friends requist */}
                    {(elm.friendship === 3) ? <FaUserTimes color="red" size='20' className="mr-4" style={{ cursor: 'pointer' }}
                        onClick={async () => {
                            await removeRequistFriend(user.id, elm.id);
                            elm.friendship = 0;
                            socket?.emit('updateData', {
                                content: '',
                                senderId: user.id,
                                receivedId: elm.id,
                            });
                        }} /> : <></>}

                    <AiFillMessage size='20' style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleClose();
                            getDataGeust(elm.id, true); // proble
                        }} />
                </div>
            </Flex>
        </Box>
    }) : <div ></div>

    const widgetItemChannels = (channelsFilter.length !== 0) ?
        channelsFilter.map((channel: validChannelDto, index) => {
            return <Box p="1" pr="3" key={index} className='mx-5'>
                <Flex align="center" justify="between" className='py-2'>
                    <div className='flex items-center relative'>
                        <Avatar
                            src={channel.avatar}
                            fallback="T"
                            style={{ height: '40px', borderRadius: '40px', cursor: 'pointer' }}
                        />
                        <Text size="3" weight="bold" className='pl-2'>
                            {channel.channelName}
                        </Text>
                    </div>
                    <div className='flex items-center'>

                        {channel.Status === "member" ? <></>
                            : <IoMdAddCircle color="blue" size='20'
                                className="mr-4" style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await joinChannel(user.id, channel.id);
                                }} />}

                        <AiFillMessage size='20' style={{ cursor: 'pointer' }}
                            onClick={() => {
                                handleClose();
                                getDataGeust(channel.id, false); // proble
                            }} />
                    </div>
                </Flex>
            </Box>
        }) : <div ></div>



    return (
        <Box>

            <TbSquareRoundedPlusFilled style={{ color: 'blue', fontSize: '40px', cursor: 'pointer' }}
                onClick={handleClickOpen} />

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >

                <DialogContent className='w-[30rem] h-[20rem]'
                    style={{ padding: 0 }}>
                    <div className='mt-5 mx-2'>
                        <TextField
                            fullWidth size="small"
                            label="Search" variant="outlined"
                            value={searsh}
                            onChange={(e) => { setSearsh(e.target.value) }} />
                    </div>
                    <ScrollArea scrollbars="vertical"
                        style={{ height: 240 }}>
                        {usersFilter.length !== 0 ?
                            <div>
                                <Text className='pl-1 text-sm'>Users</Text>
                                <hr className="border-b-1 border-gray-200 mt-0.5" />
                            </div> :
                            <></>
                        }
                        {widgetItemUser}
                        {channelsFilter.length !== 0 ?
                            <div>
                                <Text className='pl-1 text-sm'>Channels</Text>
                                <hr className="border-b-1 border-gray-200 mt-0.5" />
                            </div> :
                            <></>
                        }
                        {widgetItemChannels}
                    </ScrollArea>

                </DialogContent>
            </Dialog>
        </Box >
    );
}

