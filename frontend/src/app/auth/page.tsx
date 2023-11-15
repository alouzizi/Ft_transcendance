"use client";
import { Button } from "@mui/material";
import Link from "next/link";

export default function login() {

  const handleLogin = () => {
    window.location.href = 'http://localhost:4002/auth/login42';
  };

  return (
    <div>
      <Button onClick={handleLogin}>
        <div
          className="border border-blue-500 rounded-xl flex justify-center mx-auto items-center w-28 h-10">
          <img className='w-[29px]' src="/42.svg" />
          school
        </div>
      </Button>
    </div>

  );
}


