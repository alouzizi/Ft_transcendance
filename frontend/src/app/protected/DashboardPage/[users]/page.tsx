"use client";
import { useRouter } from "next/navigation";
import DashBoard from "../components/DashBoard";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOneUser } from "@/app/api/hixcoder/FriendsPageAPI";
export default function DashboardPage() {
  const pathname = usePathname();
  const [friend, setFriend] = useState();
  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    console.log(lastSegment);
    async function getData() {
      try {
        const friend = await getOneUser(lastSegment);
        setFriend(friend);
        console.log(friend);
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [pathname]);

  return <DashBoard friend={friend} />;
}
