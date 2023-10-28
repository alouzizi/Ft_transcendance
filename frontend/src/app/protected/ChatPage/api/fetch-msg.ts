
import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function getMessageTwoUsers(
    sender: string,
    recived: string,
) {
    const response = await axios.get(
        Backend_URL + `/messages/${sender}/${recived}`,
    );
    const allMessage = await response.data;
    return allMessage;
}


export async function getLastMessageTwoUsers(
    sender: string,
    recived: string,
) {
    const response = await axios.get(
        Backend_URL + `/messages/lastMsg/${sender}/${recived}`,
    );
    const lastMessage = await response.data;
    return lastMessage;
}

