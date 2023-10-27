import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function sendRequistFriend(senderId: number, recivedId: number) {
    await axios.post(
        Backend_URL + `/friendship/sendFriendRequest/${senderId}/${recivedId}`,
    );

}

export async function removeRequistFriend(senderId: number, recivedId: number) {
    await axios.delete(
        Backend_URL + `/friendship/removeFriendRequest/${senderId}/${recivedId}`,
    );
}


export async function accepteRequistFriend(senderId: number, recivedId: number) {
    await axios.post(
        Backend_URL + `/friendship/accepteFriendRequest/${senderId}/${recivedId}`,
    );
}

export async function deleteFriend(senderId: number, recivedId: number) {
    await axios.delete(
        Backend_URL + `/friendship/deleteFriend/${senderId}/${recivedId}`,
    );
}



