"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/store";
import { createNotification } from "./api/createNotification";
import { FaTrashCan } from "react-icons/fa6";
import React from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getUserGeust } from "../ChatPage/api/fetch-users";

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
//console.log(formattedDateTimeString); // Output: "2023-11-19 00:33"

export default function NotificationPage() {
  let loadFirstAnimation = true;
  const router = useRouter();
  const subjects = [
    "send you friend request",
    "invite you to a PongMaster game",
    "you've been invited to group",
    "send message",
  ];
  let randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

  const [currentSubject, setCurrentSubject] = useState(subjects[0]); // Set the initial subject
  const [currentAnimationData, setCurrentAnimationData] =
    useState("animationData1"); // Set the initial animation data

  useEffect(() => {
    // Load the appropriate animation based on the current subject
    switch (currentSubject) {
      case subjects[0]:
        setCurrentAnimationData("send you friend request");
        break;
      case subjects[1]:
        setCurrentAnimationData("invite you to a PongMaster game");
        break;
      case subjects[2]:
        setCurrentAnimationData("you've been invited to group");
        break;
      case subjects[3]:
        setCurrentAnimationData("send message");
        break;
    }
  });

  const { user, setGeust } = useGlobalContext();

  const [items, setItems] = useState([]);
  const [Delete, setDelete] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get("access_token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK}/notification/getNotifications/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      setItems(data);
    };
    if (user.id !== "-1") getData();
  }, [user.id, Delete]);

  const DeleteFn = async (id: string) => {
    const token = Cookies.get("access_token");
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACK}/notification/deletenotifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ); // ${user.id}
    const data = await response.data;
    setDelete((prevDelete) => !prevDelete);
  };

  function handleDecline(): void {
    throw new Error("Function not implemented.");
  }

  const [isOpen, setIsOpen] = useState(false);
  function handleAccept() {
    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Show Popup</button>

        <Modal
          className="text-[60px] bg-blue-300 m-60 border-spacing-1 p-4 my-2 rounded-3xl"
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <div className="flex flex-col items-center">
            <img className="" src="path/to/image.png" alt="Image" />
            <p className="text-black">Text goes here...</p>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-blue-500 text-white px-1 rounded-3xl"
              onClick={handleAccept}
            >
              Accept
            </button>
            <span style={{ marginRight: "8px" }} />
            <button
              className="bg-blue-900 text-white px-1 rounded-3xl"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  function showDialog() {
    setIsOpen(true);
  }

  return (
    <div className=" bg-color-main h-screen w-screen pl-32 text-white">
      <h1 className="text-2xl font-bold mb-4">Notification</h1>
      <div className="flex items-center justify-between w-[80%]">
        <p className="hover:underline cursor-pointer">ALL- {items.length}</p>
        <p
          className="hover:underline cursor-pointer"
          onClick={async () => {
            const token = Cookies.get("access_token");
            const response = await axios.delete(
              `${process.env.NEXT_PUBLIC_BACK}/notification/clearAll/${user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ); // ${user.id}
            setDelete((prevDelete) => !prevDelete);
          }}
        >
          clear all
        </p>
      </div>
      <div className="w-[80%] h-64 ">
        {items.map((item: any, index) => (
          <div
            key={index}
            className="text-black flex  justify-between bg-white border-4 border-white p-4 my-2 rounded-3xl "
          >
            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 mr-4">
                {(() => {
                  switch (item.subjet) {
                    default:
                      return (
                        <img
                          className="text-[60px] rounded-full  cursor-pointer"
                          src={item.user.profilePic}
                          alt=""
                          onClick={async () => {
                            //console.log(item.subjet);
                            if (item.subjet.includes("send")) {
                              const geustTemp: geustDto = await getUserGeust(
                                item.receivedId
                              );
                              setGeust(geustTemp);
                              DeleteFn(item.id);
                              router.push("/protected/ChatPage");
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
                  <strong>{item.user.nickname}</strong> {item.subjet}
                </p>

                <p>{formatDateAndTime(item.createdAt)}</p>
                {item.subjet === subjects[1] ? (
                  <React.Fragment>
                    <button
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDecline()}
                    >
                      Decline
                    </button>
                    <span style={{ marginRight: "8px" }} />{" "}
                    {/* Add a space of 8px */}
                    <button
                      className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                      onClick={() => showDialog()}
                    >
                      Accept
                    </button>
                  </React.Fragment>
                ) : null}
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
        ))}
      </div>
      <div className="flex justify-center items-center h-screen mt-30vh ">
        <div className="text-center">{isOpen && handleAccept()}</div>
      </div>
    </div>
  );
}

/// send requist friends
// add to group
// msg
// play a game
