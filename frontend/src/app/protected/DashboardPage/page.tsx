"use client";
import { useGlobalContext } from "@/app/protected/context/store";
import DashBoard from "./components/DashBoard";

export default function DashboardPage() {
  const { user } = useGlobalContext();
  return <DashBoard friend={user} />;
}
