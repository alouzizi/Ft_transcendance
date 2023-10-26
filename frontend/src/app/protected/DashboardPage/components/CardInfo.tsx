"use client";
export default function CardInfo(prompt: {
  cardImg: string;
  cardName: string;
  value: string;
}) {
  return (
    <div
      className=" min-[0px]:w-24 lg:w-40  h-fit flex flex-row justify-between mx-2
     bg-white    rounded-2xl border-[0.2rem] border-color-main-whith"

    
    >
      <div className="flex flex-col justify-center mr-1  p-1  w-3/4 ">
        <img
          className="w-8 h-8 mx-auto"
          src={`${prompt.cardImg}`}
          alt="cardinfoItem"
        />
        <p className="text-black font-normal text-xs mx-auto line-clamp-1 min-[0px]:hidden lg:block">
          {prompt.cardName}
        </p>
      </div>
      <p className="my-auto  text-color-main-whith2 p-1 font-bold  mr-2  min-[0px]:text-md lg:text-xl">
        {prompt.value}
      </p>
    </div>
  );
}
