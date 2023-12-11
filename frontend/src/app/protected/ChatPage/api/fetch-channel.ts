import axios from "axios";
import Cookies from "js-cookie";

export async function createChannel(channelData: channelDto, senderId: string) {
  const token = Cookies.get("access_token");
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK}/channel/createChannel/${senderId}`,
      channelData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function updateChannel(
  channelData: channelDto,
  senderId: string,
  channelId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK}/channel/updateChannel/${senderId}/${channelId}`,
      channelData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function addUserToChannel(
  senderId: string,
  channelId: string,
  userId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/addUserToChannel/${senderId}/${channelId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}
//
export async function checkOwnerIsAdmin(senderId: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/checkOwnerIsAdmin/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function leaveChannel(senderId: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/leaveChannel/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function changeStatusAdmin(
  senderId: string,
  channelId: string,
  userId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/changeStatusAdmin/${senderId}/${channelId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function getChannel(senderId: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/getChannel/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function validePassword(
  senderId: string,
  channelId: string,
  password: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/validePassword/${senderId}/${channelId}/${password}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function kickMember(
  senderId: string,
  channelId: string,
  userId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/kickmember/${senderId}/${channelId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function cancelTimeOut(
  senderId: string,
  channelId: string,
  userId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/cancelTimeOutByAdmin/${senderId}/${channelId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function ChangeStatusBanned(
  senderId: string,
  channelId: string,
  userId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/bannedmember/${senderId}/${channelId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function checkUserIsInChannel(
  senderId: string,
  channelId: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/checkUserIsInChannel/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function joinChannel(senderId: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/joinChannel/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function muteUserChannel(
  senderId: string,
  channelId: string,
  userId: string,
  timer: string
) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/muteUserChannel/${senderId}/${channelId}/${userId}/${timer}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}

export async function checkIsMuted(senderId: string, channelId: string) {
  try {
    const token = Cookies.get("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK}/channel/checkIsMuted/${senderId}/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {}
}
