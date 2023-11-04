'use client';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { useGlobalContext } from '@/app/context/store';
import { Avatar, Text } from '@radix-ui/themes';
import { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { getChannel } from "../../api/fetch-channel";
import Checkbox from '@mui/material/Checkbox';
import { z } from "zod";

enum ChannelType {
    Public = 'Public',
    Private = 'Private'
}

export default function UpdateChannel() {

    const { user, geust } = useGlobalContext();


    const channelNameSchema = z.string().min(3).max(50).refine((name) => /^[a-zA-Z0-9_-]+$/.test(name))
    const channelkeySchema = z.string().min(3).max(50).refine((name) => /^[a-zA-Z0-9_\-@#!.]+$/.test(name))

    const handleChannelType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelData((prevState) => {
            return { ...prevState, channelType: ChannelType.Public };
        });
        if (event.target.value === 'private') {
            setChannelData((prevState) => {
                return { ...prevState, channelType: ChannelType.Private };
            });
        }
    };

    const [protect, setProtected] = useState<boolean>(false);
    const [channelData, setChannelData] = useState<channelDto>({
        channleName: '',
        channelType: ChannelType.Public,
        channlePassword: '',
        channelOwnerId: '',
        avatar: '',
        protected: false,
        channelMember: []
    })

    useEffect(() => {

        const getData = async () => {
            const tmp: channelDto = await getChannel(user.id, geust.id);
            setChannelData(tmp);
        }
        if (geust.id !== '-1' && !geust.isUser) getData();
        return () => {
        };
    }, []);

    if (channelData.avatar === '') return <div></div>

    return (
        <div className="flex flex-col items-center justify-centser">
            <div className="flex items-center justify-start 
                pt-2 pb-2">
                <Avatar
                    size="6"
                    src={channelData.avatar}
                    radius="full"
                    fallback="T"
                />

                <div className="flex flex-col items-start justify-start pl-6">
                    <Text as='div' className='pb-1 text-gray-400'
                        style={{ fontSize: 18 }}>CHANNEL NAME</Text>
                    <input type="text" className="bg-[#111623] text-white border border-[#1f3175]
                      placeholder-gray-300 text-sm focus:border-white
                        rounded-lg block w-full p-1.5 outline-none"
                        placeholder={channelData.channleName}
                        value={channelData.channleName}
                        onChange={(e) => {
                            setChannelData((prevState) => {
                                return { ...prevState, channleName: e.target.value };
                            })
                        }}
                    ></input>
                </div>

                <FormControl >

                    <RadioGroup
                        // row
                        // aria-labelledby="demo-row-radio-buttons-group-label"
                        className='flex flex-col items-start justify-start pl-6'
                    >

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
                        control={<Checkbox onChange={(event) => {

                        }} />} label="Protected" />
                    <input type="text" className="bg-[#111623] text-white border border-[#1f3175]
                      placeholder-gray-300 text-sm focus:border-white
                        rounded-lg block w-full p-1.5 outline-none"
                        placeholder={channelData.channlePassword}
                        value={channelData.channlePassword}
                        onChange={() => { }}
                        disabled={!protect}
                        required={protect}
                    ></input>
                </div>

            </div>
            <hr className="border-b-[0.5px] border-gray-600 w-3/4" />
        </div>
    );
}