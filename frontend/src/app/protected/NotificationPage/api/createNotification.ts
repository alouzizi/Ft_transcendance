
import axios from 'axios';
import { Backend_URL } from '../../../../../lib/Constants';

export async function createNotification(notificationDTO: CreateNotificationDTO) {
    try {
        const res = await axios.post(
            Backend_URL + `/notification/createNotification`, notificationDTO);
        const data = await res.data;
        if (data.error)
            throw Error
        return data;
    } catch (error) { }
}
