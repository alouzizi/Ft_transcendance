import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';
import Error from 'next/error';


export async function getVueGeust(id: string, isUser: Boolean) {
    let geustTemp: geustDto;
    if (isUser)
        geustTemp = await getUserGeust(id);
    else
        geustTemp = await getChannelGeust(id);
    return geustTemp;
};


export async function getUser(id: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/user/${id}`,
        );
        const user = await res.data;
        if (user.error)
            throw Error
        return user;
    } catch (error) { }
}

export async function getAllUsers(author: string) {
    try {
        const res = await axios.get(
            Backend_URL + '/user/all',
        );
        const users = await res.data;
        if (users.error)
            throw Error
        return users;
    } catch (error) { }
}

export async function getValideUsers(id: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/user/getValideUsers/${id}`,
        );
        const users = await res.data;
        if (users.error)
            throw Error
        return users;
    } catch (error) { }
}


export async function getValideChannels(id: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/getValideChannels/${id}`,
        );
        const users = await res.data;
        if (users.error)
            throw Error
        return users;
    } catch (error) { }
}

export async function getUserForMsg(senderId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/messages/getUserForMsg/${senderId}`,
        );
        const users = await res.data;
        if (users.error)
            throw Error
        return users;
    } catch (error) { }
}


export async function checkIsBlocked(senderId: string, receivedId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/user/checkIsBlocked/${senderId}/${receivedId}`,
        );
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) {
    }
}

export async function getUserGeust(id: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/user/getUserGeust/${id}`,
        );
        const geust = await res.data;
        if (geust.error)
            throw Error
        return geust;
    } catch (error) { }
}

export async function getChannelGeust(id: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/user/getChannelGeust/${id}`,
        );
        const geust = await res.data;
        if (geust.error)
            throw Error
        return geust;
    } catch (error) { }
}


export async function getMembersChannel(id: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/getMembersChannel/${id}`,
        );
        const members = await res.data;
        if (members.error)
            throw Error
        return members;
    } catch (error) { }
}

export async function usersCanJoinChannel(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/user/getUsersCanJoinChannel/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}