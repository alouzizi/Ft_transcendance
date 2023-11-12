"use client";
import DashBoard from "../components/DashBoard";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getOneUser } from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import ErrorPage from "../components/ErrorPage";
export default function DashboardPage() {
  const pathname = usePathname();
<<<<<<< HEAD
  const [friend, setFriend] = useState<userDto>();
=======
  const [friend, setFriend] = useState<ownerDto>();
>>>>>>> implement the sockets successfully
  const { user } = useGlobalContext();

  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    console.log(lastSegment);
    async function getData() {
      try {
<<<<<<< HEAD
        const user = await getOneUser(lastSegment);
        setFriend(user);
        console.log(user);
=======
        const usr: ownerDto = await getOneUser(lastSegment);
        setFriend(usr);
        console.log(usr);
>>>>>>> implement the sockets successfully
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [pathname]);

  if (friend) {
    return <DashBoard friend={friend} />;
  } else {
    return <ErrorPage />;
  }
}
