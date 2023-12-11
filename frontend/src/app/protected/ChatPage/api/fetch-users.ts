import axios from "axios";
import Error from "next/error";
import Cookies from "js-cookie";

export async function getVueGeust(id: string, isUser: Boolean) {
  let geustTemp: geustDto;
  if (isUser) geustTemp = await getUserGeust(id);
  else geustTemp = await getChannelGeust(id);
  return geustTemp;
}

// const getDataGeust = async (tmp: messageDto) => {
//   let geustTemp: geustDto;
//   if (tmp.isDirectMessage)
//     geustTemp = await getUserGeust(tmp.receivedId);
//   else
//     geustTemp = await getChannelGeust(tmp.receivedId);
//   if (geustTemp !== undefined) setGeust(geustTemp);
//   else setOpenAlertError(true);
// };

export async function getUserGeust(id: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/user/getUserGeust/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const geust = await res.data;
    if (geust.error) throw Error;
    return geust;
  } catch (error) {}
}

export async function getUser(id: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await res.data;
    if (user.error) throw Error;
    return user;
  } catch (error) {}
}

export async function getAllUsers(author: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK}/user/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await res.data;
    if (users.error) throw Error;
    return users;
  } catch (error) {}
}

export async function getValideUsers(id: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/user/getValideUsers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = await res.data;
    if (users.error) throw Error;
    return users;
  } catch (error) {}
}

export async function getValideChannels(id: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/getValideChannels/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = await res.data;
    if (users.error) throw Error;
    return users;
  } catch (error) {}
}

export async function getUserForMsg(senderId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/messages/getUserForMsg/${senderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = await res.data;
    if (users.error) throw Error;
    return users;
  } catch (error) {}
}

export async function checkIsBlocked(senderId: string, receivedId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/user/checkIsBlocked/${senderId}/${receivedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    if (data.error) throw Error;
    return data;
  } catch (error) {}
}

export async function getChannelGeust(id: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/user/getChannelGeust/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const geust = await res.data;
    if (geust.error) throw Error;
    return geust;
  } catch (error) {}
}

export async function getMembersChannel(id: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/getMembersChannel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const members = await res.data;
    if (members.error) throw Error;
    return members;
  } catch (error) {}
}

export async function usersCanJoinChannel(senderId: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/user/getUsersCanJoinChannel/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    if (data.error) throw Error;
    return data;
  } catch (error) {}
}

export async function startGameing(senderId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK}/user/startGameing/${senderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    if (data.error) throw Error;
    return data;
  } catch (error) {}
}

export async function finishGaming(senderId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK}/user/finishGaming/${senderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    if (data.error) throw Error;
    return data;
  } catch (error) {}
}
