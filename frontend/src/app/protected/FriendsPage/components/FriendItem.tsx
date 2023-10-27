import { FaMessage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
export default function FriendItem(prompt: { friendImg: string }) {
  return (
    <div className="cursor-pointer my-2  flex flex-row justify-between bg-[#2A2F40] hover:bg-[#515562] py-2 px-4 rounded-lg">
      <div className="flex flex-row ">
        <img
          className="object-cover mx-auto  rounded-full 
          
        // small screen
        w-12 h-12
        // Big screen
        md:w-14 md:h-14
        "
          src={prompt.friendImg}
          alt=""
        />
        <p
          className="ml-4 my-auto
        
        // small screen
        text-sm
        // Big screen
        md:text-md
        "
        >
          friendName
        </p>
      </div>
      <div className="flex flex-row ">
        <TooltipProvider>
          <Tooltip>
            <Popover>
              <PopoverTrigger>
                <TooltipTrigger>
                  <div className="my-auto mr-4 bg-color-main p-2 rounded-full">
                    <BsThreeDotsVertical />
                  </div>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent>
                <div className=" flex flex-col bg-color-main-dark py-2 px-2 rounded-md ">
                  <p
                    className="text-whith text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-color-main-whith "
                  >
                    Add to channel
                  </p>
                  <p
                    className="text-red-500 text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-red-500 hover:text-white "
                  >
                    Remove friend
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent className="bg-color-main text-white border-gray-400">
              <p>More</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="my-auto mr-4 hover: bg-color-main p-2 rounded-full">
                <FaMessage />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-color-main text-white border-gray-400">
              <p>Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
