import axios from "axios";
import { Backend_URL } from "../../../../../lib/Constants";
import Cookies from "js-cookie";

export async function unBlockedUser(senderId: string, recivedId: string) {
  try {
    const token = Cookies.get("access_token");
    await axios.delete(
      Backend_URL + `/friendship/unBlockedUser/${senderId}/${recivedId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    );
  } catch (error) { }
}
