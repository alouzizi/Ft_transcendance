"use client";
export default function CardInfo(prompt: {
  cardImg: string;
  cardName: string;
  value: string;
}) {
  return (
    <div
      className="h-fit flex flex-row justify-between
     bg-white rounded-2xl  border-color-main-whith
     sm:w-20 border-[0.2rem] w-18 mx-1 px-1
     md:w-40 md:mx-2 sm:mx-1 
     transition-all duration-200 ease-in-out 
     "
    >
      <div className="flex flex-col justify-center mr-1  p-1  w-3/4 ">
        <img
          className="h-5 w-5 sm:w-6 sm:h-6 mx-auto
          md:w-8 md:h-8"
          src={`${prompt.cardImg}`}
          alt="cardinfoItem"
        />
        <p className="text-black font-normal text-xs mx-auto line-clamp-1 hidden md:block">
          {prompt.cardName}
        </p>
      </div>
      <p
        className="my-auto  text-color-main-whith2 font-bold
       p-0.5  mr-2   text-xs 
       sm:text-sm
       md:p-1   md:mr-2  md:text-xl"
      >
        {prompt.value}
      </p>
    </div>
  );
}
