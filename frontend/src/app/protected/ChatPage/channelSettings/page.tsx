import AlertSave from './components/alert_save';
import MembersChannel from './components/membersChannel';
import UpdateChannel from './components/updateChannel';
import { Text } from '@radix-ui/themes';
const PageChat = () => {

    return (
        <div className=' h-screen flex flex-col justify-between'>
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
        </div>
    );
};

export default PageChat;
