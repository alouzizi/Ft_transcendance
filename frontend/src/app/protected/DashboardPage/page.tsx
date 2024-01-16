"use client";

import { useGlobalContext } from "../context/store";
import DashBoard from "./components/DashBoard";

export default function DashboardPage() {
  const { user } = useGlobalContext();

  // if (user.id === "-1") return <></>
  return <DashBoard friend={user} />;
}
