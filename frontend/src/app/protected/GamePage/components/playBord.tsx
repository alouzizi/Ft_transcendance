"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useGlobalContext } from "../../context/store";

type MyComponentProps = {
  emit: boolean;
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
  emit,
}: MyComponentProps) => {
  const { user, socket } = useGlobalContext();
  const router = useRouter();
  return (
    <div className="flex h-44 rounded-2xl bg-[#F1F3F9] bg-clip-border text-gray-700 mb-16 w-full md:w-auto">
      <div className="h-full w-2/6 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border">
        <img
          src={imageSrc}
          alt="Image"
          className="object-cover h-full  w-full rounded-l-xl"
        />
      </div>
      <div className="p-6 flex ">
        <div className="flex flex-col">
          <h4 className="uppercase font-bold text-sm/1 font-outfit text-black">
            {title}
          </h4>
          <p className="font-fredoka font-400 text-[#999999] font-bold text-xs">
            {text}
          </p>
        </div>

        <button
          className="uppercase bg-blue-500 hover:bg-blue-700 text-[#F1F3F9]  font-bold font-outfit py-2 px-4 rounded-full self-end"
          onClick={() => {
            if (emit) {
              if (socket?.connected) {
                socket.emit("clientId", user.id);
                router.push(link);
              } else {
                alert("Refresh the page and try again!");
              }
            }
          }}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
