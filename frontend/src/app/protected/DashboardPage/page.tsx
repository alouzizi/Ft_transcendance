"use client";
import CardInfo from "@/app/protected/DashboardPage/components/CardInfo";
import HistoryItem from "@/app/protected/HistoryPage/components/HistoryItem";
import HomeSection from "@/app/protected/DashboardPage/components/HomeSection";
import LevelBar from "@/app/protected/DashboardPage/components/LevelBar";
import { useRouter } from "next/navigation";
import AchievementItem from "../AchievementsPage/components/AchievementItem";
import { useEffect } from "react";
import { useGlobalContext } from "@/app/context/store";
import DashBoard from "./components/DashBoard";

export default function DashboardPage() {
  return <DashBoard />;
}
