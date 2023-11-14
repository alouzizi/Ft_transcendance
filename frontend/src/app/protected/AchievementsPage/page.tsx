"use client";
import { useGlobalContext } from "@/app/context/store";
import AchievComp from "./components/AchievComp";

export default function AchievementsPage() {
  const { user } = useGlobalContext();
  return <AchievComp friend={user} />;
}
