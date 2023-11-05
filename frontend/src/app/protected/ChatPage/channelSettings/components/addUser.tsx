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
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { usersCanJoinChannel } from '../../api/fetch-users';
import { addUserToChannel } from '../../api/fetch-channel';



export default function AlertsAddUserChannel() {
    const [open, setOpen] = React.useState(false);
    const [searsh, setSearsh] = useState('');
    const [valideUsers, setValideUsers] = useState<userDto[]>([]);
    const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
    const { user, geust, socket, setGeust } = useGlobalContext();

    const [clicked, setClicked] = useState<number>(0)
    const [update, setUpdate] = useState<number>(0)

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
    }, [open, update, user.id]);

    useEffect(() => {
        const tmp: userDto[] = valideUsers.filter((elm) => {
            const username = elm.nickname;
            return ((username.includes(searsh) && searsh != '') || searsh === "*");
        })
        setUsersFilter(tmp);
    }, [searsh, valideUsers])

    useEffect(() => {
        const updateIcons = () => {
            setUpdate((pre) => { return pre + 1 });
        };
        if (socket) {
            socket.on("updateData", updateIcons);
        }
        return () => {
            if (socket)
                socket.off("updateData", updateIcons);
        };
    }, [socket]);


    const widgetItem = (usersFilter.length !== 0) ? usersFilter.map((elm, index) => {
        return <Box p="1" pr="3" key={index}>
            <Flex align="center" justify="between" className='border-b py-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.profilePic}
                        fallback="T"
                        style={{ height: '40px', borderRadius: '40px', cursor: 'pointer' }}
                    />
                    <div className='absolute pt-7 pl-7'>
                        <GoDotFill size={15} />
                        {/* color={getColorStatus(elm.status)} */}
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
                            setGeust((preGeust: geustDto) => {
                                return { ...preGeust, lastSee: preGeust.lastSee + 1 }
                            });
                            handleClose();

                        }} />
                </div>
            </Flex>
        </Box>
    }) : searsh === '' ? <div></div> : <div className='flex items-center justify-center'>pas user</div>

    return (
        <div  >

            <TbSquareRoundedPlusFilled style={{ color: 'blue', fontSize: '40px', cursor: 'pointer' }}
                onClick={handleClickOpen} />
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

