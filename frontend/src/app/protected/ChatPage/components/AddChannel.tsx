'use client'
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
    const [valideUsers, setValideUsers] = useState<userDto[]>([]);
    const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
    const [membersChannel, setMembersChannel] = useState<userDto[]>([]);

    const handleChannelType = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                const temp = await getValideUsers(user.id);
                setValideUsers(temp);
            }
        }
        getData();
    }, [open, user.id]);

    useEffect(() => {
        const tmp: userDto[] = valideUsers.filter((elm) => {
            const username = elm.username;
            return ((username.includes(member) && member != '') || member === "*");
        })
        setUsersFilter(tmp);
    }, [member, valideUsers])

    const checkIsExist = (elm: userDto, list: userDto[]): boolean => {
        const fonud = list.find((tmp) => elm.id === tmp.id);
        if (fonud) return true;
        return false;
    }
    const widgetSearsh = usersFilter.map((elm) => {
        return <Box p="1" pr="3" className='mx-2' >
            <Flex align="center" justify="between" className='border-b py-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.avatar}
                        fallback="T"
                        style={{ height: '30px', borderRadius: '30px' }}
                    />
                    <div className='absolute pt-5 pl-5'>
                        <GoDotFill size={15} color={getColorStatus(elm.status)} />
                    </div>
                    <Text size="3" weight="bold" className='pl-2'>
                        {elm.username}
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
    const widgetMembers = membersChannel.map((elm) => {
        return <Box style={{ display: "inline-block", border: 2 }}>
            <div className='flex  items-center p-1 m-1' style={{ background: "yellow", borderRadius: 5 }}>
                <p>{elm.username}</p>
            </div>
        </Box>
    })
    return (
        <div>

            <TbSquareRoundedPlusFilled style={{ color: 'blue', fontSize: '40px', cursor: 'pointer' }}
                onClick={handleClickOpen} />

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle textAlign="center" >{"Create Channel"}</DialogTitle>

                <DialogContent className='w-[20rem] h-[25rem] '>

                    <div
                        style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center'
                        }}>

                        <ScrollArea type="always" scrollbars="vertical"
                            style={{
                                height: 300, width: 200,
                            }}>

                            <FormControl className='ml-2'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group">

                                    <FormControlLabel
                                        control={
                                            <Radio checked={channelType === 'public'}
                                                value="public"
                                                onChange={handleChannelType}
                                            />} label="Public" />

                                    <FormControlLabel
                                        control={
                                            <Radio checked={channelType === 'private'}
                                                value="private"
                                                onChange={handleChannelType}

                                            />} label="Private" />

                                </RadioGroup>
                            </FormControl>

                            <TextField required fullWidth size="small" className='mt-3'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Channel Name" variant="outlined"
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
                            {widgetSearsh}


                        </ScrollArea>

                    </div>

                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button style={{ background: 'blue', color: "white" }}
                            onClick={handleClose}>Create</Button>
                    </DialogActions>

                </DialogContent>

            </Dialog>
        </div >
    );
}





