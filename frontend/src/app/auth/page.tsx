"use client";
import { Button } from "@mui/material";
import { Text } from "@radix-ui/themes";

export default function login() {
  const handleLogin = () => {
    window.location.href = "http://10.11.8.5:4000/auth/login42";
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[50%] items-center">
        <Text weight="bold" className="text-center text-[20px] w-[50%]">
          Welcome to PongMaster Where Pong Legends Are Born! 🏓💥
        </Text>
        <Button onClick={handleLogin}>
          <div className="border-2 shadow-xl bg-white border-blue-500 rounded-xl flex justify-center mx-auto items-center w-36 h-12">
            <img className="w-[29px]" src="/42.svg" />
            <p className="ml-1"> school </p>
          </div>
        </Button>
      </div>

      <div className="w-[40%]">
        <img src="/gg1.png" />
      </div>
    </div>
  );
}
