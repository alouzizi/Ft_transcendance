import axios from "axios";
import Cookies from "js-cookie";

export const generateUrlQr = async () => {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/auth/2fa/generate`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const qrImage = await res.data;
    return qrImage;
  } catch (error) {}
};

export const turnOn_2FA = async (intra_id: string, keyQrCode: string) => {
  try {
    const token = Cookies.get("access_token");
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BACK}/auth/2fa/turnOn/${intra_id}/${keyQrCode}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    // //console.log(response);
    const data = await response.data;
    return data;
  } catch (error) {}
};

export const turnOff_2FA = async (intra_id: string) => {
  try {
    const token = Cookies.get("access_token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/auth/2fa/turn-off/${intra_id}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {}
};
