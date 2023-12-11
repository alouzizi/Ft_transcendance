"use client";
import { useEffect, useState } from "react";
import LeaderBItem from "./components/LeaderBItem";
import { useGlobalContext } from "../context/store";
import { getLeaderBoard } from "@/app/MyApi/gameApi";

export default function LeaderboardPage() {
  const { updateInfo } = useGlobalContext();
  const [leaderBoardList, setLeaderBoardList] = useState<LeaderBoard[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        const leaderBoardTmp = await getLeaderBoard();
        setLeaderBoardList(leaderBoardTmp);
      } catch (error: any) {
        //console.log("getData error: " + error);
      }
    }
    getData();
  }, [updateInfo]);
  return (
    <div className="flex flex-col bg-color-main h-fit w-screen min-h-screen ">
      <h1
        className="text-left font-bold text-md sm:text-lg md:text-2xl 
        mt-6 md:mt-12 mb-4 md:mb-12 ml-12  md:ml-24"
      >
        Leaderboard
      </h1>
      <div
        className=" flex flex-col justify-center  
      ml-4 w-[85%] max-w-4xl
      sm:text-lg sm:ml-12 sm:w-[70%] 
      md:ml-20 xl:mx-auto"
      >
        <div
          className="flex flex-row justify-between w-full text-gray-400 text-center cursor-default
           mb-4  font-700 
           text-[0.5rem] px-1
          min-[280px]:text-md sm:px-2
          md:text-lg md:px-4"
        >
          <p className="w-1/6 text-left">Rank</p>
          <p className="w-2/6  text-center sm:text-left">Profile</p>
          <p className="w-1/6  text-center sm:text-left">Level</p>
          <p className="w-1/6  text-center sm:text-left">Matches</p>
          <p className="w-1/6 text-center">Win Rate</p>
        </div>
        {leaderBoardList.map((item, index) => (
          <LeaderBItem
            key={"leaderboard-" + index}
            playerRank={item.rank}
            playerAvatar={item.userAvatar}
            playerUser={item.userName}
            playerLevel={item.level + "%"}
            PlayerNbrOfMatches={item.nbrOfMatches}
            playerWinRate={item.winRate + "%"}
          />
        ))}
      </div>
    </div>
  );
}
