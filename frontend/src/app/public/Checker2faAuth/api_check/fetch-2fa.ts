import axios from "axios";
import { Backend_URL } from "../../../../../lib/Constants";


export const auth_2fa = async (intra_id: string, keyQrCode: string) => {
    try {
        const res = await axios.get(
            Backend_URL +
            `/auth/2fa/authenticate/${intra_id}/${keyQrCode}`
        );
        const data = await res.data;
        return data;
    } catch (error) {
    }
};