export default function CardInfo(prompt: {
  cardImg: string;
  cardName: string;
  value: string;
}) {
  return (
    <div
      className=" w-40 h-fit flex flex-row justify-between mx-2
     bg-white    rounded-2xl border-[0.2rem] border-color-main-whith"
    >
      <div className="flex flex-col justify-center mr-1  p-1  w-3/4 ">
        <img
          className="w-8 mx-auto"
          src={`${prompt.cardImg}`}
          alt="cardinfoItem"
        />
        <p className="text-black font-normal text-xs mx-auto line-clamp-1">
          {prompt.cardName}
        </p>
      </div>
      <p className="my-auto  text-color-main-whith p-1 font-bold text-xl mr-2 ">
        {prompt.value}
      </p>
    </div>
  );
}
