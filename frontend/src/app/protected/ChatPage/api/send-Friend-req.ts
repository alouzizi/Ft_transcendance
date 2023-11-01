import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function sendRequistFriend(senderId: string, recivedId: string) {
    await axios.post(
        Backend_URL + `/friendship/sendFriendRequest/${senderId}/${recivedId}`,
    );
}

export async function removeRequistFriend(senderId: string, recivedId: string) {
    await axios.delete(
        Backend_URL + `/friendship/removeFriendRequest/${senderId}/${recivedId}`,
    );
}


export async function accepteRequistFriend(senderId: string, recivedId: string) {
    await axios.post(
        Backend_URL + `/friendship/accepteFriendRequest/${senderId}/${recivedId}`,
    );
}

export async function deleteFriend(senderId: string, recivedId: string) {
    await axios.delete(
        Backend_URL + `/friendship/deleteFriend/${senderId}/${recivedId}`,
    );
}



