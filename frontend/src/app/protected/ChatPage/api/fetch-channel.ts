import { Backend_URL } from '@/lib/Constants';
import axios from 'axios';

export async function createChannel(channelData: channelDto, senderId: string) {

    const res = await axios.post(
        Backend_URL + `/channel/createChannel/${senderId}`, channelData);
    const data = await res.data;
    return data;

}