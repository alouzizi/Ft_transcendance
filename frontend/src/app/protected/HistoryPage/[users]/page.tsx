"use client";
import { getIsBlocked, getUserByNick } from "@/app/MyApi/friendshipApi";
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
        const usr = await getUserByNick(lastSegment);
        setFriend(usr);

        const isBlocked = await getIsBlocked(user.id, usr.id);
        if (isBlocked.isBlocked) {
          setFriend(undefined);
          return;
        }
      } catch (error: any) {
        //console.log("Friend alert getData error: " + error);
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
