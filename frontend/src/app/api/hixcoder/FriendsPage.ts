import { Backend_URL } from "@/lib/Constants";
import axios from "axios";

// get all online friends
export async function getOnlineFriends() {
  return await axios.get(Backend_URL + `/hixcoder/onlineFriends/`);
}
