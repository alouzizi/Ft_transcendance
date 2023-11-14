'use client'
import { useGlobalContext } from '@/app/context/store';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { Avatar, Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { addUserToChannel } from '../../api/fetch-channel';
import { usersCanJoinChannel } from '../../api/fetch-users';



export default function AlertsAddUserChannel() {
    const [open, setOpen] = React.useState(false);
    const [searsh, setSearsh] = useState('');
    const [valideUsers, setValideUsers] = useState<userDto[]>([]);
    const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
    const { user, geust, socket, setGeust, updateInfo } = useGlobalContext();

    const [clicked, setClicked] = useState<number>(0)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getData() {
            if (user.id !== "-1") {
                const temp = await usersCanJoinChannel(user.id, geust.id);
                setValideUsers(temp);
            }
        }
        getData();
        setClicked((pre) => pre++);
    }, [open, updateInfo, user.id]);

    useEffect(() => {
        const tmp: userDto[] = valideUsers.filter((elm) => {
            const username = elm.nickname;
            return ((username.includes(searsh) && searsh != '') || searsh === "*");
        })
        setUsersFilter(tmp);
    }, [searsh, valideUsers])




    const widgetItem = (usersFilter.length !== 0) ? usersFilter.map((elm, index) => {
        return <Box p="1" pr="3" key={index}>
            <Flex align="center" justify="between" className='border-b py-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.profilePic}
                        fallback="T"
                        style={{ height: '40px', borderRadius: '40px', cursor: 'pointer' }}
                    />
                    <div className='absolute pt-[20px] pl-[25px]'>
                        <GoDotFill size={24}
                            color={(elm.status === 'ACTIF') ? "#15ff00" : "#9b9c9b"} />
                    </div>
                    <Text size="3" weight="bold" className='pl-2'>
                        {elm.nickname}
                    </Text>
                </div>
                <div className='flex items-center'>

                    <IoMdAddCircle size='25' color='#3a86ff' style={{ cursor: 'pointer' }}
                        onClick={async () => {
                            await addUserToChannel(user.id, geust.id, elm.id);
                            setSearsh('');
                            socket?.emit('updateData', {
                                content: '',
                                senderId: user.id,
                                isDirectMessage: false,
                                receivedId: geust.id,
                            });
                            handleClose();

                        }} />
                </div>
            </Flex>
        </Box>
    }) : searsh === '' ? <div></div> : <div className='flex items-center justify-center'>pas user</div>

    return (
        <div  >

            <button onClick={handleClickOpen}
                className="w-fit font-meduim  py-1 rounded-md   text-white bg-green-700 hover:bg-green-600
                            text-xs px-2
                            md:text-sm lg:text-md lg:px-4">
                Add User
            </button>


            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent className=' w-[30rem] h-[20rem] items-center justify-center'>

                    <TextField fullWidth size="small"
                        label="Add user to channel" variant="outlined"
                        value={searsh}
                        onChange={(e) => { setSearsh(e.target.value) }} />
                    <ScrollArea type="always" scrollbars="vertical"
                        style={{ height: 240 }}>
                        {widgetItem}
                    </ScrollArea>

                </DialogContent>
            </Dialog>
        </div >
    );
}

