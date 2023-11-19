"use client";
import { useEffect, useState } from "react";
import {
  IoGameController,
  IoNotificationsCircleOutline,
} from "react-icons/io5";
import axios from "axios";
import { useGlobalContext } from "../context/store";
import { MdCancel, MdGroupAdd, MdMessage } from "react-icons/md";
import { createNotification } from "./api/createNotification";
import Lottie from "lottie-react";
import { boolean } from "zod";
import { FaUserFriends } from "react-icons/fa";

function formatDateAndTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  // Get date components
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");

  // Get time components
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  // Format the result string
  const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateAndTime;
}

// Example usage
const dateTimeString = "2023-11-19T00:33:29.272Z";
const formattedDateTimeString = formatDateAndTime(dateTimeString);
console.log(formattedDateTimeString); // Output: "2023-11-19 00:33"

export default function NotificationPage() {
  let loadFirstAnimation = true;

  const subjects = [
    "Friend request incoming",
    "New message received",
    "Invitation to play a game",
    "you've been invited to group",
  ];
  let randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

  const [currentSubject, setCurrentSubject] = useState(subjects[0]); // Set the initial subject
  const [currentAnimationData, setCurrentAnimationData] =
    useState("animationData1"); // Set the initial animation data

  useEffect(() => {
    // Load the appropriate animation based on the current subject
    switch (currentSubject) {
      case subjects[0]:
        setCurrentAnimationData("Friend request incoming");
        break;
      case subjects[1]:
        setCurrentAnimationData("New message received");
        break;
      case subjects[2]:
        setCurrentAnimationData("Invitation to play a game");
        break;
      case subjects[3]:
        setCurrentAnimationData("you've been invited to group");
        break;
      default:
        setCurrentAnimationData("you've been invited to group");
        break;
    }
  });

  const { user } = useGlobalContext();

  const [items, setItems] = useState([]);
  const [Delete, setDelete] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:4000/notification/getNotifications/${user.id}`
      ); //
      const data = await response.data;
      console.log(data);
      setItems(data);
    };
    if (user.id !== "-1") getData();
  }, [user.id, Delete]);

  const DeleteFn = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:4000/notification/deletenotifications/${id}`
    ); // ${user.id}
    const data = await response.data;
  };

  return (
    <div className=" bg-color-main h-screen w-screen pl-32 text-white">
      <button
        onClick={async (e) => {
          e.preventDefault();
          const tmp = {
            senderId: user.id,
            recieverId: user.id, //"5037fb27-f4c2-4c6b-97cb-ffdf8c3e34ac",
            subject: randomSubject,
          };
          await createNotification(tmp);
          randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
          setCurrentSubject(randomSubject);
          console.log("------");
        }}
      >
        ok
      </button>
      <h1 className="text-2xl font-bold mb-4">Notification</h1>
      <div className="w-[80%] h-64 ">
        {items.map((item: any, index) => (
          
          <div
            key={index}
            className="text-black flex  justify-between bg-white border-4 border-white p-4 my-2 rounded-tr-3xl rounded-bl-3xl

            bg-gradient-to-l from-blue-500 to-teal-400 hover:bg-teal-500 hover:border-yellow-400"
          >
            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 mr-4">
                {/* Your conditionally rendered component */}
                {(() => {
                  switch (item.subjet) {
                    case subjects[0]:
                      //   return  <div className='text-[10px]   '>
                      //   <img className='text-[10px]' src='https://w7.pngwing.com/pngs/715/287/png-transparent-gold-1-numerical-digit-number-number-1-text-gold-cartoon.png' alt='Your Image' />
                      // </div>;
                      //   <Lottie
                      //   animationData={"animationData"}
                      //   className="flex justify-center items-center"
                      //   loop={true}
                      // />
                      return (
                        <div className="text-[60px]   ">
                          <MdGroupAdd />
                        </div>
                      );
                    case subjects[1]:
                      return (
                        <div className="text-[60px]   ">
                          <MdMessage />
                        </div>
                      );
                    case subjects[2]:
                      return (
                        <div className="text-[60px]   ">
                          <IoGameController />
                        </div>
                      );
                    case subjects[3]:
                      return (
                        <div className="text-[60px]   ">
                          <FaUserFriends />
                        </div>
                      );
                    default:
                      return (
                        <img
                          className="text-[10px]"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNPEynHTWV5x710fDm2rN3Ds1rB6KjI5tvlg&usqp=CAU"
                          alt="Your Image"
                        />
                      );
                  }
                })()}

                {/* Container for the Lottie animation */}
                <div id="lottie-container"></div>
              </div>
              <div>
                <p className="font-bold text-md lg:text-lg xl:text-2xl hover:underline">
                  Sender ID: {item.user.nickname}
                </p>
                <p>Subject: {item.subjet}</p>
                <p>Time: {formatDateAndTime(item.createdAt)}</p>
              </div>
            </div>

            <MdCancel
              size="20"
              className="cursor-pointer"
              onClick={() => {
                DeleteFn(item.id);
                setDelete(!Delete);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/// send requist friends
// add to group
// msg
// play a game
