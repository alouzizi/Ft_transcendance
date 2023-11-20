"use client";
import React from "react";
import { Text } from "@radix-ui/themes";

export default function AboutItem(prompt: {
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div
      className="transition ease-in-out delay-20 flex flex-col w-full 
    items-center justify-between rounded-xl relative my-2
    hover:scale-105 cursor-pointer"
    >
      <img
        className="w-full border-2 hover:border-[#4069FF] rounded-lg"
        src={prompt.image}
      />
      <Text weight="bold" className="pt-2">
        {prompt.name}
      </Text>
      <Text weight="light" size="1" className="">
        {prompt.role}
      </Text>
    </div>
  );
}
