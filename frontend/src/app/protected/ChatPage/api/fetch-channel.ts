import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function createChannel(channelData: channelDto, senderId: string) {
<<<<<<< HEAD

    const res = await axios.post(
        Backend_URL + `/channel/createChannel/${senderId}`, channelData);
    const data = await res.data;
    return data;

=======
    try {
        const res = await axios.post(
            Backend_URL + `/channel/createChannel/${senderId}`, channelData);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function updateChannel(channelData: channelDto, senderId: string, channelId: string,) {
    try {
        const res = await axios.post(
            Backend_URL + `/channel/updateChannel/${senderId}/${channelId}`, channelData);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function addUserToChannel(senderId: string, channelId: string, userId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/addUserToChannel/${senderId}/${channelId}/${userId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}
// 
export async function checkOwnerIsAdmin(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/checkOwnerIsAdmin/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function leaveChannel(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/leaveChannel/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}


export async function changeStatusAdmin(senderId: string, channelId: string, userId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/changeStatusAdmin/${senderId}/${channelId}/${userId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function getChannel(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/getChannel/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}


export async function validePassword(senderId: string, channelId: string, password: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/validePassword/${senderId}/${channelId}/${password}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}


export async function kickMember(senderId: string, channelId: string, userId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/kickmember/${senderId}/${channelId}/${userId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function cancelTimeOut(senderId: string, channelId: string, userId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/cancelTimeOutByAdmin/${senderId}/${channelId}/${userId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function ChangeStatusBanned(senderId: string, channelId: string, userId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/bannedmember/${senderId}/${channelId}/${userId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function checkUserIsInChannel(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/checkUserIsInChannel/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}


export async function joinChannel(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/joinChannel/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function muteUserChannel(senderId: string, channelId: string, userId: string, timer: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/muteUserChannel/${senderId}/${channelId}/${userId}/${timer}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}

export async function checkIsMuted(senderId: string, channelId: string) {
    try {
        const res = await axios.get(
            Backend_URL + `/channel/checkIsMuted/${senderId}/${channelId}`);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
>>>>>>> origin/lhoussin
}