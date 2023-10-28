import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function getUser(id: number) {
    const res = await axios.get(
        Backend_URL + `/user/${id}`,
    );
    const user = await res.data;
    return user;
}

export async function getAllUsers(author: string) {
    const res = await axios.get(
        Backend_URL + '/user/all',
    );
    const users = await res.data;
    return users;
}

export async function getValideUsers(id: number) {
    console.log("------> ", Backend_URL + `user/getValideUsers/${id}`);
    const res = await axios.get(
        Backend_URL + `/user/getValideUsers/${id}`,
    );
    const users = await res.data;
    return users;
}

export async function getUserForMsg(senderId: number) {
    console.log("------> ", Backend_URL + `/user/getUserForMsg/${senderId}`);
    const res = await axios.get(
        Backend_URL + `/user/getUserForMsg/${senderId}`,
    );
    const users = await res.data;
    return users;
}






