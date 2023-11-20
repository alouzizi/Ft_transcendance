import { ImCross } from "react-icons/im";

export default function GameStartAlert() {
  return (
    <div>
      <div className="bg-[#01061161] w-fit m-8 sm:m-4 p-6 rounded-xl border-2 border-white ">
        <div
          // onClick={handleClose}
          className="flex flex-row justify-end mb-2 text-sm md:text-md lg:text-lg"
        >
          <ImCross className="text-gray-400 hover:text-gray-300 cursor-pointer" />
        </div>
        <img src="/PongMaster.svg" alt="" className=" w-36 text-sm mx-auto" />
        <div className="flex flex-col rounded-2xl my-3">
          <p className="text-gray-300  text-center">
            <span className="font-700 text-white">@hboumahd</span> invite you to
            pongMaster match
          </p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <button
            onClick={async () => {
              //   socket?.emit("accept", data);
              //   setOpenConfirm(false);
              // router.push('/protected/GamePage/invite');
            }}
            className="w-fit font-meduim  rounded-md   text-white bg-[#323C52] hover:bg-[#43516e]
                            text-xs  px-4 py-2 mx-2
                            md:text-sm lg:text-md lg:px-4"
          >
            Decline
          </button>
          <button
            // onClick={async () => {
            //   socket?.emit("accept", data);
            //   setOpenConfirm(false);
            //   // router.push('/protected/GamePage/invite');
            // }}
            className="w-fit font-meduim  rounded-md   text-white bg-color-main-whith hover:bg-[#2d55e6]
                            text-xs  px-4 py-2 mx-2
                            md:text-sm lg:text-md lg:px-4"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
