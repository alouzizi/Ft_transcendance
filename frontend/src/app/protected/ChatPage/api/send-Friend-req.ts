import axios from "axios";
import Cookies from "js-cookie";

export async function unBlockedUser(senderId: string, recivedId: string) {
  try {
    const token = Cookies.get("access_token");
    await axios.delete(
      process.env.Backend_URL +
        `/friendship/unBlockedUser/${senderId}/${recivedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
}
