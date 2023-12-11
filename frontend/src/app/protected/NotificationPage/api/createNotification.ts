import axios from "axios";

export async function createNotification(
  notificationDTO: CreateNotificationDTO
) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK}/notification/createNotification`,
      notificationDTO
    );
    const data = await res.data;
    if (data.error) throw Error;
    return data;
  } catch (error) {}
}
