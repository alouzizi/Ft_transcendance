"use client";
import { useRouter } from "next/navigation";
import DashBoard from "../components/DashBoard";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOneUser } from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/protected/context/store";
export default function DashboardPage() {
  const pathname = usePathname();
  const [friend, setFriend] = useState<ownerDto>();
  const { user } = useGlobalContext();
  useEffect(() => {
    const userName = pathname;
    const segments = userName.split("/");
    const lastSegment = segments.pop() ?? "";
    console.log(lastSegment);
    async function getData() {
      try {
        const usr: ownerDto = await getOneUser(lastSegment);
        setFriend(usr);
        console.log(usr);
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [pathname]);

  // return <div>hello</div>;
  return <DashBoard friend={friend ?? user} />;
}
