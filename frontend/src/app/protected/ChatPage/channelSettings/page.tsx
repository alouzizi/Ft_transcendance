'use client';
import { useGlobalContext } from '@/app/protected/context/store';
import MembersChannel from './components/membersChannel';
import UpdateChannel from './components/updateChannel';
import { Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { getVueGeust } from '../api/fetch-users';
import { checkOwnerIsAdmin } from '../api/fetch-channel';
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const PageChat = () => {

    const router = useRouter();


    const { geust, setGeust, user, socket } = useGlobalContext();


    useEffect(() => {
        const getDataGeust = async () => {
            const idChannel = localStorage.getItem('geust.id');
            if (idChannel) {
                const temp = await getVueGeust(idChannel, false);
                setGeust(temp);
            }
        };
        if (geust.id === '-1') getDataGeust();
        if (geust.id !== '-1') localStorage.setItem('geust.id', geust.id);
    }, [user.id]);


    useEffect(() => {
        const getDataGeust = async () => {
            if (geust.id !== '-1') {
                const temp = await getVueGeust(geust.id, false);
                setGeust(temp);
            }
        };
        if (socket) {
            socket.on("updateChannel", getDataGeust);
            return () => {
                socket.off("updateChannel", getDataGeust);
            };
        }
    }, [socket]);

    const [isOwnerAdmin, setIsOwnerAdmin] = useState(false);
    useEffect(() => {
        const getData = async (data: { channelId: string }) => {
            if (geust.id === data.channelId) {
                const tmp: boolean = await checkOwnerIsAdmin(user.id, geust.id);
                setIsOwnerAdmin(tmp);
            }
        }
        if (geust.id !== '-1' && user.id !== '-1' && !geust.isUser) getData({ channelId: geust.id });

        if (socket) {
            socket.on("changeStatusMember", getData);
            return () => {
                socket.off("changeStatusMember", getData);
            };
        }
    }, [geust.id]);

    return (
        <div >
            {
                (geust.id !== '-1') ?
                    <div className='h-screen flex flex-col justify-start text-black mt-6'>

                        <div className='flex items-center pl-10'>
                            <IoArrowBack size={40} color='white' className="cursor-pointer"
                                onClick={() => {
                                    router.back();
                                }}
                            />
                            <h1
                                className="text-left font-bold  text-white
                                    text-[25px] ml-2 ">
                                Channel Settings
                            </h1>
                        </div>
                        <div>
                            {isOwnerAdmin ?
                                <div>
                                    <div className="pl-16 pt-4 flex justify-start">
                                        <Text style={{ color: 'white', fontSize: 20 }}>Channel  Overview</Text>
                                    </div>
                                    <UpdateChannel />

                                </div>
                                : <></>
                            }

                            <div className="pl-16 pt-4 flex justify-start">
                                <Text style={{ color: 'white', fontSize: 20 }}>Channel  Members</Text>
                            </div>
                            <MembersChannel />
                        </div>
                    </div>
                    : <div></div>
            }
        </div>
    );
};

export default PageChat;
