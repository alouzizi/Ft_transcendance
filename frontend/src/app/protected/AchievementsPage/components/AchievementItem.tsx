"use client";
export default function AchievementItem(prompt: {
  image: string;
  title: string;
  mission: string;
  type: string;
  isUnlocked: boolean;
}) {
  let achievColor = "";
  if (prompt.type === "Bronz") {
    achievColor = "#AB6D55";
  } else if (prompt.type === "Selver") {
    achievColor = "#A7A9AA";
  } else if (prompt.type === "Gold") {
    achievColor = "#FBB230";
  }
  return (
    <div
      className="transition ease-in-out delay-20 flex flex-row w-full bg-white
    items-center justify-between rounded-xl relative my-2
    hover:scale-105 cursor-pointer"
    >
      {!prompt.isUnlocked ? (
        <div className="w-full h-full bg-[#00000068] rounded-lg absolute z-20"></div>
      ) : (
        <div className="absolute"></div>
      )}

      <div className="flex flex-row items-center m-4">
        <img
          className=" object-cover mx-auto  mr-4
          
          // small screen
          w-8 h-8
          sm:w-12 sm:h-12
        // Big screen
        md:w-16 md:h-16

          "
          src={prompt.image}
          alt=""
        />
        <div className="flex flex-col my-auto  ">
          <p
            className=" font-bold  text-black
          
          // small screen
          text-base md:text-lg
        // Big screen
        lg:text-xl

          "
          >
            {prompt.title}
          </p>
          <p className="font-medium text-xs text-gray-400">{prompt.mission}</p>
        </div>
      </div>
      <div
        className={`w-0 h-0  absolute bottom-0 right-0
  border-t-[20px] sm:border-t-[24px] border-t-transparent
  border-r-[16px] sm:border-r-[20px] border-r-${achievColor}
  border-b-[20px] sm:border-b-[24px] border-b-${achievColor}
  border-l-[16px] sm:border-l-[20px] border-l-transparent
  rounded-br-xl`}
        style={{
          borderBottomColor: achievColor,
          borderRightColor: achievColor,
        }}
      ></div>
    </div>
  );
}
