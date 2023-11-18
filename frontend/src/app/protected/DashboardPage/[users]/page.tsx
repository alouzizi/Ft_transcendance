"use client";
import { getIsBlocked, getUserByNick } from "@/app/api/hixcoder/FriendsPageAPI";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";

import { useGlobalContext } from "../../context/store";
import ErrorPage from "../components/ErrorPage";
export default function DashboardPage() {
  const pathname = usePathname();
  const [friend, setFriend] = useState<ownerDto>();
  const { user, updateInfo } = useGlobalContext();
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    console.log(lastSegment);
    async function getData() {
      try {
        const usr = await getUserByNick(lastSegment);
        console.log("-----usr", usr);

        const isBlocked = await getIsBlocked(user.id, usr.id);
        console.log(isBlocked);
        if (isBlocked.isBlocked) {
          setIsBlocked(false);
          console.log("blocked-=--=-");
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

  if (isBlocked && friend) {
    return <DashBoard friend={friend} />;
  } else {
    return <ErrorPage />;
  }
  // return <CircularProgress />;
}
