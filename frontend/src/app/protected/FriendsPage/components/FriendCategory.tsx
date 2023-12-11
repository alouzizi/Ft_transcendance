"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  SetStateAction,
} from "react";
import FriendItem from "./FriendItem";
import {
  getAllFriends,
  getBlockedFriends,
  getOnlineFriends,
  getPendingFriends,
} from "@/app/MyApi/friendshipApi";
import { useGlobalContext } from "../../context/store";

// ====================== create context ======================
interface ContextProps {
  data: friendDto[];
  setData: (value: SetStateAction<friendDto[]>) => void;
}

const DataContext = createContext<ContextProps>({
  data: [],
  setData: (): friendDto[] => [],
});

// ====================== create context ======================
export default function FriendCategory(prompt: { itemsStatus: string }) {
  const [data, setData] = useState<friendDto[]>([]);
  const { updateInfo, user, socket } = useGlobalContext();
  useEffect(() => {
    async function getData() {
      try {
        let dataTmp: friendDto[] = [];
        if (prompt.itemsStatus === "Online") {
          dataTmp = await getOnlineFriends(user.id);
          setData(dataTmp);
        } else if (prompt.itemsStatus === "All") {
          dataTmp = await getAllFriends(user.id);
          setData(dataTmp);
        } else if (prompt.itemsStatus === "Pending") {
          dataTmp = await getPendingFriends(user.id);
          setData(dataTmp);
        } else if (prompt.itemsStatus === "Blocked") {
          dataTmp = await getBlockedFriends(user.id);
          setData(dataTmp);
        } else {
          dataTmp = [];
        }

        //console.log("getData called -------------", updateInfo);
      } catch (error: any) {
        //console.log("getData error: " + error);
      }
    }
    getData();
    if (socket) {
      socket.on("updateStatusGeust", getData);
    }
    return () => {
      socket?.off("updateStatusGeust", getData);
    };
  }, [user.id, prompt.itemsStatus, updateInfo, socket]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <div>
        <p
          className="mr-4 mb-4 w-fit font-bold  py-1 px-3 text-gray-400 
          
          // small screen
          text-sm
          // big screen 
          md:text-md 
          "
        >
          {`${prompt.itemsStatus} - ${data.length}`}
        </p>
        {data.map((element) => (
          <FriendItem
            key={element.id}
            friendInfo={element}
            itemsStatus={prompt.itemsStatus}
          />
        ))}
      </div>
    </DataContext.Provider>
  );
}

export const useGlobalDataContext = () => useContext(DataContext);
