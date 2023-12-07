"use client";
import { getIsBlocked, getUserByNick } from "@/app/MyApi/friendshipApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";

import { useGlobalContext } from "../../context/store";
import ErrorPage from "../components/ErrorPage";
export default function DashboardPage() {
  const pathname = usePathname();
  const [friend, setFriend] = useState<ownerDto>();
  const { updateInfo } = useGlobalContext();
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    console.log(lastSegment);
    async function getData() {
      try {
        const usr = await getUserByNick(lastSegment);
        setFriend(usr);
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [pathname, updateInfo, isBlocked]);

  if (friend && friend.id != "-1") {
    return <DashBoard friend={friend} />;
  } else {
    return <ErrorPage />;
  }
}
