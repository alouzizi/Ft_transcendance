'use client';
import { useGlobalContext } from '@/app/context/store';
import AlertSave from './components/alert_save';
import MembersChannel from './components/membersChannel';
import UpdateChannel from './components/updateChannel';
import { Text } from '@radix-ui/themes';
import { useEffect } from 'react';
import { getVueGeust } from '../api/fetch-users';


const PageChat = () => {
    const { geust, setGeust, user } = useGlobalContext();

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

    return (
        <div className=' h-screen flex flex-col justify-between text-black'>
            {
                (geust.id !== '-1') ? <div>
                    <div>
                        <div className="pl-4 pt-4 flex  justify-center">
                            <Text style={{ color: 'white', fontSize: 20 }}>Channel  Overview</Text>
                        </div>
                        <UpdateChannel />
                        <div className="pl-4 pt-4 flex justify-center">
                            <Text style={{ color: 'white', fontSize: 20 }}>Channel  Members</Text>
                        </div>
                        <MembersChannel />
                    </div>
                    <AlertSave />
                    <div></div>
                </div> :
                    <></>
            }
        </div>
    );
};

export default PageChat;
