"use client";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, Text } from "@radix-ui/themes";
import { useState } from 'react';
import { FaArrowCircleRight } from "react-icons/fa";

export default function HomePage() {
  const handleLogin = () => {
    window.location.href = "http://172.20.10.3:4000/auth/login42";
  };

  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col-reverse md:flex-row">
      <div className="flex flex-col w-[50%] items-center ">
        <Text weight="bold" className="text-center text-[20px] w-[50%]">
          Welcome to PongMaster Where Pong Legends Are Born! 🏓💥
        </Text>

        <div onClick={(e) => {
          e.preventDefault()
          setOpenAlert(true)
        }} className="bg-[#4069FF] px-4 py-2 rounded-md mt-4 flex items-center">
          <p className="text-white  pr-2">Open Account</p>
          <FaArrowCircleRight size="20" />
        </div>

      </div>

      <div className="w-[40%]">
        <img src="/home.png" />
      </div>

      <div>
        <Dialog open={openAlert}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          onClose={() => setOpenAlert(false)}>
          <DialogContent className='flex flex-col items-center p-10 justify-around  bg-[#7D7676] bg-opacity-70 rounded-lg'>


            <img className="h-20" src="/PongMaster.svg" alt="PongMaster" />


            <p className='text-white text-xl'>open account using</p>

            <Button onClick={handleLogin}>
              <div className="border-2 shadow-xl bg-white border-[#4069FF] mt-3 rounded-xl flex justify-center mx-auto items-center w-36 h-12">
                <img className="w-[29px]" src="/42.svg" />
                <p className="ml-1"> school </p>
              </div>
            </Button>

          </DialogContent>
        </Dialog>
      </div>


    </div>
  );
}
