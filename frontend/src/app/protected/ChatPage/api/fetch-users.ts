import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';


export async function getVueGeust(id: string, isUser: Boolean) {
    let geustTemp: geustDto;
    if (isUser)
        geustTemp = await getUserGeust(id);
    else
        geustTemp = await getChannelGeust(id);
    return geustTemp;
};


export async function getUser(id: string) {
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

export async function getValideUsers(id: string) {
    const res = await axios.get(
        Backend_URL + `/user/getValideUsers/${id}`,
    );
    const users = await res.data;
    return users;
}

export async function getUserForMsg(senderId: string) {
    const res = await axios.get(
        Backend_URL + `/messages/getUserForMsg/${senderId}`,
    );
    const users = await res.data;
    return users;
}

export async function getUserGeust(id: string) {
    const res = await axios.get(
        Backend_URL + `/user/getUserGeust/${id}`,
    );
    const geust = await res.data;
    return geust;
}

export async function getChannelGeust(id: string) {
    const res = await axios.get(
        Backend_URL + `/user/getChannelGeust/${id}`,
    );
    const geust = await res.data;
    return geust;
}





