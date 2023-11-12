'use client'
<<<<<<< HEAD
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { useGlobalContext } from '../../../context/store';
import { getValideUsers } from '../api/fetch-users';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { Button, DialogActions } from '@mui/material';
import { MdDeleteForever } from "react-icons/md";
import { GoDotFill } from 'react-icons/go';
import { getColorStatus } from './ListUser';
import { Avatar, Flex, Text, Box, ScrollArea } from '@radix-ui/themes';

export default function AlertAddChannel() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [channelType, setChannelType] = useState<string>('public');
    const [channelName, setChannelName] = useState('');
    const [key, setKey] = useState('');
    const [member, setMember] = useState('');
    const [protect, setProtected] = useState<boolean>(false);

    const { user } = useGlobalContext();
=======
import { Button, DialogActions } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { Avatar, Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { useGlobalContext } from '../../../context/store';
import { getValideUsers, getVueGeust } from '../api/fetch-users';
import { getColorStatus } from './ListUser';
import { z } from "zod";
import { createChannel } from '../api/fetch-channel';

enum ChannelType {
    Public = 'Public',
    Private = 'Private'
}
export default function AlertAddChannel() {
    const [open, setOpen] = React.useState(false);

    const channelNameSchema = z.string().min(3).max(50).refine((name) => /^[a-zA-Z0-9_-]+$/.test(name))
    const channelkeySchema = z.string().min(3).max(50).refine((name) => /^[a-zA-Z0-9_\-@#!.]+$/.test(name))
    const [errorName, setErrorName] = useState("");
    const [errorKey, setErrorKey] = useState("");


    const [channelData, setChannelData] = useState<channelDto>({
        channleName: '',
        channelType: ChannelType.Public,
        channlePassword: '',
        channelOwnerId: '',
        avatar: '',
        protected: false,
        channelMember: []
    })


    const [isReady, setIsReady] = useState(false);

    const [memberSearch, setMemberSearch] = useState('');

    const { user, setGeust, socket } = useGlobalContext();
>>>>>>> implement the sockets successfully
    const [valideUsers, setValideUsers] = useState<userDto[]>([]);
    const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
    const [membersChannel, setMembersChannel] = useState<userDto[]>([]);

    const handleChannelType = (event: React.ChangeEvent<HTMLInputElement>) => {
<<<<<<< HEAD
        setChannelType(event.target.value);
        console.log(event.target.value);
    };
    const handleProtected = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        setProtected(event.target.checked);

    };
    useEffect(() => {
        async function getData() {
            if (user.id !== -1) {
=======
        setChannelData((prevState) => {
            return { ...prevState, channelType: ChannelType.Public };
        });
        if (event.target.value === 'private') {
            setChannelData((prevState) => {
                return { ...prevState, channelType: ChannelType.Private };
            });
        }
    };

    useEffect(() => {
        async function getData() {
            if (user.id !== '-1') {
>>>>>>> implement the sockets successfully
                const temp = await getValideUsers(user.id);
                setValideUsers(temp);
            }
        }
        getData();
    }, [open, user.id]);

    useEffect(() => {
        const tmp: userDto[] = valideUsers.filter((elm) => {
<<<<<<< HEAD
            const username = elm.username;
            return ((username.includes(member) && member != '') || member === "*");
        })
        setUsersFilter(tmp);
    }, [member, valideUsers])
=======
            const username = elm.nickname;
            return ((username.includes(memberSearch) && memberSearch != '') || memberSearch === "*");
        })
        setUsersFilter(tmp);
    }, [memberSearch, valideUsers])


    const getDataGeust = async (id: string, isUser: Boolean) => {
        const temp = await getVueGeust(id, isUser);
        setGeust(temp);
    };
    useEffect(() => {
        async function createCha() {
            if (isReady) {
                const res = await createChannel(channelData, user.id);
                if (res.status === 200) {
                    getDataGeust(res.id, false);
                    socket?.emit('updateData', {
                        content: '',
                        senderId: user.id,
                        isDirectMessage: false,
                        receivedId: res.id,
                    });
                    setOpen(false);
                } else if (res.status === 202) { setErrorName(res.error); }

            }
        }
        createCha();
        return () => setIsReady(false);
    }, [isReady])

    useEffect(() => {
        setChannelData({
            channleName: '',
            channelType: ChannelType.Public,
            channlePassword: '',
            channelMember: [],
            channelOwnerId: '',
            protected: false,
            avatar: '',
        });
        setIsReady(false);
        setMemberSearch('');
        setUsersFilter([]);
        setMembersChannel([]);
    }, [open]);

>>>>>>> implement the sockets successfully

    const checkIsExist = (elm: userDto, list: userDto[]): boolean => {
        const fonud = list.find((tmp) => elm.id === tmp.id);
        if (fonud) return true;
        return false;
    }
    const widgetSearsh = usersFilter.map((elm) => {
<<<<<<< HEAD
        return <Box p="1" pr="3" className='mx-2' >
            <Flex align="center" justify="between" className='border-b py-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.avatar}
=======
        return <Box p="1" pr="3" className='mx-2' key={elm.id}>
            <Flex align="center" justify="between" className='border-b py-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.profilePic}
>>>>>>> implement the sockets successfully
                        fallback="T"
                        style={{ height: '30px', borderRadius: '30px' }}
                    />
                    <div className='absolute pt-5 pl-5'>
                        <GoDotFill size={15} color={getColorStatus(elm.status)} />
                    </div>
                    <Text size="3" weight="bold" className='pl-2'>
<<<<<<< HEAD
                        {elm.username}
=======
                        {elm.nickname}
>>>>>>> implement the sockets successfully
                    </Text>
                </div>
                {checkIsExist(elm, membersChannel) ?
                    <IoPersonRemove color="red" onClick={() => {
                        setMembersChannel((prevMembers) =>
                            prevMembers.filter((member) => member.id !== elm.id));
                    }} /> :
                    <IoPersonAdd color="green" onClick={() => {
                        setMembersChannel((pre) => [...pre, elm]);
                    }} />
                }


            </Flex>
        </Box>
    });
<<<<<<< HEAD
    const widgetMembers = membersChannel.map((elm) => {
        return <Box style={{ display: "inline-block", border: 2 }}>
            <div className='flex  items-center p-1 m-1' style={{ background: "yellow", borderRadius: 5 }}>
                <p>{elm.username}</p>
            </div>
        </Box>
    })
=======

    const [isMouseOver, setIsMouseOver] = useState('-1');
    const widgetMembers = membersChannel.map((elm) => {
        return <Box key={elm.id} style={{ display: "inline-block" }}
            onMouseEnter={() => setIsMouseOver(elm.id)}
            onMouseLeave={() => setIsMouseOver('-1')}>
            <div className='flex  items-center  pl-2 pr-1.5 m-1'
                style={{ background: "pink", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <p>{elm.nickname}</p>
                {(isMouseOver === elm.id) && <TiDelete onClick={() => {
                    setMembersChannel((prevMembers) =>
                        prevMembers.filter((member) => member.id !== elm.id));
                }} color='red' />}

            </div>
        </Box>
    })

>>>>>>> implement the sockets successfully
    return (
        <div>

            <TbSquareRoundedPlusFilled style={{ color: 'blue', fontSize: '40px', cursor: 'pointer' }}
<<<<<<< HEAD
                onClick={handleClickOpen} />
=======
                onClick={() => setOpen(true)} />
>>>>>>> implement the sockets successfully

            <Dialog
                open={open}
                keepMounted
<<<<<<< HEAD
                onClose={handleClose}
            >
                <DialogTitle textAlign="center" >{"Create Channel"}</DialogTitle>

                <DialogContent className='w-[20rem] h-[25rem] '>
=======
            // onClose={handleClose}
            >
                <div className='flex justify-end mt-2 mr-2' >
                    <TiDelete onClick={() => setOpen(false)} size="30" />
                </div>
                <DialogTitle textAlign="center" >{"Create Channel"}</DialogTitle>
                <DialogContent className='w-[25rem] h-[25rem] '>
>>>>>>> implement the sockets successfully

                    <div
                        style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center'
                        }}>

                        <ScrollArea type="always" scrollbars="vertical"
                            style={{
                                height: 300, width: 200,
<<<<<<< HEAD
=======
                                alignItems: "center", justifyItems: "center"
>>>>>>> implement the sockets successfully
                            }}>

                            <FormControl className='ml-2'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group">

                                    <FormControlLabel
                                        control={
<<<<<<< HEAD
                                            <Radio checked={channelType === 'public'}
=======
                                            <Radio checked={channelData.channelType === ChannelType.Public}
>>>>>>> implement the sockets successfully
                                                value="public"
                                                onChange={handleChannelType}
                                            />} label="Public" />

                                    <FormControlLabel
                                        control={
<<<<<<< HEAD
                                            <Radio checked={channelType === 'private'}
=======
                                            <Radio checked={channelData.channelType === ChannelType.Private}
>>>>>>> implement the sockets successfully
                                                value="private"
                                                onChange={handleChannelType}

                                            />} label="Private" />

                                </RadioGroup>
                            </FormControl>

                            <TextField required fullWidth size="small" className='mt-3'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Channel Name" variant="outlined"
<<<<<<< HEAD
                                value={channelName}
                                onChange={(e) => { setChannelName(e.target.value) }} />

                            <FormControlLabel control={<Checkbox onChange={handleProtected} />} label="Protected" />

                            <TextField
                                disabled={!protect}
                                fullWidth size="small" className='mt-1 mb-3'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Channel Key" variant="outlined"
                                value={key}
                                onChange={(e) => { setKey(e.target.value) }} />


                            {widgetMembers}
                            <TextField fullWidth size="small" className='mt-2'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Add membres" variant="outlined"
                                value={member}
                                onChange={(e) => { setMember(e.target.value) }} />
=======
                                value={channelData.channleName}
                                onChange={(e) => {
                                    setErrorName('');
                                    setChannelData((prevState) => {
                                        return { ...prevState, channleName: e.target.value };
                                    });

                                }} />
                            {errorName && <Text as="div" color='red'>{errorName}</Text>}

                            <FormControlLabel control={<Checkbox checked={channelData.protected} onChange={(event) => {
                                setErrorKey('');
                                setChannelData((prevState) => {
                                    return { ...prevState, channlePassword: '' };
                                });
                                setChannelData((prevState) => {
                                    return { ...prevState, protected: event.target.checked };
                                });
                            }} />} label="Protected" />

                            <TextField
                                disabled={!channelData.protected}
                                required={channelData.protected}
                                type="password"
                                fullWidth size="small" className='mt-1'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Channel Key" variant="outlined"
                                value={channelData.channlePassword}
                                onChange={(e) => {
                                    setErrorKey(''),
                                        setChannelData((prevState) => {
                                            return { ...prevState, channlePassword: e.target.value };
                                        });

                                }} />
                            {errorKey && <Text as="div" color='red'>{errorKey}</Text>}

                            <div className='mt-2'> {widgetMembers}</div>
                            <TextField fullWidth size="small" className='mt-1'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Add membres" variant="outlined"
                                value={memberSearch}
                                onChange={(e) => { setMemberSearch(e.target.value) }} />
>>>>>>> implement the sockets successfully
                            {widgetSearsh}


                        </ScrollArea>

                    </div>

                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button style={{ background: 'blue', color: "white" }}
<<<<<<< HEAD
                            onClick={handleClose}>Create</Button>
=======
                            onClick={() => {
                                const parsName = channelNameSchema.safeParse(channelData.channleName);
                                const parskey = channelkeySchema.safeParse(channelData.channlePassword);
                                if (parsName.success && (parskey.success || !channelData.protected)) {
                                    for (const user of membersChannel) {
                                        setChannelData((prevState) => {
                                            return {
                                                ...prevState,
                                                channelMember: [...prevState.channelMember, user.id]
                                            };
                                        });
                                    }
                                    setIsReady(true);
                                } else {
                                    if (!parsName.success) setErrorName('Invalid channel name');
                                    if (!parskey.success && channelData.protected) setErrorKey('Invalid channel key');
                                }
                            }}>Create</Button>
>>>>>>> implement the sockets successfully
                    </DialogActions>

                </DialogContent>

            </Dialog>
        </div >
    );
}





