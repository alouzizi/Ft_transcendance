'use client'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Avatar, Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { AiFillMessage } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { BsPersonFillAdd, } from "react-icons/bs";
import { FaUserTimes, } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { useGlobalContext } from '../../../context/store';
import { joinChannel, validePassword } from '../api/fetch-channel';
import { getValideChannels, getValideUsers, getVueGeust } from '../api/fetch-users';
import { accepteRequistFriend, removeRequistFriend, sendRequistFriend } from '../api/send-Friend-req';
import { getColorStatus } from './ListUser';



export default function AlertDialogFind() {


    const { user, setGeust, socket, updateInfo, setOpenAlertError } = useGlobalContext();

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
                if (temp !== undefined) setValideUsers(temp);
                else setOpenAlertError(true);
            }
            if (user.id !== "-1") {
                const temp = await getValideChannels(user.id);
                if (temp !== undefined) setValideChannels(temp);
                else setOpenAlertError(true);
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
        if (temp !== undefined) setGeust(temp);
        else setOpenAlertError(true);
    };

    const [idChannel, setIdChannel] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isPasswordVisibleAlert, setIsPasswordVisibleAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [notMatch, setNotMatch] = useState('');

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
                                className="mr-2" style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    if (!channel.protected) {
                                        await joinChannel(user.id, channel.id);
                                        handleClose();
                                        getDataGeust(channel.id, false);
                                    } else {
                                        setIdChannel(channel.id);
                                        setOpenConfirm(true);
                                    }
                                }} />}

                        {channel.Status === "user" ? <></>
                            : <AiFillMessage size='20' style={{ cursor: 'pointer' }}
                                className="mr-2"
                                onClick={() => {
                                    handleClose();
                                    getDataGeust(channel.id, false);
                                }} />}
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


            <div>
                <Dialog open={openConfirm} onClose={() => { setOpenConfirm(false) }}>
                    <DialogTitle>Confirme Action</DialogTitle>
                    <DialogContent className='flex flex-col'>
                        <div className='flex bg-[#f1f3f8] text-black border border-[#1f3175]
                  placeholder-gray-300 text-sm focus:border-white
                    rounded-lg  w-full p-1.5 outline-none'
                            style={{ borderColor: (notMatch === '') ? '#1f3175' : 'red' }}
                        >
                            <input type={isPasswordVisibleAlert ? "text" : "password"} className="bg-[#f1f3f8]
                        text-black
                  placeholder-gray-300 text-sm outline-none"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setNotMatch('');
                                }}
                            >
                            </input>
                            <div className='cursor-pointer' onClick={() => { setIsPasswordVisibleAlert((pre) => { return !pre }) }}>
                                {!isPasswordVisibleAlert ?
                                    <MdVisibilityOff size={18} color="black" /> :
                                    <MdVisibility size={18} color="black" />}
                            </div>
                        </div>
                        <p className='text-sm text-red-600'>{notMatch}</p>

                    </DialogContent>
                    <DialogActions>
                        <button onClick={async () => {
                            let vld = false;
                            if (password !== '')
                                vld = await validePassword(user.id, idChannel, password);
                            if (vld) {
                                setOpenConfirm(false);
                                await joinChannel(user.id, idChannel);
                                handleClose();
                                getDataGeust(idChannel, false);
                                setPassword('');
                            } else {
                                setNotMatch('Password not Match');
                            }
                        }}
                            className="w-fit font-meduim  py-1 rounded-md   text-white bg-[#4069ff]
                        text-xs px-2
                        md:text-sm lg:text-md lg:px-4">
                            Confirm
                        </button>
                    </DialogActions>
                </Dialog>
            </div>

        </Box >
    );
}

