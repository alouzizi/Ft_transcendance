"use client";
import DashBoard from "../components/DashBoard";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getBlockedFriends,
  getIsBlocked,
  getOneUser,
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import ErrorPage from "../components/ErrorPage";
import { CircularProgress } from "@mui/material";
export default function DashboardPage() {
  const pathname = usePathname();
  const [friend, setFriend] = useState<ownerDto>();
  const { user, updateInfo } = useGlobalContext();

  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    console.log(lastSegment);
    async function getData() {
      try {
        const usr = await getOneUser(lastSegment);
        console.log("-----usr", usr);

        const isBlocked = await getIsBlocked(user.id, usr.id);
        console.log(isBlocked);
        if (isBlocked.isBlocked) {
          setFriend(undefined);
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

  if (friend) {
    return <DashBoard friend={friend} />;
  } else {
    return <ErrorPage />;
  }
  // return <CircularProgress />;
}
