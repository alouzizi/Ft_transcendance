'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/store';
import { createNotification } from './api/createNotification';
import { FaTrashCan } from 'react-icons/fa6';
import React from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getUserGeust } from '../ChatPage/api/fetch-users';

function formatDateAndTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  // Get date components
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');

  // Get time components
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');

  // Format the result string
  const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateAndTime;
}

// Example usage
const dateTimeString = '2023-11-19T00:33:29.272Z';
const formattedDateTimeString = formatDateAndTime(dateTimeString);
//console.log(formattedDateTimeString); // Output: "2023-11-19 00:33"

export default function NotificationPage() {
  const router = useRouter();
  const subjects = [
    'send you friend request',
    'accept friend request',
    'invite you to a PongMaster game',
    "you've been invited to group",
    'send message',
  ];
  let randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

  const [currentSubject, setCurrentSubject] = useState(subjects[0]); // Set the initial subject
  const [currentAnimationData, setCurrentAnimationData] =
    useState('animationData1'); // Set the initial animation data

  useEffect(() => {
    // Load the appropriate animation based on the current subject
    switch (currentSubject) {
      case subjects[0]:
        setCurrentAnimationData('send you friend request');
        break;
      case subjects[1]:
        setCurrentAnimationData('invite you to a PongMaster game');
        break;
      case subjects[2]:
        setCurrentAnimationData("you've been invited to group");
        break;
      case subjects[3]:
        setCurrentAnimationData('send message');
      case subjects[4]:
        setCurrentAnimationData('accept friend reques');
        break;
    }
  });

  const { user, setGeust, socket } = useGlobalContext();

  const [items, setItems] = useState([]);
  const [Delete, setDelete] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get('access_token');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK}/notification/getNotifications/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.data;
      setItems(data);
    };
    if (user.id !== '-1') getData();
    if (socket) {
      socket.on('sendNotification', getData);
    }
    return () => {
      if (socket) socket.off('sendNotification', getData);
    };
  }, [user.id, socket, Delete]);

  const DeleteFn = async (id: string) => {
    const token = Cookies.get('access_token');
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACK}/notification/deletenotifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.data;
    setDelete((prevDelete) => !prevDelete);
    socket?.emit('sendNotification', user.id);
  };

  const widgetItem = (item: any, index: number) => {
    return (
      <div
        key={index}
        className="text-black flex  justify-between bg-white border-4 border-white p-4 my-2 rounded-3xl"
      >
        <div className="flex">
          <div className="flex-shrink-0 w-20 h-20 mr-4">
            {(() => {
              switch (item.subject) {
                default:
                  return (
                    <img
                      className="text-[60px] rounded-full  cursor-pointer"
                      src={item.user.profilePic}
                      alt="profile"
                      onClick={async () => {
                        if (item.subjet.includes('send')) {
                          const geustTemp: geustDto = await getUserGeust(
                            item.receivedId,
                          );
                          setGeust(geustTemp);
                          DeleteFn(item.id);
                          router.push('/protected/ChatPage');
                        }
                      }}
                    />
                  );
              }
            })()}

            <div id="lottie-container"></div>
          </div>
          <div>
            <p className="text-md lg:text-lg xl:text-2xl ">
              <strong>{item.user.nickname}</strong> {item.subject}
            </p>

            <p>{formatDateAndTime(item.updatedAt)}</p>
          </div>
        </div>

        <FaTrashCan
          size="40"
          className="cursor-pointer text-[60px] bg-blue-900 rounded-full hover:bg-red-500 pt-3 pb-2 text-white"
          onClick={() => {
            DeleteFn(item.id);
          }}
        />
      </div>
    );
  };

  return (
    <div className=" bg-color-main  pr-5 pl-32 text-white">
      <h1 className="text-2xl font-bold mb-4">Notification</h1>
      <div className="flex items-center justify-between w-[80%]">
        <p className="hover:underline cursor-pointer">ALL- {items.length}</p>
        <p
          className="hover:underline cursor-pointer"
          onClick={async () => {
            const token = Cookies.get('access_token');
            const response = await axios.delete(
              `${process.env.NEXT_PUBLIC_BACK}/notification/clearAll/${user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            setDelete((prevDelete) => !prevDelete);
            socket?.emit('sendNotification', user.id);
          }}
        >
          {' '}
          clear all{' '}
        </p>
      </div>

      <div className="pb-2">
        {items.map((item: any, index) => widgetItem(item, index))}
      </div>
      {/* <div className="flex justify-center items-center h-screen mt-30vh "></div> */}
    </div>
  );
}

/// send requist friends
// add to group
// msg
// play a game
