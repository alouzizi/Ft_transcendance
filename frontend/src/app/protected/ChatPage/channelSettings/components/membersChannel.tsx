'use client';
import { useGlobalContext } from '@/app/context/store';
import { Avatar, Text } from '@radix-ui/themes';
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosExit } from "react-icons/io";
import { leaveChannel } from '../../api/fetch-channel';
import { getMembersChannel } from '../../api/fetch-users';
import AlertsAddUserChannel from './addUser';
import LongMenu from './alert_menu';
import { useRouter } from 'next/navigation';

enum Status {
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",
}

export default function MembersChannel() {

    const [searsh, setSearsh] = useState('');

    const { user, geust, socket, updateInfo, setUpdateInfo, setGeust } = useGlobalContext();
    const [members, setMembers] = useState<memberChannelDto[]>([]);
    const [bannedmembers, setBannedMembers] = useState<memberChannelDto[]>([]);
    const [membersFiltred, setMembersFlitred] = useState<memberChannelDto[]>([]);
    const [bannedmembersFiltred, setBannedMembersFlitred] = useState<memberChannelDto[]>([]);

    const router = useRouter();

    useEffect(() => {
        if (geust.id !== '-1') {
            const getMemberChannel = async () => {
                const tmp: { regularMembres: memberChannelDto[], bannedMembers: memberChannelDto[] }
                    = await getMembersChannel(geust.id);
                setMembers(tmp.regularMembres);
                setBannedMembers(tmp.bannedMembers);
                setMembersFlitred(tmp.regularMembres);
                setBannedMembersFlitred(tmp.bannedMembers);
            }
            getMemberChannel();
        }
    }, [geust.id, geust.lastSee, updateInfo]);

    const [timer, setTimer] = useState(0);
    let lengthMembers = 0;
    useEffect(() => {
        if (user.id !== "-1" && geust.id !== "-1") {
            const checkUserIsMuted = () => {
                const timeoutId = setTimeout(() => {
                    setUpdateInfo(preValue => {
                        return preValue + 1
                    });
                }, timer);
                return () => {
                    clearTimeout(timeoutId);
                };

            }
            if (timer !== 0 && lengthMembers === members.length)
                checkUserIsMuted();
        }
    }, [timer]);

    const widgetUser = (member: memberChannelDto) => {
        return (
            <div key={member.userId} className='bg-white my-1 w-[300px] h-[60px] rounded-lg  flex            
            md:w-[450px]
            '>
                <div className='flex flex-grow  items-center justify-center pl-1.5'>
                    <div className='flex '>
                        <Avatar
                            size="3"
                            src={member.profilePic}
                            radius="full"
                            fallback="T"
                        />
                    </div>
                    <div className='flex-grow flex items-center justify-between pr-2'>
                        <Text weight='medium' className='pl-2'>
                            {member.userId === user.id ? "You" : member.nickname}
                        </Text>
                        <div className='flex items-center justify-center'>

                            {member.role.includes("Admin") ?
                                <Text weight='light' color='gray' className='pr-1'>{member.role}</Text> :
                                <></>}

                            {member.role === "Owner" ?
                                <Text weight='light' color='gray' className='pr-1'>{member.role}</Text> :
                                ((isUserAdmin() && user.id !== member.userId) ?
                                    <LongMenu member={member}
                                        banned={isMemberExist(member, bannedmembers)} /> :
                                    <></>)
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const isMemberExist = (member: memberChannelDto, listMember: memberChannelDto[]): boolean => {
        const tmp = listMember.find((mbr) => (mbr.userId === member.userId));
        if (tmp)
            return true;
        return false;
    }
    const isUserAdmin = (): boolean => {
        for (const mbr of members) {
            if (user.id === mbr.userId && (mbr.role.includes("Admin") || mbr.role === 'Owner'))
                return true;
        }
        return false;
    }

    const widgetMembers = membersFiltred.map((member: memberChannelDto, index) => {
        lengthMembers++;
        if (member.unmuted_at !== 0 && (timer === 0 || member.unmuted_at < timer)) {
            setTimer(member.unmuted_at);
        }
        return <div key={index}>{widgetUser(member)}</div>;
    })
    const widgetBannedMembers = bannedmembersFiltred.map((member: memberChannelDto, index) => {
        return <div key={index}>{widgetUser(member)}</div>;
    })


    useEffect(() => {
        const searchFor = searsh.trim();
        const memberFiltred = members.filter((mbr) => {
            const username = mbr.nickname;
            return ((username.includes(searchFor)) || searchFor === "");
        });
        const bannedmemberFiltred = bannedmembers.filter((mbr) => {
            const username = mbr.nickname;
            return ((username.includes(searchFor)) || searchFor === "");
        });
        setMembersFlitred(memberFiltred);
        setBannedMembersFlitred(bannedmemberFiltred);
    }, [searsh]);


    return (
        <div className="flex flex-col  items-center pt-5 ">
            <div className="flex-grow flex items-between justify-between w-[300px]
            md:w-[450px]
            ">

                <input type="text" className="bg-[#111623] text-white border border-[#1f3175]
                      placeholder-gray-300 text-sm focus:border-white
                        rounded-lg block p-1.5 outline-none"
                    placeholder="Search user"
                    value={searsh}
                    onChange={(e) => { setSearsh(e.target.value) }}
                ></input>

                {isUserAdmin() ? <AlertsAddUserChannel /> : <></>}
            </div>

            <div className='mt-2'>
                <Text className='text-white '>{members.length} members</Text>
                {widgetMembers}
            </div>


            {(bannedmembers.length !== 0 && isUserAdmin()) ?
                <div>
                    <div className='text-white'>
                        {bannedmembers.length} banned
                    </div>
                    {widgetBannedMembers}
                </div> :
                <div></div>}



            {/* <hr className="border-b-[0.5px] mt-4 border-gray-600 w-3/4" /> */}

            <div className='flex pt-3 items-center justify-end text-red-500  w-3/4'>

                <button onClick={async () => {
                    setGeust({
                        isUser: true,
                        id: '-1',
                        nickname: '',
                        profilePic: '',
                        status: Status.INACTIF,
                        lastSee: 0,
                        lenUser: 0,
                        idUserOwner: ''
                    });
                    const tmp = await leaveChannel(user.id, geust.id);
                    socket?.emit('updateData', {
                        content: '',
                        senderId: user.id,
                        isDirectMessage: false,
                        receivedId: geust.id,
                    });
                    router.push('/protected/ChatPage');

                }}
                    className="flex items-center rounded-md text-red-500 px-2
                    hover:bg-red-500 hover:text-white
                    ">
                    <Text size='4' className='pr-2 p-2'> Leave Channel </Text>
                    <IoIosExit size='25px' />
                </button>
            </div>

        </div >

    );
}
