"use client";
import { Button } from "@mui/material";
import { Text } from "@radix-ui/themes";
import { useState } from "react";

export default function ContactPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="flex md:flex-row flex-col-reverse justify-center items-center">

      <div className="flex  flex-col w-[50%] items-center">
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

        <textarea value={message} placeholder="Message"
          className="bg-[#F6F7FA] pl-5  p-1.5 mt-3 flex w-[15rem]   border
                        text-black placeholder-gray-400 text-sm outline-none rounded-[5px]  
                        "
          onChange={(e) => {
            setMessage(e.target.value);
          }}>

        </textarea>


        <div className="mt-3">
          <button onClick={async (e) => {
            e.preventDefault();

          }}
            className="bg-[#4069FF] px-7 py-1 rounded-sm  flex items-center ">
            <p className="text-white pr-2">Submit</p>

          </button>
        </div>

      </div>

      <div className="w-[40%]">
        <img src="/contact.png" />
      </div>

    </div>
  );
}
