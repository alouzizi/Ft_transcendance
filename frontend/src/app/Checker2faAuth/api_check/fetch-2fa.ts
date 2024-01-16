import axios from "axios";

export const auth_2fa = async (intra_id: string, keyQrCode: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/auth/2fa/authenticate/${intra_id}/${keyQrCode}`
    );
    const data = await res.data;
    return data;
  } catch (error) {}
};
