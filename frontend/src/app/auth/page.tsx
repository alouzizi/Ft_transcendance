"use client";
import { Button } from "@mui/material";
import Link from "next/link";

export default function login() {

  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/login42';
  };

  return (
    <div className="flex justify-center items-center">
      <Button onClick={handleLogin}>
        <div
        className="border-2 shadow-xl border-blue-500 rounded-xl flex justify-center mx-auto items-center w-36 h-12">
          <img className='w-[29px]' src="/42.svg" />
          <p className="ml-1"> school </p>
        </div>
      </Button>

    </div>
  );
}


