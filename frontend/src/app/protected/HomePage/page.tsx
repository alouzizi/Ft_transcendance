"use client";

import AchievementItem from "@/components/ ProjectComp/AchievementsComp/AchievementItem";
import CardInfo from "@/components/ ProjectComp/homeComp/CardInfo";
import HistoryItem from "@/components/ ProjectComp/historyComp/HistoryItem";
import HomeSection from "@/components/ ProjectComp/homeComp/HomeSection";
import LevelBar from "@/components/ ProjectComp/homeComp/LevelBar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-fit 2xl:h-screen max-w-8xl bg-color-main  justify-start pt-8">
      {/* this is the CardInfo */}

      <div
        className="bg-slate-100  bg-cover bg-center rounded-3xl  relative
        transition-all duration-100 ease-in-out overflow-hidden
       
        // small screen
        h-[26rem] w-5/6 mx-auto
        // big screen 
        2xl:h-96 2xl:w-5/6 2xl:mx-auto
        "
        style={{ backgroundImage: "url('/bg-info.png')" }}
      >
        <LevelBar level={6} completed={75} />
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
          src="https://images.alphacoders.com/129/1294445.jpg"
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
          2xl:ml-6 2xl:mt-12 2xl:w-1/3
          "
          >
            <h1>Player Full Name</h1>
            <p className="text-gray-400 text-sm">@userName</p>
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
              cardImg="https://drive.google.com/uc?export=download&id=1CjxIhlvR6rv1IZDnOwkTXoA4p9FSc7SZ"
              cardName="Ranking"
              value="15"
            />
            <CardInfo
              cardImg="https://drive.google.com/uc?export=download&id=1bpBue-PagDnzK8I4KtlMLCchYmEewKDb"
              cardName="Matches"
              value="152"
            />
            <CardInfo
              cardImg="https://drive.google.com/uc?export=download&id=14xEy2ZYs63ypZ8nhiIXGc2RCwJLSpfRC"
              cardName="Win Rate"
              value="80%"
            />
          </div>
        </div>
      </div>

      {/* this is the HomePage Sections */}
      <div
        className=" flex mx-auto
      
      // small screen
      flex-col  h-fit mt-16 w-5/6 justify-center
      // Big screen
      2xl:flex-row 2xl:justify-between 2xl:max-w-8xl 2xl:h-96  2xl:mt-16 2xl:w-5/6  

      "
      >
        <HomeSection
          sectionName="Game History"
          btnName="See All History"
          btnClicked={() => {
            router.push("/protected/HistoryPage");
          }}
        >
          <HistoryItem
            firstPlayerName="hamza boumahdi"
            firstPlayerPoints={12}
            secondPlayerName="jalal motaya"
            secondPlayerPoints={5}
            firstPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
            secondPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          />
          <HistoryItem
            firstPlayerName="hamza boumahdi"
            firstPlayerPoints={12}
            secondPlayerName="jalal motaya"
            secondPlayerPoints={5}
            firstPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
            secondPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          />
          <HistoryItem
            firstPlayerName="hamza boumahdi"
            firstPlayerPoints={12}
            secondPlayerName="jalal motaya"
            secondPlayerPoints={5}
            firstPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
            secondPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          />
        </HomeSection>
        <HomeSection
          sectionName="Last Achievements"
          btnName="See All Achievements"
          btnClicked={() => {
            router.push("/protected/AchievementsPage");
          }}
        >
          <AchievementItem
            image="https://drive.google.com/uc?export=download&id=1MqBy_nVt0tknpwjjHPYeeLPJ6XWBeqBH"
            title="Novice"
            mission="Win 10 matches"
            type="selver"
          />
          <AchievementItem
            image="https://drive.google.com/uc?export=download&id=1MqBy_nVt0tknpwjjHPYeeLPJ6XWBeqBH"
            title="Novice"
            mission="Win 10 matches"
            type="bronz"
          />
          <AchievementItem
            image="https://drive.google.com/uc?export=download&id=1MqBy_nVt0tknpwjjHPYeeLPJ6XWBeqBH"
            title="Novice"
            mission="Win 10 matches"
            type="gold"
          />
        </HomeSection>
      </div>
    </div>
  );
}
