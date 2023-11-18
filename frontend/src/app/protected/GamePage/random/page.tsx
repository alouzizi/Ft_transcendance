"use client";
import { useGlobalContext } from "@/app/context/store";
import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Mycards from "../components/taost";





const CustomAlert = ({ message }: { message: string }) => {
  return(
    <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span className="sr-only">Warning icon</span>
    </div>
    <div className="ms-3 text-sm font-normal">Improve password difficulty.</div>
    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            {/* <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/> */}
        <path
  className="stroke-current stroke-linecap-round stroke-linejoin-round stroke-width-2"
  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
/>
        </svg>
    </button>
</div>
  )
};

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
  if (!socket?.connected) {
    window.alert("socket not connected, please refresh the page");
  }
  if (window.innerWidth < 600) {
    canvas.width = window.innerWidth - 80;
  }
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMap, setSelectedMap] = useState(1);

  const handleSelectMap = (mapNumber:any) => {
    setSelectedMap(mapNumber);
  };

  useEffect(() => {
    if (typeof window !== "undefined"){
    socket?.on("opponentLeft", () => {
      console.log("opponent left");
      // router.replace("/protected/GamePage/random");
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
      console.log({ isLeft: left });
      setMessage("Play again!");
      console.log("aloo: game started");
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

   const handlePopstate= (event: PopStateEvent) => {
      console.log("aloo: popstate");
      console.log("aloo: gameStarted", gameStarted);
      // if(gameStarted)
      // {
        // event.preventDefault();
        // event/
        socket?.emit("opponentLeft", {room: room, userId:user.id});
        setButtonClicked(false);
        // setShowAlert(true);
        setGameStarted(false);
        setMessage("Start game!");
        // router.push('/protected/GamePage/random');

      // }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', () => {});
      socket?.off("startGame");
      socket?.off("whichSide");
      socket?.off("alreadyExist");
      socket?.off("opponentLeft");
    };
  }
  else
      return ;

  }, [user.id, gameStarted, showAlert, message, buttonClicked]);

  return (
    <div>
      {showAlert && <CustomAlert message="Opponent left the game" />}
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-color-main">
        <canvasContext.Provider value={canvas}>
          {!gameStarted && (
            <div className="flex flex-row justify-center items-center mb-16 ">
              <Mycards onSelect={() => handleSelectMap(1)} imageSrc={"/map1.png"} />
              <Mycards onSelect={() => handleSelectMap(2)} imageSrc={"/map2.png"} />
              <Mycards onSelect={() => handleSelectMap(3)} imageSrc={"/map3.png"} />
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
                <button className="bg-color-main relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                
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
