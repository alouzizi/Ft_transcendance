import CardInfo from "@/components/homePage/CardInfo";
import HistoryItem from "@/components/homePage/HistoryItem";
import HomeSection from "@/components/homePage/HomeSection";
import LevelBar from "@/components/homePage/LevelBar";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-color-main h-screen w-screen pl-32 justify-start pt-8">
      {/* this is the CardInfo */}

      <div
        className="bg-slate-100 h-96 w-5/6 max-w-8xl bg-cover bg-center rounded-3xl mx-auto relative"
        style={{ backgroundImage: "url('/bg-info.png')" }}
      >
        <LevelBar level={6} completed={75} />
        <img
          className="w-28 h-28 object-cover mx-auto mb-[-2rem] rounded-full border-2
         border-color-main shadow-[0px_0px_10px_rgba(0,0,0,0)] 
          hover:shadow-transparent 
          z-10 absolute bottom-1/3 left-6"
          src="profile-img.png"
          alt=""
        />
        <div
          className="flex flex-row justify-between w-full h-1/3 bg-color-main-dark  rounded-bl-2xl rounded-br-2xl
          absolute bottom-0"
        >
          <div className="ml-6 mt-12 w-1/3">
            <h1>Player Full Name</h1>
            <p className="text-gray-400 text-sm">@userName</p>
          </div>

          <div className="flex flex-row mt-4  w-2/3 justify-end mr-4">
            <CardInfo cardImg="ranking.png" cardName="Ranking" value="15" />
            <CardInfo cardImg="matches.png" cardName="Matches" value="152" />
            <CardInfo cardImg="win-rate.png" cardName="Win Rate" value="80%" />
          </div>
        </div>
      </div>

      {/* this is the HomePage Sections */}
      <div className="flex flex-row w-5/6 max-w-8xl  h-96 mx-auto mt-16 justify-between">
        <HomeSection sectionName="Game History" btnName="See All History" >
        <HistoryItem firstPlayerName="hamza boumahdi" firstPlayerPoints={12} secondPlayerName="jalal motaya" secondPlayerPoints={5}/>
        <HistoryItem firstPlayerName="hamza boumahdi" firstPlayerPoints={12} secondPlayerName="jalal motaya" secondPlayerPoints={5}/>
        <HistoryItem firstPlayerName="hamza boumahdi" firstPlayerPoints={12} secondPlayerName="jalal motaya" secondPlayerPoints={5}/>
        </HomeSection>
        <HomeSection
          sectionName="Last Achievements"
          btnName="See All Achievements"
        />
      </div>
    </div>
  );
}
