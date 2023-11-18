import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function sendRequistFriend(senderId: string, recivedId: string) {
    try {
        await axios.post(
            Backend_URL + `/friendship/sendFriendRequest/${senderId}/${recivedId}`,
        );
    } catch (error) { }
}

export async function removeRequistFriend(senderId: string, recivedId: string) {
    try {
        await axios.delete(
            Backend_URL + `/friendship/removeFriendRequest/${senderId}/${recivedId}`,
        );
    } catch (error) { }
}


export async function accepteRequistFriend(senderId: string, recivedId: string) {
    try {
        await axios.post(
            Backend_URL + `/friendship/accepteFriendRequest/${senderId}/${recivedId}`,
        );
    } catch (error) { }
}

export async function unBlockedUser(senderId: string, recivedId: string) {
    try {
        await axios.delete(
            Backend_URL + `/friendship/unBlockedUser/${senderId}/${recivedId}`,
        );
    } catch (error) { }
}



