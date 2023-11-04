import MembersChannel from './components/membersChannel';
import UpdateChannel from './components/updateChannel';
import { Text } from '@radix-ui/themes';
const PageChat = () => {

    return (
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
    );
};

export default PageChat;
