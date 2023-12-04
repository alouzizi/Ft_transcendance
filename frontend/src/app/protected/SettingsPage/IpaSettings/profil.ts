import axios from "axios";
import { Backend_URL } from "../../../../../lib/Constants";
import Cookies from "js-cookie";



export async function activate2af(intra_id: string, keyQrCode: string) {
    const token = Cookies.get("access_token");
    try {
        const response = await axios.post(
            Backend_URL +
            `/auth/2fa//${intra_id}/${keyQrCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        );
        const data = await response.data;
        // if (data.error) throw Error;
        // return data;

        console.log("---> ", response);
        // if (response.ok) {
        //   setChecked(true);
        //   setUrlImage("");
        //   toast.success(
        //     "2fa authentication turned on successfully"
        //   );
        // } else {
        //   toast.error("Wrong authentication code");
        // }

    } catch (e) {
        // console.log(e)
    }
}