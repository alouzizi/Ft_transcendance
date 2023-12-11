// import axios from "axios";
// import { NEXT_PUBLIC_BACK } from "../../../../../lib/Constants";
// import Cookies from "js-cookie";

// export async function activate2af(intra_id: string, keyQrCode: string) {
//     const token = Cookies.get("access_token");
//     try {
//         const response = await axios.post(
//             NEXT_PUBLIC_BACK +
//             `/auth/2fa//${intra_id}/${keyQrCode}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         }
//         );
//         const data = await response.data;
//         // if (data.error) throw Error;
//         // return data;

//         //console.log("---> ", response);
//         // if (response.ok) {
//         //   setChecked(true);
//         //   setUrlImage("");
//         //   toast.success(
//         //     "2fa authentication turned on successfully"
//         //   );
//         // } else {
//         //   toast.error("Wrong authentication code");
//         // }

//     } catch (e) {
//         // //console.log(e)
//     }
// }
