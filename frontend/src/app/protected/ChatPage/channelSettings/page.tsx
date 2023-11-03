'use client';
import { useGlobalContext } from '@/app/context/store';
import Box from '@mui/material/Box';
import { Avatar, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { RxExit } from "react-icons/rx";
import { getMembersChannel } from '../api/fetch-users';
import LongMenu from './components/alert_menu';



const PageChat = () => {
    const { geust, user } = useGlobalContext();
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
            <div key={index}>
                <div className='flex items-center justify-start pt-1.5 pl-1.5'>
                    <Avatar
                        size="2"
                        src={member.profilePic}
                        radius="full"
                        fallback="T"
                    />
                    <div className='flex-grow flex items-center justify-between pr-2'>
                        <Text weight='medium' className='pl-1.5'>
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
                <div className='border-b border-white ml-10'></div>
            </div>
        )
    })

    {/* {member.status === "User" ?
                                ((user.id === geust.idUserOwner) ? <LongMenu member={member} /> : <></>) :
                               }
                            */}
    return (
        <div className="flex justify-center items-center h-screen">
            <Box

                style={{
                    width: 500, height: 600,
                    borderRadius: 10, background: "#f1f3f9", marginLeft: 3
                }}
            >

                <div className="flex flex-col border-b items-center justify-center pt-2">
                    <Avatar
                        size="5"
                        src={geust.profilePic}
                        radius="full"
                        fallback="T"
                    />
                    <Text as='div' className='pt-2'>{geust.nickname}</Text>
                </div>

                <div className="flex flex-col items-center justify-center pt-1 pl-">


                    <Box style={{ width: 250 }}>
                        <Text className='pt-2 pl-2 '>{members.length} Membes</Text>
                    </Box>
                    <Box
                        style={{
                            width: 250, height: 300,
                            borderRadius: 10, background: "#caf0f8", marginLeft: 3
                        }}>
                        {widgetMembers}
                    </Box>
                    <Box
                        style={{
                            width: 250, height: 40, marginTop: 5,
                            borderRadius: 10, background: "#caf0f8", marginLeft: 3
                        }}>
                        <div className='flex-grow flex items-center justify-start'>
                            <Text weight='medium' className='pl-2 pt-2 text-red-500'> Exit Group</Text>
                            <RxExit size={25} className='pl-1.5 pt-2 text-red-500' />
                        </div>

                    </Box>
                </div>
            </Box >

        </div>
    );
};

export default PageChat;
