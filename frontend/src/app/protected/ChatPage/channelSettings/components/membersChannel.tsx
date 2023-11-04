'use client';
import { useGlobalContext } from '@/app/context/store';
import Button from '@mui/joy/Button';
import { Avatar, Text } from '@radix-ui/themes';
import { useEffect, useState } from "react";
import { getMembersChannel } from '../../api/fetch-users';
import LongMenu from './alert_menu';



export default function MembersChannel() {

    const { user, geust } = useGlobalContext();
    const [members, setMembers] = useState<memberChannelDto[]>([]);


    useEffect(() => {
        if (geust.id) {
            const getMemberChannel = async () => {
                const tmp = await getMembersChannel(geust.id);
                setMembers(tmp);
            }
            getMemberChannel();
            return () => {
            };
        }
    }, [geust.id, geust.lastSee]);

    const widgetMembers = members.map((member: memberChannelDto, index) => {
        return (
            <div key={index} className='bg-white my-1 w-[450px] h-[60px] rounded-lg
                flex '>
                <div className='flex flex-grow  items-center justify-center pl-1.5'>
                    <Avatar
                        size="3"
                        src={member.profilePic}
                        radius="full"
                        fallback="T"
                    />
                    <div className='flex-grow flex items-center justify-between pr-2'>
                        <Text weight='medium' className='pl-2'>
                            {member.userId === user.id ? "You" : member.nickname}
                        </Text>
                        <div className='flex items-center justify-center'>
                            {member.status === "Admin" ?
                                <Text weight='light' color='gray' className='pr-1'>{member.status}</Text> :
                                <></>}
                            {member.status === "Owner" ?
                                <Text weight='light' color='gray' className='pr-1'>{member.status}</Text> :
                                ((user.id === geust.idUserOwner) ?
                                    <LongMenu member={member} /> :
                                    <></>)
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    })


    return (
        <div className="flex flex-col items-center justify-centser pt-5">
            <div className="flex-grow flex items-between justify-between w-[450px]">
                <input type="text" className="bg-[#111623] text-white border border-[#1f3175]
                      placeholder-gray-300 text-sm focus:border-white
                        rounded-lg block p-1.5 outline-none"
                    placeholder="Search user"
                    // value={channelData.channleName}
                    onChange={(e) => { }}
                ></input>
                <button
                    className="w-fit font-meduim  py-1 rounded-md   text-white bg-green-700 hover:bg-green-600
                            text-xs px-2
                            md:text-sm lg:text-md lg:px-4">
                    Add User
                </button>
            </div>

            {widgetMembers}

            <hr className="border-b-[0.5px] mt-4 border-gray-600 w-3/4" />

            <div className='pt-5'>
                <button
                    className="mr-4 w-fit font-meduim  py-1 rounded-md bg-color-main-whith text-white
                     hover:bg-green-600
                            text-xs px-2
                            md:text-sm lg:text-md lg:px-4">
                    Save Change
                </button>
            </div>
        </div >
    );
}