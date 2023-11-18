import { useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";

import axios from "axios";
import notificationmodel from "./backend/"


export default function NotificationPage() {

  const [items, setItems] = useState<NotificationDTO[]>([]);

  useEffect(() => {
    // Make a GET request to the backend API
    axios.get("localhost:4000/notification/getNotifications/789014").then((response) => {
      setItems(response.data);
    });
  }, []);


  /*onst items = [
    {
      id: 1,
      imageUrl: '/path/to/image1.jpg',
      senderId: 'Sender ID 1',
      subject: 'Subject 1',
      time: '10:00 AM',
    },
    {
      id: 2,
      imageUrl: '/path/to/image2.jpg',
      senderId: 'Sender ID 2',
      subject: 'Subject 2',
      time: '11:00 AM',
    },
  ];*/
  return (
    <div className="flex flex-col bg-color-main h-screen w-screen pl-32 text-black">
      <h1 className="text-2xl font-bold mb-4">Title</h1>

      {items.map((item) => (
        <div key={item.id} className="flex items-center bg-white border p-4 my-2 rounded">
          <div className="flex-shrink-0 w-20 h-20 mr-4">
            <IoNotificationsCircleOutline className='text-[80px]' />
          </div>
          <div>
            <p className="font-bold">Sender ID: {item.senderId}</p>
            <p>Subject: {item.subject}</p>
            <p>Time: {item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
  