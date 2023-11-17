
import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function getMessageTwoUsers(
    sender: string,
    recived: string,
) {
<<<<<<< HEAD
    const response = await axios.get(
        Backend_URL + `/messages/getDirectMessage/${sender}/${recived}`,
    );
    const allMessage = await response.data;
    return allMessage;
=======
    try {
        const response = await axios.get(
            Backend_URL + `/messages/getDirectMessage/${sender}/${recived}`,
        );
        const allMessage = await response.data;
        if (allMessage.error)
            throw Error
        return allMessage;
    } catch (error) { }
>>>>>>> origin/lhoussin
}


export async function getMessagesChannel(
    sender: string,
    channelId: string,
) {
<<<<<<< HEAD
    const response = await axios.get(
        Backend_URL + `/messages/getChannelMessage/${sender}/${channelId}`,
    );
    const allMessage = await response.data;
    return allMessage;
=======
    try {
        const response = await axios.get(
            Backend_URL + `/messages/getChannelMessage/${sender}/${channelId}`,
        );
        const allMessage = await response.data;
        if (allMessage.error)
            throw Error
        return allMessage;
    } catch (error) { }
>>>>>>> origin/lhoussin
}


export async function getLastMessageTwoUsers(
    sender: string,
    recived: string,
) {
<<<<<<< HEAD
    const response = await axios.get(
        Backend_URL + `/messages/lastMsg/${sender}/${recived}`,
    );
    const lastMessage = await response.data;
    return lastMessage;
=======
    try {
        const response = await axios.get(
            Backend_URL + `/messages/lastMsg/${sender}/${recived}`,
        );
        const lastMessage = await response.data;
        if (lastMessage.error)
            throw Error
        return lastMessage;
    } catch (error) { }
>>>>>>> origin/lhoussin
}

