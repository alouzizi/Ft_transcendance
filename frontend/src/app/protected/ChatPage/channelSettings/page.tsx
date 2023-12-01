'use client';
import { useGlobalContext } from '@/app/protected/context/store';
import MembersChannel from './components/membersChannel';
import UpdateChannel from './components/updateChannel';
import { Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { getVueGeust } from '../api/fetch-users';
import { checkOwnerIsAdmin } from '../api/fetch-channel';


const PageChat = () => {
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
        const getData = async (data: { idChannel: string }) => {
            if (geust.id === data.idChannel) {
                const tmp: boolean = await checkOwnerIsAdmin(user.id, geust.id);
                setIsOwnerAdmin(tmp);
            }
        }
        if (geust.id !== '-1' && user.id !== '-1' && !geust.isUser) getData({ idChannel: geust.id });

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
                    <div className='h-screen flex flex-col justify-start text-black  '>
                        <div>
                            {isOwnerAdmin ?
                                <div>
                                    <div className="pl-10 pt-4 flex justify-start">
                                        <Text style={{ color: 'white', fontSize: 20 }}>Channel  Overview</Text>
                                    </div>
                                    <UpdateChannel />

                                </div>
                                : <></>
                            }

                            <div className="pl-10 pt-4 flex justify-start">
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
