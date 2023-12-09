"use client";

import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CustomAlert } from "../components/taost";
import Mycards from "../components/Cards";
import { useGlobalContext } from "../../context/store";
import { Socket } from "socket.io-client";

export default function Home() {
  const { user, socket } = useGlobalContext();
  const router = useRouter();
  const [message, setMessage] = useState("Start game!");
  const [room, setRoom] = useState("");
  const [left, setLeft] = useState<boolean>(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
  const startGameHandler = () => {
    if (!buttonClicked) {
      setMessage("Waiting ...");
      socket?.emit("clientId", user.id);
      socket?.emit("joinRoom", user.id);
      setButtonClicked(true);
    }
  };

  const canvas: Canvas = {
    width: 600,
    height: 400,
  };
  // if (!socket?.connected) {
  //   window.alert("socket not connected, please refresh the page");
  // }
  if (window.innerWidth < 600) {
    canvas.width = window.innerWidth - 80;
  }
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMap, setSelectedMap] = useState(1);

  const handleSelectMap = (mapNumber: any) => {
    setSelectedMap(mapNumber);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      socket?.on("opponentLeft", () => {
        router.replace("/protected/GamePage");
        setShowAlert(true);
        setGameStarted(false);
        setButtonClicked(false);

      });

      if (showAlert) {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }

      socket?.on("startGame", (room: string) => {
        setRoom(room);
        setGameStarted(true);
        setMessage("Play again!");
      });

      socket?.on("alreadyExist", () => {
        setButtonClicked(false);
        setShowAlert(true);
        setGameStarted(false);
        setMessage("Start game!");
        router.replace("/protected/GamePage/random");
      });

      socket?.on("whichSide", (isLeft: boolean) => {
        setLeft(isLeft);
      });

      const handlePopstate = (event: PopStateEvent) => {
        if (gameStarted)
          socket?.emit("opponentLeft", { userId: user.id, room: room, });
        setButtonClicked(false);
        setGameStarted(false);
        setMessage("Start game!");
      };

      window.addEventListener("popstate", handlePopstate);

      return () => {

        // window.removeEventListener("popstate", handlePopstate);
        socket?.off("startGame");
        socket?.off("whichSide");
        socket?.off("alreadyExist");
        socket?.off("opponentLeft");
      };
    } else return;
  }, [user.id, gameStarted, showAlert, message, buttonClicked, room, socket]);


  useEffect(() => {
    if (socket) {
      return () => {
        socket.emit("clear", user.id);
      }
    }
  }, [socket])
  return (
    <div className="my-8">
      {showAlert && <CustomAlert message="Opponent Left" />}
      <div className="w-screen min-h-screen h-fit flex flex-col justify-center items-center bg-color-main">
        <canvasContext.Provider value={canvas}>
          {!gameStarted && (
            <div className="flex flex-col lg:flex-row justify-center items-center my-10">
              <Mycards
                onSelect={() => handleSelectMap(1)}
                imageSrc={"/map1.png"}
              />
              <Mycards
                onSelect={() => handleSelectMap(2)}
                imageSrc={"/map2.png"}
              />
              <Mycards
                onSelect={() => handleSelectMap(3)}
                imageSrc={"/map3.png"}
              />
            </div>
          )}
          {!gameStarted && (
            <div className="flex flex-row justify-between items-center  bg-black rounded-md w-1/2 h-96">
              <div className="bg-white w-3 h-1/3 rounded-full  mt-36 ml-4"></div>

              <div className="h-full w-fit text-white flex flex-col  relative">
                <div className="h-2/5 border-r-2 w-0 border-dotted mx-auto" />
                {/* <button
                  className="bg-color-main-whith text-white px-2 py-1 rounded-md"
                  >
                  {message}
                </button> */}
                <button
                  className="bg-color-main relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  disabled={buttonClicked}
                  onClick={startGameHandler}
                >
                  <span className="bg-color-main relative px-5 py-2.5 transition-all ease-in duration-75  text-white rounded-md group-hover:bg-opacity-0">
                    {message}
                  </span>
                </button>
                <div className="h-3/6 border-r-2 w-0 border-dotted mx-auto" />
              </div>

              <div className="bg-white w-3 h-1/3 rounded-full mb-36 mr-4"></div>
            </div>
          )}
          {gameStarted && (
            <Pong room={room} isLeft={left} difficulty={selectedMap} />
          )}
        </canvasContext.Provider>
      </div>
    </div>
  );
}