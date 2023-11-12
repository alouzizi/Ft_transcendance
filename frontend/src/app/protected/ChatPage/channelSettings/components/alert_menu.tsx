'use client';

import { useGlobalContext } from '@/app/context/store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { ChangeStatusBanned, changeStatusAdmin, kickMember, muteUserChannel, validePassword } from '../../api/fetch-channel';
import { Text } from '@radix-ui/themes';
import { MdOutlineCancel } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { useState } from 'react';
import { z } from 'zod';

const allOptions = {
    "regulerNotAdmin": [
        'Make Group Admin',
        'kick from Group',
        'ban from Group',
        'Mute'
    ],
    "regulerAdmin": [
        'Remove Group Admin',
        'kick from Group',
        'ban from Group',
        'Mute'
    ],
    "banned": [
        'unban from Group'
    ]
}
const ITEM_HEIGHT = 48;

export default function LongMenu({ member, banned }: { member: memberChannelDto, banned: boolean }) {
    const [options, setOptions] = React.useState<string[]>([]);
    const { geust, user, socket } = useGlobalContext();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {

        if (banned) setOptions(allOptions['banned']);
        else if (member.role === 'Admin') setOptions(allOptions['regulerAdmin']);
        else setOptions(allOptions['regulerNotAdmin']);
        return (() => { setOptions([]) })
    }, [geust.lastSee, open]);

    const handleClose = async (e: any) => {
        if ('Make Group Admin' === e || 'Remove Group Admin' === e) {
            await changeStatusAdmin(user.id, geust.id, member.userId);
        } else if ('ban from Group' === e || 'unban from Group' === e) {
            await ChangeStatusBanned(user.id, geust.id, member.userId);
        } else if ('kick from Group' === e) {
            await kickMember(user.id, geust.id, member.userId);
        } else {
            setOpenTimeout(true);
        }
        socket?.emit('updateData', {
            content: '',
            senderId: user.id,
            isDirectMessage: false,
            receivedId: geust.id,
        });
        socket?.emit('updateData', {
            content: '',
            senderId: user.id,
            isDirectMessage: true,
            receivedId: member.userId,
        });
        setAnchorEl(null);
    };


    const [showInput, setShowInput] = useState(false);

    const [timerInput, setTimerInput] = useState<string>('');
    const [errorInput, setErrorInput] = useState<string>('');
    const timerSchema = z.string().refine((timer) => /^[1-9][0-9]*$/.test(timer));

    const [openTimeout, setOpenTimeout] = useState(false);
    const [timeSelected, setTimeSelected] = useState(0);
    const timeout: string[] = ["60 SECS", "5 MINS", "10 MINS", "1 HOUR", "1 DAY", "1 WEEK"];
    const timeInSecond: string[] = ["60000", "300000", "600000", "3600000", "86400000", "604800000"];


    return (
        <div >
            <div onClick={handleClick} >  <MoreVertIcon /></div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option, index) => (
                    <div key={index} >
                        <MenuItem sx={{ fontSize: 16 }}
                            key={index} onClick={() => { handleClose(option) }}>
                            {option}
                        </MenuItem>
                    </div>
                ))}
            </Menu>



            <div>
                <Dialog open={openTimeout} >
                    <DialogContent style={{ padding: 0, margin: 0 }} className=''>
                        <div className='flex items-center justify-between px-[10px] pt-2 pb-3'>
                            <Text className='text-xl'>Timeout {member.nickname}</Text>
                            <MdOutlineCancel className="cursor-pointer" onClick={() => {
                                setOpenTimeout(false)
                            }} />
                        </div>

                        <div className='flex flex-grow items-center justify-center px-[10px] w-[22rem]'>
                            <Text as="div" className='text-sm'>Members who are in time-out are
                                temporarily not allowed to chat or react in text channels.</Text>
                        </div>
                    </DialogContent>
                    <DialogContent className='flex flex-col w-[25rem]'
                        style={{ padding: 10, margin: 0 }}>

                        <div className='flex items-center pb-2'>
                            <Text className='text-lg'>Duration</Text>
                            <LiaEdit size="18" className="cursor-pointer ml-1.5" onClick={() => {
                                setShowInput((pre) => !pre)
                            }} />
                        </div>
                        <div className='flex justify-center'>

                            {showInput ?
                                <div >
                                    <div className='bg-[#111623]   border border-[#1f3175]
                                     text-sm text-black rounded-lg '>

                                        < input type="text" className="text-sm w-[10rem] h-[30px] rounded-lg bg-gray-200 pl-1"
                                            placeholder='Timer in minutes'
                                            value={timerInput}
                                            onChange={(e) => {
                                                setTimerInput(e.target.value);
                                                setErrorInput("");
                                            }}
                                        />

                                    </div>
                                    <p className='text-sm text-red-600'>{errorInput}</p>
                                </div>
                                :
                                timeout.map((tm: string, index: number) =>
                                    <Text className='border border-black text-[14px] p-1 cursor-pointer m-2'
                                        style={{ background: (index === timeSelected) ? '#0077b6' : "" }}
                                        onClick={() => setTimeSelected(index)}
                                    >{tm}</Text>
                                )
                            }
                        </div>

                    </DialogContent>
                    <DialogActions className='  bg-gray-300 mt-3' >
                        <button onClick={() => { setOpenTimeout(false) }}
                            className="w-fit font-meduim py-1 rounded-md text-white  text-xs px-2
                        md:text-sm lg:text-md hover:underline underline-offset-3">
                            Cancel
                        </button>

                        <button onClick={async () => {
                            if (showInput) {
                                const parsTimer = timerSchema.safeParse(timerInput);
                                if (!parsTimer.success) {
                                    setErrorInput("Enter a valid Timer");
                                } else {
                                    const integerValue: number = parseInt(timerInput) * 60 * 1000;
                                    const timer: string = integerValue.toString();
                                    await muteUserChannel(user.id, geust.id, member.userId, timer);
                                    setOpenTimeout(false);
                                    socket?.emit('updateData', {
                                        content: '',
                                        senderId: user.id,
                                        isDirectMessage: true,
                                        receivedId: member.userId,
                                    });
                                }
                            } else {
                                await muteUserChannel(user.id, geust.id, member.userId, timeInSecond[timeSelected]);
                                setOpenTimeout(false);
                                socket?.emit('updateData', {
                                    content: '',
                                    senderId: user.id,
                                    isDirectMessage: true,
                                    receivedId: member.userId,
                                });
                            }
                        }}
                            className="w-fit font-meduim  py-1 rounded-md text-white bg-[#0077b6]
                            text-xs  
                                md:text-sm lg:text-md px-2">
                            Time-out
                        </button>
                    </DialogActions>
                </Dialog>
            </div>



        </div>
    );
}