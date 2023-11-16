'use client';
import { useGlobalContext } from '@/app/context/store';
import AlertSave from './components/alert_save';
import MembersChannel from './components/membersChannel';
import UpdateChannel from './components/updateChannel';
import { Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { getVueGeust } from '../api/fetch-users';
import { checkOwnerIsAdmin } from '../api/fetch-channel';


const PageChat = () => {
    const { geust, setGeust, user, updateInfo, setSaveChanges } = useGlobalContext();

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

    const [isOwnerAdmin, setIsOwnerAdmin] = useState(false);
    useEffect(() => {
        const getData = async () => {
            const tmp: boolean = await checkOwnerIsAdmin(user.id, geust.id);
            setIsOwnerAdmin(tmp);
            if (true) setSaveChanges(1)
        }
        if (geust.id !== '-1' && user.id !== '-1' && !geust.isUser) getData();
    }, [updateInfo]);

    return (
        <div >
            {
                (geust.id !== '-1') ?
                    <div className=' h-screen flex flex-col justify-around text-black  '>
                        <div>
                            {isOwnerAdmin ?
                                <div>
                                    <div className="pl-10 pt-4 flex  justify-start">
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
                        <AlertSave />
                        <div></div>
                        <div></div>
                    </div>
                    : <></>
            }
        </div>
    );
};

export default PageChat;
