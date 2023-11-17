"use client";

import { useGlobalContext } from "@/app/protected/context/store";
import { Backend_URL } from "@/lib/Constants";
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
} from "@/app/api/hixcoder/FriendsPageAPI";

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
  const { user, updateInfo } = useGlobalContext();
  useEffect(() => {
    async function getData() {
      console.log("prompt.itemsStatus ==> " + prompt.itemsStatus);

      try {
        let dataTmp = [];
        if (prompt.itemsStatus === "Online") {
          dataTmp = await getOnlineFriends(user.id);
        } else if (prompt.itemsStatus === "All") {
          dataTmp = await getAllFriends(user.id);
        } else if (prompt.itemsStatus === "Pending") {
          dataTmp = await getPendingFriends(user.id);
        } else if (prompt.itemsStatus === "Blocked") {
          dataTmp = await getBlockedFriends(user.id);
        } else {
          dataTmp = [];
        }
        setData(dataTmp);
        return data;
      } catch (error: any) {
        console.log("getData error: " + error);
      }
    }
    console.log(user);
    getData();
  }, [user.id, prompt.itemsStatus, updateInfo]);
  //   useEffect(() => {}, [data]);

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
