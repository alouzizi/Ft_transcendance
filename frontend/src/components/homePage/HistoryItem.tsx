"use client";
export default function HistoryItem(prompt:{
    firstPlayerName: string,
    firstPlayerPoints: number,
    secondPlayerName: string,
    secondPlayerPoints: number,
}) {
  return (
    <div className="transition ease-in-out delay-20 w-full
    flex flex-row justify-between rounded-xl m-2
     hover:bg-white items-center  hover:text-black text-gray-400 p-3">
      <div className="flex flex-col my-auto cursor-pointer">
        <img
          className="w-14 h-14 object-cover mx-auto  rounded-full "
          src="profile-img.png"
          alt=""
        />
        <p className="mt-2 font-medium text-sm">{prompt.firstPlayerName}</p>
      </div>
      <p className="text-lg font-bold">{prompt.firstPlayerPoints} - {prompt.secondPlayerPoints}</p>
      <div className="flex flex-col my-auto cursor-pointer">
        <img
          className="w-14 h-14 object-cover mx-auto  rounded-full "
          src="profile-img.png"
          alt=""
        />
        <p className="mt-2 font-medium text-sm">{prompt.secondPlayerName}</p>
      </div>
    </div>
  );
}
