'use client'
import { useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useGlobalContext } from "../context/store";
import { MdCancel } from "react-icons/md";
import { createNotification } from "./api/createNotification";


export default function NotificationPage() {

  const { user } = useGlobalContext();

  const [items, setItems] = useState([]);

  useEffect(() => {

    const getData = async () => {
      const response = await axios.get(`http://localhost:4000/notification/getNotifications/11111`); // ${user.id}
      const data = await response.data;
      console.log(data);
      setItems(data);
    }
    if (user.id !== '-1') getData();



  }, [user.id]);

  deleteNotif(() => {

    const getData = async () => {
      const response = await axios.get(`http://localhost:4000/notification/getNotifications/11111`); // ${user.id}
      const data = await response.data;
      console.log(data);
      setItems(data);
    }
    if (user.id !== '-1') getData();



  }, [user.id]);


  return (
    <div className=" bg-color-main h-screen w-screen pl-32 text-white">
      <div onClick={() => {

        const tmp = {
          senderId: user.id,
          recieverId: "",
          subject: "",
        };
        createNotification(tmp);

      }}>create test noti</div>
      <h1 className="text-2xl font-bold mb-4">Notification</h1>
      <div className="w-[80%] h-64 ">
        {items.map((item: any, index) => (
          <div key={index} className="text-black flex  justify-between bg-white border-l-4 border-r-4 border-white p-4 my-2 
          rounded-lg bg-gradient-to-l from-blue-500 to-teal-400 hover:bg-teal-500 hover:border-yellow-400">

            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 mr-4">
                <IoNotificationsCircleOutline className='text-[80px]' />
              </div>
              <div>
                <p className="font-bold text-md lg:text-lg xl:text-2xl hover:underline">Sender ID: {item.user.nickname}</p>
                <p>Subject: {item.subjet}</p>
                <p>Time: {item.createAt}</p>
              </div>
            </div>

            <MdCancel size='20' className="cursor-pointer" onClick={() => {
              console.log("---->");
            }} />


          </div>
        ))}
      </div >
    </div>
  );
}

/// send requist friends
// add to group
// msg
// play a game
