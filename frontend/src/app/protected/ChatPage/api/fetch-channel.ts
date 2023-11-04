import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function createChannel(channelData: channelDto, senderId: string) {

    const res = await axios.post(
        Backend_URL + `/channel/createChannel/${senderId}`, channelData);
    const data = await res.data;
    return data;

}

export async function changeStatusAdmin(senderId: string, channelId: string, userId: string) {
    const res = await axios.get(
        Backend_URL + `/channel/changeStatusAdmin/${senderId}/${channelId}/${userId}`);
    const data = await res.data;
    return data;
}

export async function getChannel(senderId: string, channelId: string) {
    const res = await axios.get(
        Backend_URL + `/channel/getChannel/${senderId}/${channelId}`);
    const data = await res.data;
    return data;
}


export async function kickMember(senderId: string, channelId: string, userId: string) {
    const res = await axios.get(
        Backend_URL + `/channel/kickmember/${senderId}/${channelId}/${userId}`);
    const data = await res.data;
    return data;
}