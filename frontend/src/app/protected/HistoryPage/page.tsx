"use client";
import { useGlobalContext } from "../context/store";
import HistoryComp from "./components/HistoryComp";

export default function HistoryPage() {
  const { user } = useGlobalContext();
  return <HistoryComp friend={user} />;
}
