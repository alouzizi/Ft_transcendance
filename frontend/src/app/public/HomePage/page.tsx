"use client";
import { Text } from "@radix-ui/themes";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import AlertOpenAccount from "./components/alertOpenAcc";

export default function HomePage() {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col-reverse md:flex-row">
      <div className="flex flex-col w-[50%] items-center ">
        <Text weight="bold" className="text-center text-[20px] w-[50%]">
          Welcome to PongMaster Where Pong Legends Are Born! 🏓💥
        </Text>

        <div
          onClick={(e) => {
            e.preventDefault();
            setOpenAlert(true);
          }}
          className="bg-[#4069FF] px-4 py-2 rounded-md mt-4 flex items-center cursor-pointer"
        >
          <p className="text-white  pr-2">Open Account</p>
          <FaArrowCircleRight size="20" />
        </div>
      </div>

      <AlertOpenAccount openAlert={openAlert} setOpenAlert={setOpenAlert} />

      <div className="w-[40%]">
        <img src="/home.png" />
      </div>
    </div>
  );
}
