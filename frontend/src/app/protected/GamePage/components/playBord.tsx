"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useGlobalContext } from "../../context/store";

type MyComponentProps = {
  imageSrc: string;
  text: string;
  title: string;
  link: string;
};

const MyComponent = ({
  imageSrc,
  text,
  title,
  link,
}: MyComponentProps) => {
  const { user, socket } = useGlobalContext();
  const router = useRouter();
  return (
    <div
      className="flex flex-col  rounded-2xl bg-[#F1F3F9] bg-clip-border text-gray-700   
    mb-16 w-fit max-w-[48rem] h-fit
    
    "
    >
      <div className="flex flex-col sm:flex-row sm:h-32">
        <img
          src={imageSrc}
          alt="Image "
          className="rounded-2xl h-full 
          w-[90%]  mt-4 mx-auto
          sm:w-2/6 sm:ml-4"
        />
        <div
          className="flex 
      p-6 
      "
        >
          <div className="flex flex-col">
            <h4 className="uppercase font-bold text-sm font-outfit text-black">
              {title}
            </h4>
            <p className=" font-400 text-[#999999] font-bold text-xs">
              {text}
            </p>
          </div>
        </div>
      </div>
      <button
        className="uppercase bg-blue-500 hover:bg-blue-700 text-[#F1F3F9] 
         font-bold font-outfit rounded-full
          
          py-2  mx-8 my-4 
          sm:py-2 sm:px-6 sm:m-4  
          sm:self-end
          "
        onClick={() => {
          if (link == "/protected/GamePage/random") {
            if (socket?.connected) router.push(link);
            else window.alert("Refresh the page and try again!");
          } else {
            router.push(link);
          }
        }}
      >
        Play
      </button>
    </div>
  );
};

export default MyComponent;
