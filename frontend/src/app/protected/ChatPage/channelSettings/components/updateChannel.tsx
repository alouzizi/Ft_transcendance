'use client';
import { useGlobalContext } from '@/app/context/store';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Avatar, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { z } from "zod";
import { checkOwnerIsAdmin, getChannel, updateChannel, validePassword } from "../../api/fetch-channel";

enum ChannelType {
    Public = 'Public',
    Private = 'Private'
}
// MiniCropper
export default function UpdateChannel() {



    const { user, geust, saveChanges, setSaveChanges, updateInfo, socket } = useGlobalContext();


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const channelNameSchema = z.string().min(3).max(50).refine((name) => /^[a-zA-Z0-9_-]+$/.test(name))
    const channelkeySchema = z.string().min(3).max(50).refine((name) => /^[a-zA-Z0-9_\-@#*!.]+$/.test(name))
    const [errorName, setErrorName] = useState("");
    const [errorKey, setErrorKey] = useState("");

    const handleChannelType = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (user.id === geust.idUserOwner) {
            if (!validToChange) {
                setOpenConfirm(true);
            } else {
                setSaveChanges((pre) => { return pre + 1 });
                setChannelData((prevState) => {
                    return { ...prevState, channelType: ChannelType.Public };
                });
                if (event.target.value === 'private') {
                    setChannelData((prevState) => {
                        return { ...prevState, channelType: ChannelType.Private };
                    });
                }
            }
        }
    };

    const [channelData, setChannelData] = useState<channelDto>({
        channelName: '',
        channelType: ChannelType.Public,
        channelPassword: '',
        channelOwnerId: '',
        avatar: '',
        protected: false,
        channelMember: []
    })

    const [channel, setChannel] = useState<channelDto>(channelData);

    useEffect(() => {
        const getData = async () => {
            const tmp: channelDto = await getChannel(user.id, geust.id);
            setChannel(tmp);
            setChannelData(tmp);
            setValidToChange(!tmp.protected);
        }
        if (geust.id !== '-1' && !geust.isUser) getData();

    }, [updateInfo]);


    const [isOwnerAdmin, setIsOwnerAdmin] = useState(false);
    useEffect(() => {
        const getData = async () => {
            const tmp: boolean = await checkOwnerIsAdmin(user.id, geust.id);
            setIsOwnerAdmin(tmp);
        }
        if (geust.id !== '-1' && user.id !== '-1' && !geust.isUser) getData();

    }, [updateInfo]);

    const isSameChannel = (channel1: channelDto, channel2: channelDto): boolean => {
        return channel1.channelName === channel2.channelName &&
            channel1.channelType === channel2.channelType &&
            channel1.protected === channel2.protected &&
            channel1.channelPassword === channel2.channelPassword &&
            channel1.avatar === channel2.avatar
    }

    useEffect(() => {
        const updateChan = async () => {
            const res = await updateChannel(channelData, user.id, geust.id);

            if (res.status === 202) {
                setErrorName(res.error)
            } else if (res.status === 200) {
                setSaveChanges(1);
                setChannel(res.channel);
                setChannelData(res.channel);
                setValidToChange(!res.channel.protected);
                socket?.emit('updateData', {
                    content: '',
                    senderId: user.id,
                    isDirectMessage: false,
                    receivedId: geust.id,
                });
            }
        }
        if (isSameChannel(channel, channelData)) setSaveChanges(1);
        if (saveChanges === -1) {
            setChannelData(channel);
            setIsPasswordVisible(false);
            setSaveChanges(1);
        } else if (saveChanges < -2) {
            const parsName = channelNameSchema.safeParse(channelData.channelName);
            const parskey = channelkeySchema.safeParse(channelData.channelPassword);
            if (parsName.success && (parskey.success || !channelData.protected)) {
                updateChan();
            } else {

                if (!parsName.success) setErrorName('Invalid channel name');
                if (!parskey.success && channelData.protected) setErrorKey('Invalid channel key');
            }

        }
    }, [saveChanges]);




    // alert confirm password
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isPasswordVisibleAlert, setIsPasswordVisibleAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [notMatch, setNotMatch] = useState('');
    const [validToChange, setValidToChange] = useState(false);

    useEffect(() => {
        let timerId: any;
        if (validToChange && channel.protected) {
            timerId = setTimeout(() => {
                if (channel.protected) {
                    setValidToChange(false);
                    setIsPasswordVisible(false);
                }
            }, 5000);
        }
        return () => { clearTimeout(timerId) }
    }, [validToChange]);


    return (
        <div className="flex flex-col items-center justify-centser">
            <div className="flex items-center justify-start pt-2 pb-2">

                <label className='border-[2px] border-[#1f3175] hover:border-white rounded-full p-[1.5px]'>
                    <Avatar
                        size="6"
                        src={channelData.avatar}
                        radius="full"
                        fallback="T"
                    />
                    <input type="file" accept="image/*"
                        disabled={!(isOwnerAdmin || !channel.protected)}
                        style={{ display: 'none' }}
                        onChange={(event: any) => {
                            const file = event.target.files[0];
                            if (file) {
                                setSaveChanges((pre) => { return pre + 1 });
                                const imageURL = URL.createObjectURL(file);
                                setChannelData((prevState) => {
                                    return { ...prevState, avatar: imageURL };
                                })
                            }
                        }} />
                </label>


                <div className="flex flex-col items-start justify-start pl-6">
                    <Text as='div' className='pb-1 text-gray-400'
                        style={{ fontSize: 18 }}>CHANNEL NAME</Text>
                    <input type="text" className="bg-[#111623] text-white border border-[#1f3175]
                  placeholder-gray-300 text-sm focus:border-white
                    rounded-lg block w-full p-1.5 outline-none"
                        disabled={!(isOwnerAdmin || !channel.protected)}
                        placeholder={channelData.channelName}
                        value={channelData.channelName}
                        onChange={(e) => {
                            if (isOwnerAdmin || !channel.protected) {

                                if (validToChange === false) {
                                    setOpenConfirm(true);
                                } else {

                                    setSaveChanges((pre) => { return pre + 1 });
                                    setErrorName("");
                                    setChannelData((prevState) => {
                                        return { ...prevState, channelName: e.target.value };
                                    })
                                }
                            }
                        }}
                    ></input>
                    <p className='text-sm text-red-600'>{errorName}</p>
                </div>

                <FormControl >

                    <RadioGroup
                        className='flex flex-col items-start justify-start pl-6'>

                        <FormControlLabel
                            className='text-white'
                            control={
                                <Radio checked={channelData.channelType === ChannelType.Public}
                                    value="public"
                                    onChange={handleChannelType}
                                />} label="Public"
                        />

                        <FormControlLabel
                            className='text-white'
                            control={
                                <Radio checked={channelData.channelType === ChannelType.Private}
                                    value="private"
                                    onChange={handleChannelType}

                                />} label="Private" />

                    </RadioGroup>

                </FormControl>

                <div className="flex flex-col items-start justify-start pl-6">
                    <FormControlLabel className='text-white'
                        control={<Checkbox checked={channelData.protected} onChange={(event) => {

                            if (user.id === geust.idUserOwner) {
                                if (channel.protected && !validToChange) {
                                    setOpenConfirm(true);
                                }
                                console.log(event.target.checked, channelData.protected, validToChange)
                                if (validToChange) {

                                    setChannelData((prevState) => {
                                        return { ...prevState, protected: event.target.checked };
                                    })
                                    if (event.target.checked) {
                                        setChannelData((prevState) => {
                                            return { ...prevState, channelPassword: channel.channelPassword };
                                        })
                                    } else {
                                        setChannelData((prevState) => {
                                            return { ...prevState, channelPassword: '' };
                                        })
                                    }
                                    setSaveChanges((pre) => { return pre + 1 });
                                }
                            }
                        }} />} label="Protected" />
                    <div className='flex bg-[#111623] text-white border border-[#1f3175]
                  placeholder-gray-300 text-sm focus:border-white
                    rounded-lg  w-full p-1.5 outline-none'>
                        <input type={isPasswordVisible ? "text" : "password"} className="bg-[#111623] text-white
                  placeholder-gray-300 text-sm outline-none"
                            placeholder={channelData.channelPassword}
                            disabled={!channelData.protected || (user.id !== geust.idUserOwner)}
                            required={channelData.protected}
                            value={channelData.channelPassword}
                            onChange={(e) => {
                                if (user.id === geust.idUserOwner) {
                                    if (!validToChange) {
                                        setOpenConfirm(true);
                                    } else {
                                        setSaveChanges((pre) => { return pre + 1 });
                                        setErrorKey('');
                                        setChannelData((prevState) => {
                                            return { ...prevState, channelPassword: e.target.value };
                                        })
                                    }
                                }
                            }}
                        >
                        </input>
                        <div className='cursor-pointer' onClick={() => {
                            if (user.id === geust.idUserOwner) {
                                if (!validToChange) {
                                    setOpenConfirm(true);
                                } else {
                                    setIsPasswordVisible((pre) => { return !pre })
                                }
                            }
                        }}>
                            {!isPasswordVisible ?
                                <MdVisibilityOff size={18} color="white" /> :
                                <MdVisibility size={18} color="white" />}
                        </div>
                    </div>
                    <p className='text-sm text-red-600'>{errorKey}</p>
                </div>


            </div>
            <hr className="border-b-[0.5px] border-gray-600 w-3/4" />


            <div>
                <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
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
                                vld = await validePassword(user.id, geust.id, password);
                            if (vld) {
                                setOpenConfirm(false);
                                setValidToChange(true);
                                setChannelData((prevState) => {
                                    return { ...prevState, channelPassword: password };
                                })
                                setChannel((prevState) => {
                                    return { ...prevState, channelPassword: password };
                                })
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

        </div>
    )
}