import axios from "axios";
import { Backend_URL } from "../../../../../lib/Constants";
import Cookies from "js-cookie";

export async function getMessageTwoUsers(sender: string, recived: string) {
  try {
    const token = Cookies.get("access_token");
    const response = await axios.get(
      Backend_URL + `/messages/getDirectMessage/${sender}/${recived}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    );
    const allMessage = await response.data;
    if (allMessage.error) throw Error;
    return allMessage;
  } catch (error) { }
}

export async function getMessagesChannel(sender: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const response = await axios.get(
      Backend_URL + `/messages/getChannelMessage/${sender}/${channelId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    );
    const allMessage = await response.data;
    if (allMessage.error) throw Error;
    return allMessage;
  } catch (error) { }
}

export async function getLastMessageTwoUsers(sender: string, recived: string) {
  try {
    const token = Cookies.get("access_token");
    const response = await axios.get(
      Backend_URL + `/messages/lastMsg/${sender}/${recived}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    );
    const lastMessage = await response.data;
    if (lastMessage.error) throw Error;
    return lastMessage;
  } catch (error) { }
}
