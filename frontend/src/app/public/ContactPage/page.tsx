"use client";
import { Button } from "@mui/material";
import { Text } from "@radix-ui/themes";
import { useState } from "react";

export default function ContactPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="flex justify-center items-center">

      <div className="flex flex-col w-[50%] items-center">
        <Text weight='bold' className="text-center text-[20px] ">
          Contact Us
        </Text>

        <input type="text" className="bg-[#F6F7FA] pl-5  p-1.5 mt-3 flex w-[15rem]  border
                        text-black placeholder-gray-400 text-sm outline-none rounded-[5px]"
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        >
        </input>

        <input type="email" className="bg-[#F6F7FA] pl-5  p-1.5 mt-3 flex w-[15rem]  border
                        text-black placeholder-gray-400 text-sm outline-none rounded-[5px]"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        >
        </input>

        <input type="text" className="bg-[#F6F7FA] pl-5  p-1.5 mt-3 flex w-[15rem] h-[15rem]  border
                        text-black placeholder-gray-400 text-sm outline-none rounded-[5px] text-left
                        "
          value={message}
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        >
        </input>


        <div className="text-white bg-[#4069FF] rounded-lg p-1 mt-4">
          <Text size='3' weight='medium'> Submit </Text>
        </div>

      </div>

      <div className="w-[40%]">
        <img src="/contact.png" />
      </div>

    </div>
  );
}
