"use client";
import CardInfo from "@/app/protected/DashboardPage/components/CardInfo";
import HomeSection from "@/app/protected/DashboardPage/components/HomeSection";
import LevelBar from "@/app/protected/DashboardPage/components/LevelBar";
import HistoryItem from "@/app/protected/HistoryPage/components/HistoryItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getAchievmentsData,
  getAllFriends,
  getGameHistory,
  getGlobalInfos,
  getUserByNick,
  getUserRanking,
} from "@/app/api/hixcoder/FriendsPageAPI";
import AchievementItem from "../../AchievementsPage/components/AchievementItem";
import { useGlobalContext } from "../../context/store";
import PopoverMenuDash from "./PopoverMenuDash";

export default function DashBoard(prompt: { friend: ownerDto }) {
  const router = useRouter();
  const [friend, setFriend] = useState<ownerDto>(prompt.friend);
  const { user, updateInfo } = useGlobalContext();
  const [isFriend, setIsFriend] = useState(false);
  const [gameHistory, setGameHistory] = useState<gameHistoryDto[]>([]);
  const [globalInfo, setGlobalInfo] = useState<globalInfoDto>({
    NbrOfAllMatches: 0,
    NbrOfWinnedMatches: 0,
    NbrOfLosedMatches: 0,
    NbrOfFriends: 0,
    NbrOfBlockedFriends: 0,
    NbrOfInvitedFriends: 0,
  });
  const [rank, setRank] = useState(0);
  const [winRate, setWinRate] = useState(0);
  let achievementsList = getAchievmentsData(globalInfo).filter(
    (acheiv) => acheiv.isUnlocked
  );
  const [level, setLevel] = useState([0, 0]);
  useEffect(() => {
    async function getData() {
      try {
        // update friend info
        const usr = await getUserByNick(prompt.friend.nickname);
        setFriend(usr);
        // for fetch the ranking
        const rankTmp = await getUserRanking(prompt.friend.id);
        setRank(rankTmp.rank);
        console.log("globalInfoTmp", rankTmp.rank);

        // for fetch the level
        const levelTmp = friend.level.split(".");
        setLevel([parseInt(levelTmp[0]), parseInt(levelTmp[1])]);

        // for fetch the gameHistory
        const gameHistoryTmp: gameHistoryDto[] = await getGameHistory(
          prompt.friend.id
        );
        if (gameHistoryTmp.length !== 0) {
          setGameHistory(gameHistoryTmp);
        }

        // for fetch the friends
        const dataTmp = await getAllFriends(prompt.friend.id);
        setIsFriend(
          dataTmp.some((element: userDto) => element.id === prompt.friend.id)
        );

        // for fetch the globalInfoTmp
        const globalInfoTmp = await getGlobalInfos(prompt.friend.id);
        setGlobalInfo(globalInfoTmp);

        //for set the win rate
        if (globalInfoTmp.NbrOfAllMatches > 0) {
          const winRate =
            (globalInfoTmp.NbrOfWinnedMatches * 100) /
            globalInfoTmp.NbrOfAllMatches;
          setWinRate(winRate);
        }
      } catch (error: any) {
        console.log("getData error: " + error);
      }
    }
    getData();
    achievementsList = getAchievmentsData(globalInfo).filter(
      (acheiv) => acheiv.isUnlocked
    );
  }, [updateInfo, friend.level]);

  return (
    <div className="flex flex-col min-h-screen h-fit 2xl:h-screen max-w-[120rem] mx-auto bg-color-main  justify-start pt-8">
      {/* this is the CardInfo */}

      <div
        className=" bg-cover bg-center rounded-3xl  relative 
        transition-all duration-100 ease-in-out 
       
        // small screen
        w-5/6 mx-auto h-96
        // big screen 
        2xl:w-5/6 2xl:mx-auto
        "
        style={{ backgroundImage: "url('/bg-info.png')" }}
      >
        {user.id !== prompt.friend.id ? (
          <PopoverMenuDash friendInfo={prompt.friend} isFriend={isFriend} />
        ) : (
          <div />
        )}

        <LevelBar level={level[0]} completed={level[1]} />
        <img
          className="
         border-color-main shadow-[0px_0px_10px_rgba(0,0,0,0)] 
          hover:shadow-transparent rounded-full object-cover absolute
        transition-all duration-700 ease-in-out overflow-hidden
          
          // small screen
          w-20 h-20  mx-auto mb-[-2rem]  border-2
          z-10 left-[50%] bottom-[45%] -ml-12

          // big screen 
          2xl:w-28 2xl:h-28  2xl:mx-auto 2xl:mb-[-2rem] 2xl:border-2
          2xl:z-10 2xl:top-auto 2xl:bottom-1/3 2xl:left-6 "
          src={prompt.friend.profilePic}
          alt=""
        />

        <div
          className="
           bg-color-main-dark  rounded-bl-2xl rounded-br-2xl
          absolute 
        transition-all duration-700 ease-in-out overflow-hidden
          
          // small screen
          flex flex-col  w-full h-[47%] bottom-0 justify-end items-center

          // big screen 
          2xl:flex 2xl:flex-row 2xl:justify-between 2xl:w-full 2xl:h-1/3 2xl:bottom-0
          "
        >
          <div
            className=" 
          // small screen
          mt-12
          // Big screen
          2xl:ml-6 2xl:mt-2 2xl:w-1/3
          "
          >
            <h1 className="text-white text-sm">
              {prompt.friend.first_name} {prompt.friend.last_name}
            </h1>
            <p className="text-gray-400 text-sm">@{prompt.friend.nickname}</p>
          </div>

          <div
            className="
           // small screen
           flex flex-row  w-fit justify-center  mt-4 mb-6
           // Big screen
           
           2xl:mt-4 2xl:w-2/3 2xl:justify-end 2xl:mr-4  2xl:mb-0
          "
          >
            <CardInfo
              cardImg="/ranking.png"
              cardName="Ranking"
              value={`${rank}`}
            />
            <CardInfo
              cardImg="/matches.png"
              cardName="Matches"
              value={`${gameHistory.length}`}
            />
            <CardInfo
              cardImg="/win-rate.png"
              cardName="Win Rate"
              value={`${winRate.toFixed(0)}%`}
            />
          </div>
        </div>
      </div>

      {/* this is the DashboardPage Sections */}
      <div
        className=" flex mx-auto
      // small screen
      flex-col  h-fit mt-16 w-5/6 justify-center
      // Big screen
      2xl:flex-row 2xl:justify-between 2xl:max-w-8xl 2xl:h-96  2xl:mt-16 2xl:w-5/6  

      "
      >
        {/* ========================= Game Section =========================*/}
        <HomeSection
          sectionName="Last Games"
          btnName="See All History"
          btnClicked={() => {
            router.push("/protected/HistoryPage/" + prompt.friend.nickname);
          }}
        >
          {gameHistory.length !== 0 ? (
            gameHistory
              .slice(-3)
              .reverse()
              .map((record) => (
                <HistoryItem
                  key={record.id}
                  firstPlayerName={record.senderUsr}
                  firstPlayerPoints={record.senderPoints}
                  secondPlayerName={record.receiverUsr}
                  secondPlayerPoints={record.receiverPoints}
                  firstPlayerImg={record.senderAvatar}
                  secondPlayerImg={record.receiverAvatar}
                />
              ))
          ) : (
            <p className="mx-auto  my-12 text-gray-500 text-lg">No Matches!</p>
          )}
        </HomeSection>
        {/* ========================= /Game Section =========================*/}
        {/* ========================= Achievement Section =========================*/}
        <HomeSection
          sectionName="Achievements"
          btnName="See All Achievements"
          btnClicked={() => {
            router.push(
              "/protected/AchievementsPage/" + prompt.friend.nickname
            );
          }}
        >
          {achievementsList.length !== 0 ? (
            achievementsList
              .slice(-3)
              .reverse()
              .map((achiev, index) => (
                <AchievementItem
                  key={`achievDash-${index}`}
                  isUnlocked={achiev.isUnlocked}
                  image={achiev.image}
                  title={achiev.title}
                  mission={achiev.mission}
                  type={achiev.type}
                />
              ))
          ) : (
            <p className="mx-auto my-12 text-gray-500 text-lg ">
              No Achievements!
            </p>
          )}
        </HomeSection>
        {/* ========================= /Achievement Section =========================*/}
      </div>
    </div>
  );
}
