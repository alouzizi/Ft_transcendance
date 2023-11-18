"use client";
import { getIsBlocked, getOneUser } from "@/app/api/hixcoder/FriendsPageAPI";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorPage from "../../DashboardPage/components/ErrorPage";
import HistoryComp from "../components/HistoryComp";
import { useGlobalContext } from "../../context/store";
export default function HistoryPage() {
  const pathname = usePathname();
  const [friend, setFriend] = useState<ownerDto>();
  const { user, updateInfo } = useGlobalContext();

  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    async function getData() {
      try {
        const usr = await getOneUser(lastSegment);

        const isBlocked = await getIsBlocked(user.id, usr.id);
        if (isBlocked.isBlocked) {
          setFriend(undefined);
          return;
        }
        setFriend(usr);
        // console.log(usr);
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [pathname, updateInfo]);

  if (friend) {
    return <HistoryComp friend={friend} />;
  } else {
    return <ErrorPage />;
  }
  // return <CircularProgress />;
}
